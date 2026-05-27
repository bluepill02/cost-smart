import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionByEmail } from '@/lib/kv-store';

interface RouteEstimateRequest {
  origin: string;
  destination: string;
  isPro?: boolean;
  email?: string;
}

// Note: This in-memory store is best-effort on serverless platforms.
// The Google API key's per-key quota provides the real cost protection layer.
const rateLimitStore = new Map<string, { count: number; date: string }>();

const FREE_LIMIT = 3;
const PRO_LIMIT = 30;

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
    // New day or first request - check against limit without incrementing
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

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }
  return `${minutes} min`;
}

export async function POST(request: NextRequest) {
  try {
    const body: RouteEstimateRequest = await request.json();
    const { origin, destination, isPro, email } = body;

    // Validate origin and destination
    if (!origin || typeof origin !== 'string' || origin.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: origin must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!destination || typeof destination !== 'string' || destination.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: destination must be a non-empty string' },
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
        { error: 'Routes API is not configured' },
        { status: 500 }
      );
    }

    // Call Google Routes API v2
    const routesResponse = await fetch(
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'routes.duration,routes.distanceMeters,routes.legs.duration,routes.legs.distanceMeters',
        },
        body: JSON.stringify({
          origin: { address: origin.trim() },
          destination: { address: destination.trim() },
          travelMode: 'DRIVE',
        }),
      }
    );

    if (!routesResponse.ok) {
      const errorText = await routesResponse.text();
      console.error('Google Routes API error:', routesResponse.status, errorText);

      return NextResponse.json(
        { error: 'Failed to fetch route data from upstream API' },
        { status: 502 }
      );
    }

    // Increment rate limit only after a successful upstream response
    incrementRateLimit(clientIp);

    const routesData = await routesResponse.json();

    const route = routesData.routes?.[0];
    if (!route) {
      return NextResponse.json(
        { error: 'No route found between the specified locations' },
        { status: 404 }
      );
    }

    const distanceMeters = route.distanceMeters || 0;
    const distanceMiles = Math.round((distanceMeters / 1609.344) * 100) / 100;

    // Duration comes as a string like "1234s"
    const durationStr = route.duration || '0s';
    const durationSeconds = parseInt(durationStr.replace('s', ''), 10) || 0;
    const durationText = formatDuration(durationSeconds);

    const response = {
      success: true,
      data: {
        distanceMeters,
        distanceMiles,
        durationSeconds,
        durationText,
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
    console.error('Route estimate error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
