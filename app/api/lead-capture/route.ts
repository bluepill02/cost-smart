import { NextRequest, NextResponse } from 'next/server';

interface LeadCaptureBody {
  email: string;
  name?: string;
  formSource: string;
  pageUrl?: string;
  referrer?: string;
  timestamp?: string;
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
  calculatorContext?: {
    calculatorName?: string;
    resultSummary?: string;
  };
}

function computeLeadScore(data: LeadCaptureBody): number {
  let score = 0;

  // Form source scoring with correct identifiers matching actual form submissions
  switch (data.formSource) {
    case 'costsmart-calculator-gate-form':
      // Base 80, +10 for name, +10 for calculator context
      score += 80;
      if (data.name) score += 10;
      if (data.calculatorContext) score += 10;
      return Math.min(score, 100);
    case 'costsmart-exit-intent-form':
      // Base 50, +10 for name, +10 for paid UTM
      score += 50;
      break;
    case 'costsmart-newsletter-form':
    case 'costsmart-blog-sidebar-form':
      // Base 30, +10 for name, +10 for paid UTM
      score += 30;
      break;
    case 'costsmart-bottombar-form':
      // Base 10, +10 for name, +10 for paid UTM
      score += 10;
      break;
  }

  // Name provided
  if (data.name) {
    score += 10;
  }

  // Paid campaign UTM
  if (
    data.utmParams?.utm_medium === 'cpc' ||
    data.utmParams?.utm_medium === 'paid'
  ) {
    score += 10;
  }

  return Math.min(score, 100);
}

function determineLeadTier(score: number): string {
  if (score >= 80) return 'hot';
  if (score >= 50) return 'warm';
  if (score >= 30) return 'cool';
  return 'cold';
}

function determineEngagementPath(leadTier: string): string {
  switch (leadTier) {
    case 'hot':
      return 'immediate_followup';
    case 'warm':
      return 'nurture_sequence';
    case 'cool':
      return 'weekly_digest';
    case 'cold':
      return 'monthly_roundup';
    default:
      return 'monthly_roundup';
  }
}

function determineLeadSegment(data: LeadCaptureBody): string {
  if (data.calculatorContext) {
    return 'calculator_power_user';
  }
  if (data.formSource === 'costsmart-blog-sidebar-form') {
    return 'content_reader';
  }
  if (
    data.formSource === 'costsmart-newsletter-form' ||
    data.formSource === 'costsmart-bottombar-form'
  ) {
    return 'newsletter_subscriber';
  }
  if (data.formSource === 'costsmart-exit-intent-form') {
    return 'exit_intent_capture';
  }
  return 'general';
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadCaptureBody = await req.json();

    // Validate email
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const leadScore = computeLeadScore(body);
    const leadSegment = determineLeadSegment(body);
    const leadTier = determineLeadTier(leadScore);
    const engagementPath = determineEngagementPath(leadTier);

    // Extract referrer and user-agent from request headers
    const referrer =
      body.referrer || req.headers.get('referer') || '';
    const userAgent = req.headers.get('user-agent') || '';

    // Build enriched payload for Zapier
    const zapierPayload = {
      email: body.email,
      name: body.name || '',
      form_source: body.formSource,
      page_url: body.pageUrl || '',
      referrer,
      user_agent: userAgent,
      timestamp: body.timestamp || new Date().toISOString(),
      utm_params: body.utmParams || {},
      lead_score: leadScore,
      lead_tier: leadTier,
      engagement_path: engagementPath,
      lead_segment: leadSegment,
      calculator_context: body.calculatorContext || null,
      submitted_at: new Date().toISOString(),
    };

    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (webhookUrl) {
      // Fire-and-forget: send to Zapier without awaiting
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(zapierPayload),
      }).catch((err) => {
        console.error('[lead-capture] Zapier webhook error:', err);
      });
    } else {
      console.log(
        '[lead-capture] ZAPIER_WEBHOOK_URL not set. Payload:',
        JSON.stringify(zapierPayload)
      );
    }

    return NextResponse.json({ success: true, lead_score: leadScore });
  } catch (err) {
    console.error('[lead-capture] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
