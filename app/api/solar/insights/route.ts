import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionByEmail } from '@/lib/kv-store';

interface SolarInsightRequest {
  latitude: number;
  longitude: number;
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

export async function POST(request: NextRequest) {
  try {
    const body: SolarInsightRequest = await request.json();
    const { latitude, longitude, isPro, email } = body;

    // Validate latitude and longitude
    if (
      latitude === undefined ||
      longitude === undefined ||
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      return NextResponse.json(
        { error: 'Invalid request: latitude and longitude must be valid numbers' },
        { status: 400 }
      );
    }

    if (latitude < -90 || latitude > 90) {
      return NextResponse.json(
        { error: 'Invalid latitude: must be between -90 and 90' },
        { status: 400 }
      );
    }

    if (longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { error: 'Invalid longitude: must be between -180 and 180' },
        { status: 400 }
      );
    }

    // Server-side Pro verification via email (same pattern as /api/pro/status)
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

    // Call Google Solar API
    const apiKey = process.env.GOOGLE_SOLAR_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_SOLAR_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Solar API is not configured' },
        { status: 500 }
      );
    }

    const solarUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${apiKey}`;

    const solarResponse = await fetch(solarUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!solarResponse.ok) {
      const errorText = await solarResponse.text();
      console.error('Google Solar API error:', solarResponse.status, errorText);

      if (solarResponse.status === 404) {
        // Do not increment rate limit on 404 - user should not burn a lookup
        return NextResponse.json(
          { error: 'No solar data available for this location' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to fetch solar data from upstream API' },
        { status: 502 }
      );
    }

    // Increment rate limit only after a successful upstream response
    incrementRateLimit(clientIp);

    const solarData = await solarResponse.json();

    // Extract and structure relevant solar potential data
    const solarPotential = solarData.solarPotential;
    const response = {
      success: true,
      data: {
        imageryDate: solarData.imageryDate,
        regionCode: solarData.regionCode,
        solarPotential: {
          maxArrayPanelsCount: solarPotential?.maxArrayPanelsCount,
          maxArrayAreaMeters2: solarPotential?.maxArrayAreaMeters2,
          maxSunshineHoursPerYear: solarPotential?.maxSunshineHoursPerYear,
          carbonOffsetFactorKgPerMwh: solarPotential?.carbonOffsetFactorKgPerMwh,
          panelCapacityWatts: solarPotential?.panelCapacityWatts,
          panelHeightMeters: solarPotential?.panelHeightMeters,
          panelWidthMeters: solarPotential?.panelWidthMeters,
          panelLifetimeYears: solarPotential?.panelLifetimeYears,
          wholeRoofStats: solarPotential?.wholeRoofStats,
          roofSegmentStats: solarPotential?.roofSegmentStats,
          solarPanelConfigs: solarPotential?.solarPanelConfigs,
          financialAnalyses: solarPotential?.financialAnalyses,
        },
        center: solarData.center,
        boundingBox: solarData.boundingBox,
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
    console.error('Solar insights error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
