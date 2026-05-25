import { NextRequest, NextResponse } from 'next/server';
import { getPayPalAccessToken, verifySubscription } from '@/lib/paypal';
import { storeSubscription, updateSubscriptionStatus } from '@/lib/kv-store';

const PAYPAL_BASE_URL =
  process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';

const HANDLED_EVENTS = [
  'BILLING.SUBSCRIPTION.ACTIVATED',
  'BILLING.SUBSCRIPTION.CANCELLED',
  'BILLING.SUBSCRIPTION.SUSPENDED',
  'BILLING.SUBSCRIPTION.EXPIRED',
  'BILLING.SUBSCRIPTION.RENEWED',
];

/**
 * Verify the webhook signature with PayPal.
 */
async function verifyWebhookSignature(
  headers: Headers,
  body: string
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    console.error('PAYPAL_WEBHOOK_ID not configured');
    return false;
  }

  const transmissionId = headers.get('paypal-transmission-id');
  const transmissionTime = headers.get('paypal-transmission-time');
  const certUrl = headers.get('paypal-cert-url');
  const authAlgo = headers.get('paypal-auth-algo');
  const transmissionSig = headers.get('paypal-transmission-sig');

  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    return false;
  }

  const accessToken = await getPayPalAccessToken();

  const verifyResponse = await fetch(
    `${PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        webhook_event: JSON.parse(body),
      }),
    }
  );

  if (!verifyResponse.ok) {
    console.error('Webhook signature verification failed:', verifyResponse.status);
    return false;
  }

  const verifyData = await verifyResponse.json();
  return verifyData.verification_status === 'SUCCESS';
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const event = JSON.parse(rawBody);

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(request.headers, rawBody);
    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const eventType = event.event_type;

    if (!HANDLED_EVENTS.includes(eventType)) {
      // Acknowledge unhandled events
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

    const resource = event.resource;
    const subscriptionId = resource?.id;

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Missing subscription ID' }, { status: 400 });
    }

    // Extract subscriber email from the event payload
    const subscriberEmail: string | undefined =
      resource?.subscriber?.email_address;

    if (
      eventType === 'BILLING.SUBSCRIPTION.ACTIVATED' ||
      eventType === 'BILLING.SUBSCRIPTION.RENEWED'
    ) {
      // Verify the subscription status with PayPal directly
      const details = await verifySubscription(subscriptionId);

      const email = subscriberEmail || '';
      await storeSubscription({
        subscriptionId,
        email,
        status: details.status,
        planId: details.planId,
        subscriberId: details.subscriberId,
        verifiedAt: Date.now(),
      });
    } else {
      // For cancelled, suspended, expired - update status.
      // Pass subscriber email so a minimal record can be created if the
      // original record's TTL already expired.
      const statusMap: Record<string, string> = {
        'BILLING.SUBSCRIPTION.CANCELLED': 'CANCELLED',
        'BILLING.SUBSCRIPTION.SUSPENDED': 'SUSPENDED',
        'BILLING.SUBSCRIPTION.EXPIRED': 'EXPIRED',
      };

      const newStatus = statusMap[eventType] || 'INACTIVE';
      await updateSubscriptionStatus(subscriptionId, newStatus, subscriberEmail || '');
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
