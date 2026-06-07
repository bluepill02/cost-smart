import { NextRequest, NextResponse } from 'next/server';

const AZURE_API_KEY = process.env.AZURE_AI_KEY || '';
const AZURE_REGION = 'centralindia';
const AZURE_ENDPOINT = process.env.AZURE_AI_ENDPOINT || '';
const DETECT_ENDPOINT = `${AZURE_ENDPOINT}/translator/text/v3.0/detect`;

// NOTE (accepted trade-off): This in-memory rate limiter resets on each
// serverless cold start and is not shared across concurrent Vercel function
// instances. The effective rate limit is per-instance, not global.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

interface DetectRequest {
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: DetectRequest = await request.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Missing required field: text' },
        { status: 400 }
      );
    }

    if (text.length > 1000) {
      return NextResponse.json(
        { error: 'Text too long for detection. Maximum 1,000 characters.' },
        { status: 400 }
      );
    }

    const requestBody = [{ Text: text.slice(0, 1000) }];

    const response = await fetch(`${DETECT_ENDPOINT}?api-version=3.0`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
        'Ocp-Apim-Subscription-Region': AZURE_REGION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Azure Detect API error:', response.status, errText);
      return NextResponse.json(
        { error: 'Language detection service unavailable. Please try again later.' },
        { status: 502 }
      );
    }

    const result = await response.json();

    const detection = result[0];

    return NextResponse.json({
      success: true,
      language: detection?.language || 'unknown',
      confidence: detection?.score || 0,
      alternatives: detection?.alternatives || [],
    });
  } catch (error) {
    console.error('Language detection error:', error);
    return NextResponse.json(
      { error: 'Failed to detect language. Please try again.' },
      { status: 500 }
    );
  }
}
