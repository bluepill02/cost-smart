import { NextRequest, NextResponse } from 'next/server';
import { isValidSubscriptionId, verifySubscription } from '@/lib/paypal';
import { azureSentiment, azureKeyPhrases } from '@/lib/azure-ai';

// Positive financial indicators that boost the health score
const POSITIVE_PHRASES = [
  'savings', 'investment', 'profit', 'growth', 'dividend', 'appreciation',
  'surplus', 'income', 'earning', 'gain', 'return', 'asset', 'wealth',
  'retirement fund', 'emergency fund', 'diversified', 'compounding',
  'passive income', 'net worth', 'financial freedom', 'debt free',
  'budget surplus', 'on track', 'ahead of schedule', 'paid off',
];

// Negative financial indicators that reduce the health score
const NEGATIVE_PHRASES = [
  'overdue', 'penalty', 'insufficient', 'debt', 'default', 'bankruptcy',
  'overdraft', 'late fee', 'collection', 'foreclosure', 'loss',
  'decline', 'deficit', 'liability', 'outstanding balance', 'overdrawn',
  'minimum payment', 'high interest', 'credit card debt', 'payday loan',
  'missed payment', 'bounced', 'delinquent', 'repossession', 'garnishment',
];

interface HealthRequest {
  text: string;
  isPro?: boolean;
  subscriptionId?: string;
}

interface SentimentScores {
  positive: number;
  neutral: number;
  negative: number;
}

interface AnalysisResult {
  score: number;
  sentiment: string;
  confidenceScores: SentimentScores;
  keyPhrases: string[];
  positiveIndicators: string[];
  negativeIndicators: string[];
  recommendations: string[];
}

function computeHealthScore(
  sentiment: string,
  confidenceScores: SentimentScores,
  keyPhrases: string[]
): number {
  // Base score from sentiment (0-60 points)
  let baseScore = 50;
  if (sentiment === 'positive') baseScore = 70;
  else if (sentiment === 'negative') baseScore = 30;
  else if (sentiment === 'mixed') baseScore = 45;

  // Adjust by confidence (up to +/- 10)
  const sentimentAdjust = (confidenceScores.positive - confidenceScores.negative) * 10;
  baseScore += sentimentAdjust;

  // Key phrase analysis (up to +/- 30)
  const lowerPhrases = keyPhrases.map(p => p.toLowerCase());
  let phraseScore = 0;

  for (const phrase of lowerPhrases) {
    if (POSITIVE_PHRASES.some(pos => phrase.includes(pos))) {
      phraseScore += 3;
    }
    if (NEGATIVE_PHRASES.some(neg => phrase.includes(neg))) {
      phraseScore -= 3;
    }
  }

  // Clamp phrase adjustment to +/- 30
  phraseScore = Math.max(-30, Math.min(30, phraseScore));
  baseScore += phraseScore;

  // Clamp final score to 0-100
  return Math.max(0, Math.min(100, Math.round(baseScore)));
}

function generateRecommendations(
  score: number,
  positiveIndicators: string[],
  negativeIndicators: string[]
): string[] {
  const recommendations: string[] = [];

  if (score < 30) {
    recommendations.push('Consider consulting a financial advisor to create a debt repayment plan.');
    recommendations.push('Focus on building an emergency fund of at least 3 months of expenses.');
    recommendations.push('Prioritize paying off high-interest debt before new investments.');
  } else if (score < 50) {
    recommendations.push('Review your monthly budget to identify areas where you can cut spending.');
    recommendations.push('Set up automatic transfers to a savings account each payday.');
    recommendations.push('Look into consolidating high-interest debts for lower rates.');
  } else if (score < 70) {
    recommendations.push('Your finances are on a stable path. Consider increasing your savings rate.');
    recommendations.push('Explore tax-advantaged investment options like PPF or ELSS.');
    recommendations.push('Build your emergency fund to cover 6 months of expenses.');
  } else {
    recommendations.push('Excellent financial health! Consider diversifying your investments further.');
    recommendations.push('Look into maximizing tax benefits through Section 80C and 80D deductions.');
    recommendations.push('Consider increasing SIP amounts to accelerate wealth creation.');
  }

  if (negativeIndicators.length > 2) {
    recommendations.push('Multiple financial stress indicators detected. Create a priority list to address them one by one.');
  }

  if (positiveIndicators.length > 3) {
    recommendations.push('Strong positive indicators found. Maintain your current financial discipline.');
  }

  return recommendations.slice(0, 5);
}

export async function POST(request: NextRequest) {
  try {
    const body: HealthRequest = await request.json();
    const { text, isPro, subscriptionId } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing required field: text content for analysis' },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'Text exceeds maximum length of 5000 characters.' },
        { status: 400 }
      );
    }

    // Server-side Pro verification
    let verifiedPro = false;
    if (isPro && subscriptionId && typeof subscriptionId === 'string') {
      if (isValidSubscriptionId(subscriptionId)) {
        try {
          const subDetails = await verifySubscription(subscriptionId);
          verifiedPro = subDetails.status === 'ACTIVE';
        } catch {
          verifiedPro = false;
        }
      }
    }

    let sentiment = 'neutral';
    let confidenceScores: SentimentScores = { positive: 0, neutral: 1, negative: 0 };
    let keyPhrases: string[] = [];

    try {
      const trimmedText = text.trim();

      // Call Azure Text Analytics: Sentiment and Key Phrases in parallel
      const [sentimentResult, keyPhrasesResult] = await Promise.all([
        azureSentiment(trimmedText),
        azureKeyPhrases(trimmedText),
      ]);

      sentiment = sentimentResult.sentiment;
      confidenceScores = sentimentResult.confidenceScores;
      keyPhrases = keyPhrasesResult.keyPhrases;
    } catch (apiErr) {
      console.error('Azure Text Analytics financial health analysis error:', apiErr);
      // Fallback to local keyword-based analysis instead of returning 502
      const lowerText = text.toLowerCase();
      const foundPositive = POSITIVE_PHRASES.filter(p => lowerText.includes(p));
      const foundNegative = NEGATIVE_PHRASES.filter(p => lowerText.includes(p));
      keyPhrases = [...foundPositive, ...foundNegative];

      if (foundPositive.length > foundNegative.length) {
        sentiment = 'positive';
        confidenceScores = { positive: 0.7, neutral: 0.2, negative: 0.1 };
      } else if (foundNegative.length > foundPositive.length) {
        sentiment = 'negative';
        confidenceScores = { positive: 0.1, neutral: 0.2, negative: 0.7 };
      } else {
        sentiment = 'neutral';
        confidenceScores = { positive: 0.2, neutral: 0.6, negative: 0.2 };
      }
    }

    // Identify positive and negative financial indicators
    const positiveIndicators = keyPhrases.filter(p =>
      POSITIVE_PHRASES.some(pos => p.toLowerCase().includes(pos))
    );
    const negativeIndicators = keyPhrases.filter(p =>
      NEGATIVE_PHRASES.some(neg => p.toLowerCase().includes(neg))
    );

    // Compute financial health score
    const score = computeHealthScore(sentiment, confidenceScores, keyPhrases);

    // Generate recommendations
    const recommendations = generateRecommendations(score, positiveIndicators, negativeIndicators);

    const result: AnalysisResult = {
      score,
      sentiment,
      confidenceScores,
      keyPhrases,
      positiveIndicators,
      negativeIndicators,
      recommendations,
    };

    // Gate response based on Pro status
    if (verifiedPro) {
      return NextResponse.json({
        success: true,
        isPro: true,
        data: result,
      });
    } else {
      // Free users get score only
      return NextResponse.json({
        success: true,
        isPro: false,
        data: {
          score: result.score,
          sentiment: result.sentiment,
          confidenceScores: null,
          keyPhrases: [],
          positiveIndicators: [],
          negativeIndicators: [],
          recommendations: [],
        },
        upgradeMessage: 'Upgrade to Pro for full sentiment breakdown, key phrase analysis, and personalized recommendations.',
      });
    }
  } catch (error) {
    console.error('Financial health analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze financial health. Please try again.' },
      { status: 500 }
    );
  }
}
