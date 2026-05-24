import { NextRequest, NextResponse } from 'next/server';

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

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'PayPal credentials not configured' },
        { status: 500 }
      );
    }

    // Get OAuth token from PayPal
    const tokenResponse = await fetch(
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
        body: 'grant_type=client_credentials',
      }
    );

    if (!tokenResponse.ok) {
      console.error('PayPal token error:', tokenResponse.status);
      return NextResponse.json(
        { error: 'Failed to authenticate with PayPal' },
        { status: 502 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get subscription details
    const subscriptionResponse = await fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${encodeURIComponent(subscriptionId)}`,
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
        return NextResponse.json(
          { error: 'Subscription not found' },
          { status: 404 }
        );
      }
      console.error('PayPal subscription error:', subscriptionResponse.status);
      return NextResponse.json(
        { error: 'Failed to verify subscription' },
        { status: 502 }
      );
    }

    const subscriptionData = await subscriptionResponse.json();

    return NextResponse.json({
      status: subscriptionData.status,
      planId: subscriptionData.plan_id,
      subscriberId: subscriptionData.subscriber?.payer_id || null,
    });
  } catch (error) {
    console.error('Verify subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
