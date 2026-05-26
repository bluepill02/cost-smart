import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionByEmail } from '@/lib/kv-store';

interface ExploreRequest {
  latitude: number;
  longitude: number;
  isPro?: boolean;
  email?: string;
}

interface PlaceResult {
  name: string;
  distance: number;
  rating?: number;
  userRatingCount?: number;
  formattedAddress?: string;
}

interface CategoryResult {
  category: string;
  places: PlaceResult[];
}

// Note: This in-memory store is best-effort on serverless platforms.
// The Google API key's per-key quota provides the real cost protection layer.
const rateLimitStore = new Map<string, { count: number; date: string }>();

const FREE_LIMIT = 2;
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

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculateNeighborhoodScore(
  categories: { places: PlaceResult[]; maxRadius: number }[]
): number {
  let totalScore = 0;

  for (const category of categories) {
    const { places, maxRadius } = category;
    const count = places.length;

    // Count contribution: min(count, 3) / 3 * 10
    const countScore = (Math.min(count, 3) / 3) * 10;

    // Distance contribution: (1 - avgDistance/maxRadius) * 10
    let distanceScore = 0;
    if (count > 0) {
      const avgDistance =
        places.reduce((sum, p) => sum + p.distance, 0) / count;
      distanceScore = Math.max(0, (1 - avgDistance / maxRadius) * 10);
    }

    totalScore += countScore + distanceScore;
  }

  return Math.round(Math.min(100, Math.max(0, totalScore)));
}

const CATEGORIES = [
  { query: 'schools', radius: 2000 },
  { query: 'hospitals clinics', radius: 3000 },
  { query: 'parks recreation', radius: 2000 },
  { query: 'transit stations', radius: 1500 },
  { query: 'grocery shopping', radius: 1500 },
] as const;

const CATEGORY_NAMES = [
  'Schools',
  'Hospitals/Clinics',
  'Parks/Recreation',
  'Transit Stations',
  'Grocery/Shopping',
];

export async function POST(request: NextRequest) {
  try {
    const body: ExploreRequest = await request.json();
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
        { error: 'Neighborhood API is not configured' },
        { status: 500 }
      );
    }

    // Call Google Places API (New) Text Search for each category
    const fieldMask =
      'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.location';

    const categoryResults: CategoryResult[] = [];
    const scoreInputs: { places: PlaceResult[]; maxRadius: number }[] = [];

    for (let i = 0; i < CATEGORIES.length; i++) {
      const { query, radius } = CATEGORIES[i];
      const textQuery = `${query} near ${latitude},${longitude}`;

      try {
        const placesResponse = await fetch(
          'https://places.googleapis.com/v1/places:searchText',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': fieldMask,
            },
            body: JSON.stringify({
              textQuery,
              locationBias: {
                circle: {
                  center: { latitude, longitude },
                  radius,
                },
              },
            }),
          }
        );

        if (!placesResponse.ok) {
          const errorText = await placesResponse.text();
          console.error(
            `Google Places API error for ${CATEGORY_NAMES[i]}:`,
            placesResponse.status,
            errorText
          );
          // Continue with empty results for this category
          categoryResults.push({ category: CATEGORY_NAMES[i], places: [] });
          scoreInputs.push({ places: [], maxRadius: radius });
          continue;
        }

        const placesData = await placesResponse.json();
        const places = placesData.places || [];

        // Process places - calculate distance and limit results
        const processedPlaces: PlaceResult[] = places
          .map((place: { displayName?: { text?: string }; location?: { latitude?: number; longitude?: number }; rating?: number; userRatingCount?: number; formattedAddress?: string }) => {
            const placeLat = place.location?.latitude ?? latitude;
            const placeLng = place.location?.longitude ?? longitude;
            const distance = calculateDistance(
              latitude,
              longitude,
              placeLat,
              placeLng
            );

            return {
              name: place.displayName?.text || 'Unknown',
              distance: Math.round(distance),
              rating: place.rating,
              userRatingCount: place.userRatingCount,
              formattedAddress: place.formattedAddress,
            };
          })
          .sort((a: PlaceResult, b: PlaceResult) => a.distance - b.distance)
          .slice(0, 5);

        // Store full results for score calculation
        scoreInputs.push({ places: processedPlaces, maxRadius: radius });

        // Apply tier-based filtering
        if (verifiedPro) {
          categoryResults.push({
            category: CATEGORY_NAMES[i],
            places: processedPlaces.map((p: PlaceResult) => ({
              name: p.name,
              distance: p.distance,
              rating: p.rating,
              userRatingCount: p.userRatingCount,
              formattedAddress: p.formattedAddress,
            })),
          });
        } else {
          // Free tier: top 3 with name and distance only
          categoryResults.push({
            category: CATEGORY_NAMES[i],
            places: processedPlaces.slice(0, 3).map((p: PlaceResult) => ({
              name: p.name,
              distance: p.distance,
            })),
          });
        }
      } catch (categoryError) {
        console.error(
          `Error fetching ${CATEGORY_NAMES[i]}:`,
          categoryError
        );
        categoryResults.push({ category: CATEGORY_NAMES[i], places: [] });
        scoreInputs.push({ places: [], maxRadius: radius });
      }
    }

    // Increment rate limit only after successful upstream responses
    incrementRateLimit(clientIp);

    // Calculate Neighborhood Score
    const neighborhoodScore = calculateNeighborhoodScore(scoreInputs);

    const response = {
      success: true,
      data: {
        categories: categoryResults,
        neighborhoodScore,
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
    console.error('Neighborhood explore error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
