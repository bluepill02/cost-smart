import { NextRequest, NextResponse } from 'next/server';
import { azureDetectLanguage } from '@/lib/azure-ai';

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

    // Call Azure Translator Detect REST API
    let language = 'unknown';
    let confidence = 0;
    let alternatives: { language: string; score: number }[] = [];
    let isRealAI = false;

    try {
      const results = await azureDetectLanguage(text.slice(0, 1000));

      if (!results || results.length === 0) {
        return NextResponse.json(
          { error: 'Language detection service unavailable. Please try again later.' },
          { status: 502 }
        );
      }

      const primary = results[0];
      language = primary.language || 'unknown';
      confidence = primary.score || 0;
      alternatives = primary.alternatives || [];
      isRealAI = true;
    } catch (apiErr) {
      console.error('Azure Translator Detect API error (using fallback):', apiErr);
      // Simple heuristic-based language detection fallback
      const lowerText = text.toLowerCase();
      if (/[àâçéèêëîïôûùüÿœæ]/.test(text) || /\b(le|la|les|de|du|des|un|une|et|est|sont|dans|pour|avec|que|qui|ce|se|ne|pas|nous|vous|ils|elles)\b/.test(lowerText)) {
        language = 'fr';
        confidence = 0.7;
      } else if (/[äöüß]/.test(text) || /\b(der|die|das|ein|eine|und|ist|sind|nicht|ich|du|er|sie|wir|ihr|haben|werden)\b/.test(lowerText)) {
        language = 'de';
        confidence = 0.7;
      } else if (/[áéíóúñ¿¡]/.test(text) || /\b(el|la|los|las|un|una|de|del|en|es|son|que|por|para|con|se|no|su|al)\b/.test(lowerText)) {
        language = 'es';
        confidence = 0.7;
      } else if (/[\u0900-\u097F]/.test(text)) {
        language = 'hi';
        confidence = 0.9;
      } else if (/[\u0B80-\u0BFF]/.test(text)) {
        language = 'ta';
        confidence = 0.9;
      } else {
        language = 'en';
        confidence = 0.5;
      }
      isRealAI = false;
    }

    return NextResponse.json({
      success: true,
      isRealAI,
      language,
      confidence,
      alternatives,
    });
  } catch (error) {
    console.error('Language detection error:', error);
    return NextResponse.json(
      { error: 'Failed to detect language. Please try again.' },
      { status: 500 }
    );
  }
}
