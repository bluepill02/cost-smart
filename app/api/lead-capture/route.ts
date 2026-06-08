import { NextRequest, NextResponse } from 'next/server';

interface LeadCaptureBody {
  email: string;
  name?: string;
  formSource: string;
  pageUrl?: string;
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

  // Form source scoring
  switch (data.formSource) {
    case 'calculator-gate':
      score += 30;
      break;
    case 'exit-intent':
      score += 20;
      break;
    case 'newsletter':
      score += 15;
      break;
    case 'blog-sidebar':
    case 'bottombar':
      score += 10;
      break;
  }

  // Name provided
  if (data.name) {
    score += 15;
  }

  // Paid campaign UTM
  if (
    data.utmParams?.utm_medium === 'cpc' ||
    data.utmParams?.utm_medium === 'paid'
  ) {
    score += 10;
  }

  // Calculator context present
  if (data.calculatorContext) {
    score += 20;
  }

  return Math.min(score, 100);
}

function determineLeadSegment(data: LeadCaptureBody): string {
  if (data.calculatorContext) {
    return 'calculator_power_user';
  }
  if (data.formSource === 'blog-sidebar') {
    return 'content_reader';
  }
  if (data.formSource === 'newsletter' || data.formSource === 'bottombar') {
    return 'newsletter_subscriber';
  }
  if (data.formSource === 'exit-intent') {
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

    // Build enriched payload for Zapier
    const zapierPayload = {
      email: body.email,
      name: body.name || '',
      form_source: body.formSource,
      page_url: body.pageUrl || '',
      timestamp: body.timestamp || new Date().toISOString(),
      utm_params: body.utmParams || {},
      lead_score: leadScore,
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
