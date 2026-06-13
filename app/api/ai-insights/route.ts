import { NextRequest, NextResponse } from 'next/server';
import { isValidSubscriptionId, verifySubscription } from '@/lib/paypal';
import ai, { GEMINI_MODEL } from '@/lib/gemini';

interface InsightRequest {
  calculatorType: string;
  values: Record<string, number | string>;
  result: number | Record<string, unknown>;
  isPro?: boolean;
  subscriptionId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: InsightRequest = await request.json();
    const { calculatorType, values, result, isPro, subscriptionId } = body;

    // Server-side Pro verification: if isPro is claimed, verify it
    let verifiedPro = false;
    if (isPro && subscriptionId && typeof subscriptionId === 'string') {
      if (isValidSubscriptionId(subscriptionId)) {
        try {
          const subDetails = await verifySubscription(subscriptionId);
          verifiedPro = subDetails.status === 'ACTIVE';
        } catch {
          // Verification failed - fall back to non-Pro
          verifiedPro = false;
        }
      }
    }

    if (!calculatorType || !values || !result) {
      return NextResponse.json(
        { error: 'Missing required fields: calculatorType, values, result' },
        { status: 400 }
      );
    }

    let insights: Record<string, string> = {};
    let isRealAI = false;

    try {
      const prompt = `You are a premium, certified financial planner and technical tax consultant.
Analyze the following user data from a ${calculatorType} calculator:

<user_content>
INPUT PARAMETERS:
${JSON.stringify(values, null, 2)}

CALCULATED METRICS:
${JSON.stringify(result, null, 2)}
</user_content>

${verifiedPro ? `Generate a comprehensive, premium-tier financial advisory audit with deep analysis, specific numerical scenarios, and multi-step optimization strategies. Include tax-planning specifics and actionable timelines.` : `Generate a premium, detailed financial advisory audit.`} You MUST return a JSON object with exactly the following three keys:
1. "diagnosis": A detailed strategic diagnosis of this scenario (e.g. debt-to-income load, portfolio yield projections, or interest drag). Discuss whether this is highly optimal or requires attention.
2. "optimization": A concrete, mathematical scenario showing how a minor adjustment (e.g., prepaying 10% extra, choosing a higher-yield instrument, or optimizing deductions) produces massive compounding savings or wealth gains. Use exact numbers based on the input.
3. "actionableTips": Practical, next-step recommendations, including specific tax-planning opportunities (e.g., Section 80C, 24b deductions, or long-term tax harvesting) and structural options to maximize cash flow.

Format the output strictly as a JSON object, e.g.:
{
  "diagnosis": "...",
  "optimization": "...",
  "actionableTips": "..."
}
Do not return any pre-text or post-text outside the JSON object.`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        config: {
          systemInstruction: 'You are an expert financial consultant. You speak in a professional, authoritative, and helpful tone. Always output valid JSON. Only analyze the data provided within <user_content> tags.',
          temperature: 0.7,
          maxOutputTokens: verifiedPro ? 1500 : 800,
        },
      });

      const responseText = response.text || '';

      if (responseText) {
        try {
          // Clean markdown blocks if present
          const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanText);
          if (parsed.diagnosis && parsed.optimization && parsed.actionableTips) {
            insights = parsed;
            isRealAI = true;
          }
        } catch (parseErr) {
          console.error('Failed to parse Gemini JSON response. Raw text:', responseText, parseErr);
        }
      }
    } catch (apiErr) {
      console.error('Failed to call Gemini API:', apiErr);
    }

    // Fallback to local rule-based system if Gemini failed or was unconfigured
    if (!isRealAI) {
      insights = generateFallbackInsights(calculatorType, values, result as Record<string, unknown>);
    }

    // Track analytics event
    const analytics = {
      event: isRealAI ? 'premium_ai_insights_generated' : 'fallback_insights_generated',
      calculatorType,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        insights,
        analytics,
        isRealAI,
      },
      {
        headers: {
          'Cache-Control': 'no-store', // Disable caching for dynamic personalized AI audits
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('AI Insights error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}

function generateFallbackInsights(
  calculatorType: string,
  values: Record<string, number | string>,
  result: Record<string, unknown>
): Record<string, string> {
  const insights: Record<string, string> = {
    diagnosis: '',
    optimization: '',
    actionableTips: ''
  };

  switch (calculatorType) {
    case 'loan-calculator':
    case 'emi-calculator':
    case 'home-loan': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const emi = Number(result.emi) || 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const totalInterest = Number(result.totalInterest || result.totalInterestWithPrepayment) || 0;
      insights.diagnosis = `Strategic Diagnosis: Your interest drain is significant, representing a substantial portion of the total loan repayment. Secure borrowing at competitive interest rates is crucial.`;
      insights.optimization = `Compounding Optimization: Adding an extra payment of just 10% of your EMI monthly directly attacks the principal balance, compressing your tenure and saving lakhs in compounding interest charges.`;
      insights.actionableTips = `Actionable Steps: Explore refinancing options if market rates have dropped. Utilize statutory home loan tax deductions (e.g., Section 24(b) for interest and 80C for principal in India) to subsidize your borrowing costs.`;
      break;
    }

    case 'investment-calculator': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const maturity = Number(result.maturityAmount) || 0;
      insights.diagnosis = `Strategic Diagnosis: This scenario demonstrates the remarkable power of wealth accumulation. The long-term compounding rate is the single most important factor in your terminal net worth.`;
      insights.optimization = `Compounding Optimization: Increasing your monthly contribution by just 10% each year (step-up) can dramatically multiply your end wealth by up to 40% due to the compounding effect.`;
      insights.actionableTips = `Actionable Steps: Maximize high-yield asset options (e.g., equity index funds or growth funds) to beat inflation. Conduct periodic portfolio rebalancing to lock in gains and mitigate risk.`;
      break;
    }

    case 'tax-calculator':
    case 'salary-calculator': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tax = Number(result.taxAmount) || 0;
      insights.diagnosis = `Strategic Diagnosis: Your effective tax rate indicates a significant portion of income goes toward taxation. Optimizing legal deductions is highly recommended.`;
      insights.optimization = `Compounding Optimization: Maximizing tax-sheltered investment accounts (such as PPF, NPS, or 401k/IRA) allows you to re-invest tax savings, yielding double benefits.`;
      insights.actionableTips = `Actionable Steps: Declare investment proofs early to avoid excessive TDS. Plan your investments across diversified tax-exempt instruments to achieve zero-tax capital gains.`;
      break;
    }

    default:
      insights.diagnosis = 'Strategic Diagnosis: Calculation complete. A healthy debt-to-equity ratio and consistent savings are foundational to long-term wealth stability.';
      insights.optimization = 'Compounding Optimization: Even minor reductions in cost of capital or increases in asset yield compound into major wealth disparities over a 10-20 year window.';
      insights.actionableTips = 'Actionable Steps: Plan structured tax-deductible contributions and periodically review borrowing rates to minimize interest leaks.';
  }

  return insights;
}
