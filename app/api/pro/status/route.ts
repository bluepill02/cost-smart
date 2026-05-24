import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionByEmail } from '@/lib/kv-store';

// Simple in-memory rate limiter: 10 requests per minute per email
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const key = email.toLowerCase();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid email' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isRateLimited(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const record = await getSubscriptionByEmail(normalizedEmail);

    if (record && record.status === 'ACTIVE') {
      return NextResponse.json({
        isPro: true,
        planId: record.planId,
        subscriptionId: record.subscriptionId,
      });
    }

    return NextResponse.json({ isPro: false });
  } catch (error) {
    console.error('Pro status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
