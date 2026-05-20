import { NextRequest, NextResponse } from 'next/server';

interface InsightRequest {
  calculatorType: string;
  values: Record<string, number | string>;
  result: number | Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body: InsightRequest = await request.json();

    const { calculatorType, values, result } = body;

    if (!calculatorType || !values || !result) {
      return NextResponse.json(
        { error: 'Missing required fields: calculatorType, values, result' },
        { status: 400 }
      );
    }

    // Generate insights based on calculator type
    const insights = generateInsights(calculatorType, values, result);

    // Track analytics event
    const analytics = {
      event: 'premium_insight_generated',
      calculatorType,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        insights,
        analytics,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600',
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

function generateInsights(
  calculatorType: string,
  values: Record<string, number | string>,
  result: any
): Record<string, string> {
  const insights: Record<string, string> = {};

  switch (calculatorType) {
    case 'solar-roi':
      insights.paybackPeriod = `Based on your input, your solar installation pays for itself in approximately ${Math.round(result.paybackYears || 5)} years.`;
      insights.savings = `You'll save an estimated ₹${Math.round(result.totalSavings || 0).toLocaleString('en-IN')} over 25 years.`;
      insights.recommendation = result.roi > 15
        ? 'Excellent ROI! Solar installation is highly recommended for your location.'
        : 'Consider other renewable options or optimize your installation size.';
      break;

    case 'emi-calculator':
      insights.monthlyPayment = `Your monthly EMI is ₹${Math.round(result.emi || 0).toLocaleString('en-IN')}.`;
      insights.totalCost = `Total interest paid over the loan tenure: ₹${Math.round(result.totalInterest || 0).toLocaleString('en-IN')}.`;
      insights.prepaymentTip = `Prepaying just ₹${Math.round((result.emi || 0) * 0.25).toLocaleString('en-IN')} extra monthly could save ₹${Math.round((result.totalInterest || 0) * 0.2).toLocaleString('en-IN')} in interest.`;
      break;

    case 'investment-calculator':
      insights.returns = `Expected returns: ₹${Math.round(result.maturityAmount || 0).toLocaleString('en-IN')}.`;
      insights.comparison = `This investment shows ${result.cagr > 12 ? 'strong' : 'moderate'} growth potential.`;
      insights.recommendation = result.cagr > 12
        ? 'Consider diversifying across multiple instruments for better risk management.'
        : 'This is a conservative investment. Explore higher-return options for retirement planning.';
      break;

    case 'tax-calculator':
      insights.taxLiability = `Your estimated tax liability: ₹${Math.round(result.taxAmount || 0).toLocaleString('en-IN')}.`;
      insights.effectiveRate = `Effective tax rate: ${((result.effectiveRate || 0) * 100).toFixed(2)}%.`;
      insights.optimizationTip = `You can potentially save ₹${Math.round((result.taxAmount || 0) * 0.15).toLocaleString('en-IN')} by maximizing Section 80C deductions.`;
      break;

    default:
      insights.general = 'Result calculated successfully. Consider consulting a financial advisor for personalized recommendations.';
  }

  return insights;
}
