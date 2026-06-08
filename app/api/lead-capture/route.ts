import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

const LEADS_QUEUE_PATH = '/tmp/costsmart-leads-queue.json';

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

function getMailchimpTag(leadTier: string): string {
  switch (leadTier) {
    case 'hot':
      return process.env.MAILCHIMP_TAG_HOT || 'CostSmart-Hot-Lead';
    case 'warm':
      return process.env.MAILCHIMP_TAG_WARM || 'CostSmart-Warm-Lead';
    case 'cool':
      return process.env.MAILCHIMP_TAG_COOL || 'CostSmart-Newsletter';
    case 'cold':
      return process.env.MAILCHIMP_TAG_COLD || 'CostSmart-Cold-Lead';
    default:
      return process.env.MAILCHIMP_TAG_COLD || 'CostSmart-Cold-Lead';
  }
}

async function sendToMailchimp(
  email: string,
  name: string,
  leadTier: string,
  formSource: string
): Promise<boolean> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  if (!apiKey) return false;

  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID || '20b157c32a';
  const dc = apiKey.split('-').pop();
  const subscriberHash = createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  const tag = getMailchimpTag(leadTier);

  try {
    // Add/update subscriber
    const response = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: 'subscribed',
          merge_fields: {
            FNAME: name.split(' ')[0] || '',
            LNAME: name.split(' ').slice(1).join(' ') || '',
          },
          tags: [tag],
          source: formSource,
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        '[lead-capture] Mailchimp API error:',
        response.status,
        errorBody
      );
      return false;
    }

    // Apply tag separately (Mailchimp requires a separate call for tags)
    await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}/tags`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tags: [{ name: tag, status: 'active' }],
        }),
      }
    );

    return true;
  } catch (err) {
    console.error('[lead-capture] Mailchimp fallback error:', err);
    return false;
  }
}

async function queueLeadToFile(payload: Record<string, unknown>): Promise<void> {
  try {
    let leads: Record<string, unknown>[] = [];

    try {
      const existing = await fs.readFile(LEADS_QUEUE_PATH, 'utf-8');
      leads = JSON.parse(existing);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    leads.push({ ...payload, queued_at: new Date().toISOString() });

    // Ensure the directory exists
    await fs.mkdir(path.dirname(LEADS_QUEUE_PATH), { recursive: true });
    await fs.writeFile(LEADS_QUEUE_PATH, JSON.stringify(leads, null, 2));

    console.warn(
      '[LEAD LOSS RISK] Lead queued to local file. Configure ZAPIER_WEBHOOK_URL or MAILCHIMP_API_KEY to process leads automatically.',
      { email: payload.email, queued_count: leads.length }
    );
  } catch (err) {
    console.error('[LEAD LOSS RISK] Failed to queue lead to file:', err);
  }
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
    const referrer = body.referrer || req.headers.get('referer') || '';
    const userAgent = req.headers.get('user-agent') || '';

    // Build enriched payload
    const enrichedPayload: Record<string, unknown> = {
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
      // PRIMARY: Fire-and-forget to Zapier webhook
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrichedPayload),
      }).catch((err) => {
        console.error('[lead-capture] Zapier webhook error:', err);
      });
    } else if (process.env.MAILCHIMP_API_KEY) {
      // SECONDARY: Direct Mailchimp API call
      sendToMailchimp(
        body.email,
        body.name || '',
        leadTier,
        body.formSource
      ).then((success) => {
        if (!success) {
          // If Mailchimp also fails, queue to file
          queueLeadToFile(enrichedPayload);
        }
      });
    } else {
      // TERTIARY: Queue to local JSON file for later processing
      await queueLeadToFile(enrichedPayload);
    }

    return NextResponse.json({ success: true, lead_score: leadScore });
  } catch (err) {
    console.error('[lead-capture] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
