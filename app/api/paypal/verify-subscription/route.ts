import { NextRequest, NextResponse } from 'next/server';
import { isValidSubscriptionId, verifySubscription } from '@/lib/paypal';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import {
  getSubscriptionById,
  getSubscriptionByEmail,
  storeSubscription,
} from '@/lib/kv-store';

const CACHE_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request: NextRequest) {
  try {
    // Basic origin check
    const origin = request.headers.get('origin') || request.headers.get('referer') || '';
    const allowedOrigins = [
      'http://localhost:3000',
      CANONICAL_DOMAIN,
      'https://costsmart.vercel.app',
    ];
    const isAllowed = allowedOrigins.some((allowed) => origin.startsWith(allowed));
    if (!isAllowed && origin !== '') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { subscriptionId, email } = body;

    // Support email-based lookup
    if (email && typeof email === 'string') {
      const record = await getSubscriptionByEmail(email.toLowerCase().trim());
      if (record && record.status === 'ACTIVE') {
        return NextResponse.json({
          status: record.status,
          planId: record.planId,
          subscriberId: record.subscriberId,
          email: record.email,
        });
      }
      // If no cached record by email, return not found
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    if (!subscriptionId || typeof subscriptionId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid subscriptionId' },
        { status: 400 }
      );
    }

    // Validate subscription ID format before making external API call
    if (!isValidSubscriptionId(subscriptionId)) {
      return NextResponse.json(
        { error: 'Invalid subscription ID format' },
        { status: 400 }
      );
    }

    // Check KV cache first
    const cached = await getSubscriptionById(subscriptionId);
    if (cached && (Date.now() - cached.verifiedAt) < CACHE_MAX_AGE_MS) {
      return NextResponse.json({
        status: cached.status,
        planId: cached.planId,
        subscriberId: cached.subscriberId,
        email: cached.email,
      });
    }

    // Cache miss or stale - verify with PayPal
    const result = await verifySubscription(subscriptionId);

    // Store in KV for future lookups
    const subscriberEmail = result.subscriberEmail || '';
    await storeSubscription({
      subscriptionId,
      email: subscriberEmail,
      status: result.status,
      planId: result.planId,
      subscriberId: result.subscriberId,
      verifiedAt: Date.now(),
    });

    return NextResponse.json({
      status: result.status,
      planId: result.planId,
      subscriberId: result.subscriberId,
      email: subscriberEmail,
    });
  } catch (error) {
    console.error('Verify subscription error:', error);

    const message = error instanceof Error ? error.message : 'Internal server error';

    if (message === 'PayPal credentials not configured') {
      return NextResponse.json({ error: message }, { status: 500 });
    }
    if (message === 'Subscription not found') {
      return NextResponse.json({ error: message }, { status: 404 });
    }
    if (message.startsWith('PayPal token error:') || message.startsWith('PayPal subscription error:')) {
      return NextResponse.json({ error: 'Failed to verify subscription' }, { status: 502 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
