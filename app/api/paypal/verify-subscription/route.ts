import { NextRequest, NextResponse } from 'next/server';
import { isValidSubscriptionId, verifySubscription } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    // Basic origin check
    const origin = request.headers.get('origin') || request.headers.get('referer') || '';
    const allowedOrigins = [
      'http://localhost:3000',
      'https://cost-smart-five.vercel.app',
      'https://costsmart.vercel.app',
    ];
    const isAllowed = allowedOrigins.some((allowed) => origin.startsWith(allowed));
    if (!isAllowed && origin !== '') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { subscriptionId } = body;

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

    const result = await verifySubscription(subscriptionId);

    return NextResponse.json({
      status: result.status,
      planId: result.planId,
      subscriberId: result.subscriberId,
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
