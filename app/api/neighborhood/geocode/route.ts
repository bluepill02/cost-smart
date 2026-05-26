import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionByEmail } from '@/lib/kv-store';

interface GeocodeRequest {
  address: string;
  isPro?: boolean;
  email?: string;
}

// Note: This in-memory store is best-effort on serverless platforms.
// The Google API key's per-key quota provides the real cost protection layer.
const rateLimitStore = new Map<string, { count: number; date: string }>();

const FREE_LIMIT = 5;
const PRO_LIMIT = 50;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return 'unknown';
}

function checkRateLimit(ip: string, limit: number): { allowed: boolean; remaining: number } {
  const today = new Date().toISOString().split('T')[0];
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.date !== today) {
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: limit - entry.count - 1 };
}

function incrementRateLimit(ip: string): void {
  const today = new Date().toISOString().split('T')[0];
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.date !== today) {
    rateLimitStore.set(ip, { count: 1, date: today });
  } else {
    entry.count += 1;
    rateLimitStore.set(ip, entry);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GeocodeRequest = await request.json();
    const { address, isPro, email } = body;

    // Validate address
    if (!address || typeof address !== 'string' || address.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: address is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Server-side Pro verification via email
    let verifiedPro = false;
    if (isPro && email && typeof email === 'string') {
      try {
        const normalizedEmail = email.toLowerCase().trim();
        const record = await getSubscriptionByEmail(normalizedEmail);
        verifiedPro = record !== null && record.status === 'ACTIVE';
      } catch {
        verifiedPro = false;
      }
    }

    // Rate limiting - check only, do not increment yet
    const clientIp = getClientIp(request);
    const limit = verifiedPro ? PRO_LIMIT : FREE_LIMIT;
    const { allowed, remaining } = checkRateLimit(clientIp, limit);

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again tomorrow.',
          limit,
          resetAt: 'midnight UTC',
        },
        {
          status: 429,
          headers: {
            'Retry-After': '86400',
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // Check API key configuration
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_MAPS_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Geocoding API is not configured' },
        { status: 500 }
      );
    }

    // Call Google Geocoding API
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address.trim())}&key=${apiKey}`;

    const geocodeResponse = await fetch(geocodeUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!geocodeResponse.ok) {
      const errorText = await geocodeResponse.text();
      console.error('Google Geocoding API error:', geocodeResponse.status, errorText);
      return NextResponse.json(
        { error: 'Failed to fetch geocoding data from upstream API' },
        { status: 502 }
      );
    }

    const geocodeData = await geocodeResponse.json();

    if (
      !geocodeData.results ||
      geocodeData.results.length === 0 ||
      geocodeData.status === 'ZERO_RESULTS'
    ) {
      return NextResponse.json(
        { error: 'No results found for the given address' },
        { status: 404 }
      );
    }

    // Increment rate limit only after successful upstream response
    incrementRateLimit(clientIp);

    const result = geocodeData.results[0];
    const location = result.geometry.location;

    const response = {
      success: true,
      data: {
        latitude: location.lat,
        longitude: location.lng,
        formattedAddress: result.formatted_address,
      },
      rateLimit: {
        limit,
        remaining,
      },
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'private, max-age=3600',
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': String(limit),
        'X-RateLimit-Remaining': String(remaining),
      },
    });
  } catch (error) {
    console.error('Geocode error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
