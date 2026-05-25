const PAYPAL_BASE_URL =
  process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';

const SUBSCRIPTION_ID_REGEX = /^I-[A-Z0-9]{10,14}$/;

/**
 * Validate that a subscription ID matches the expected PayPal format.
 */
export function isValidSubscriptionId(id: string): boolean {
  return SUBSCRIPTION_ID_REGEX.test(id);
}

/**
 * Retrieve a PayPal OAuth2 access token using client credentials.
 */
export async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const tokenResponse = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!tokenResponse.ok) {
    throw new Error(`PayPal token error: ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

export interface SubscriptionDetails {
  status: string;
  planId: string;
  subscriberId: string | null;
}

/**
 * Verify a PayPal subscription by ID.
 * Returns subscription details if found, or throws on error.
 */
export async function verifySubscription(
  subscriptionId: string
): Promise<SubscriptionDetails> {
  const accessToken = await getPayPalAccessToken();

  const subscriptionResponse = await fetch(
    `${PAYPAL_BASE_URL}/v1/billing/subscriptions/${encodeURIComponent(subscriptionId)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!subscriptionResponse.ok) {
    if (subscriptionResponse.status === 404) {
      throw new Error('Subscription not found');
    }
    throw new Error(`PayPal subscription error: ${subscriptionResponse.status}`);
  }

  const subscriptionData = await subscriptionResponse.json();

  return {
    status: subscriptionData.status,
    planId: subscriptionData.plan_id,
    subscriberId: subscriptionData.subscriber?.payer_id || null,
  };
}
