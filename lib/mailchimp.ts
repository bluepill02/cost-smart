import { createHash } from 'crypto';

// --- Types ---

interface MailchimpConfig {
  apiKey: string;
  baseUrl: string;
  audienceId: string;
}

interface MergeFields {
  FNAME?: string;
  LEADSCORE?: number;
  LEADTIER?: string;
  FORMSRC?: string;
  CALCNAME?: string;
  PAGEURL?: string;
}

interface AddOrUpdateOptions {
  statusIfNew?: string;
}

export interface LeadData {
  email: string;
  name?: string;
  formSource: string;
  pageUrl?: string;
  leadScore: number;
  leadTier: string;
  calculatorContext?: { calculatorName?: string; resultSummary?: string };
}

// --- Helpers ---

export function getMailchimpConfig(): MailchimpConfig {
  const apiKey = process.env.MAILCHIMP_API_KEY || '';
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID || '';

  // Extract data center from the API key suffix (e.g., "abc123-us6" -> "us6")
  const parts = apiKey.split('-');
  const dc = parts.length > 1 ? parts[parts.length - 1] : 'us1';

  return {
    apiKey,
    baseUrl: `https://${dc}.api.mailchimp.com/3.0`,
    audienceId,
  };
}

export function getSubscriberHash(email: string): string {
  return createHash('md5').update(email.toLowerCase()).digest('hex');
}

// --- API Functions ---

export async function addOrUpdateSubscriber(
  email: string,
  mergeFields: MergeFields,
  options?: AddOrUpdateOptions
): Promise<void> {
  const { apiKey, baseUrl, audienceId } = getMailchimpConfig();

  if (!apiKey || !audienceId) {
    console.warn('[mailchimp] Missing MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID');
    return;
  }

  const subscriberHash = getSubscriberHash(email);
  const url = `${baseUrl}/lists/${audienceId}/members/${subscriberHash}`;

  const body = {
    email_address: email,
    status_if_new: options?.statusIfNew || 'subscribed',
    merge_fields: mergeFields,
  };

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error('[mailchimp] addOrUpdateSubscriber failed:', res.status, error);
    }
  } catch (err) {
    console.error('[mailchimp] addOrUpdateSubscriber network error:', err);
  }
}

export async function applyTags(
  email: string,
  tagNames: string[]
): Promise<void> {
  const { apiKey, baseUrl, audienceId } = getMailchimpConfig();

  if (!apiKey || !audienceId) {
    console.warn('[mailchimp] Missing MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID');
    return;
  }

  if (tagNames.length === 0) return;

  const subscriberHash = getSubscriberHash(email);
  const url = `${baseUrl}/lists/${audienceId}/members/${subscriberHash}/tags`;

  const body = {
    tags: tagNames.map((name) => ({ name, status: 'active' })),
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error('[mailchimp] applyTags failed:', res.status, error);
    }
  } catch (err) {
    console.error('[mailchimp] applyTags network error:', err);
  }
}

// --- High-Level Orchestrator ---

export async function processLead(leadData: LeadData): Promise<void> {
  try {
    const { email, name, formSource, pageUrl, leadScore, leadTier, calculatorContext } = leadData;

    // Extract first name from full name
    const firstName = name ? name.trim().split(/\s+/)[0] : '';

    // Build merge fields
    const mergeFields: MergeFields = {
      FNAME: firstName,
      LEADSCORE: leadScore,
      LEADTIER: leadTier,
      FORMSRC: formSource,
      CALCNAME: calculatorContext?.calculatorName || '',
      PAGEURL: pageUrl || '',
    };

    // Determine tags based on lead tier
    const tags: string[] = [];

    switch (leadTier) {
      case 'hot':
        tags.push('CostSmart-Hot-Lead');
        break;
      case 'warm':
        tags.push('CostSmart-Warm-Lead');
        break;
      case 'cool':
      case 'cold':
      default:
        tags.push('CostSmart-Cold-Lead');
        break;
    }

    // Additional tags based on form source
    if (formSource === 'newsletter' || formSource === 'costsmart-newsletter-form') {
      tags.push('CostSmart-Newsletter');
    }
    if (formSource === 'budget-download' || formSource === 'costsmart-budget-download-form') {
      tags.push('CostSmart-Budget-Download');
    }

    // Add/update subscriber with merge fields
    await addOrUpdateSubscriber(email, mergeFields);

    // Apply tags
    await applyTags(email, tags);

    console.log('[mailchimp] processLead complete for:', email, { leadTier, tags });
  } catch (err) {
    // Never throw to caller - log and continue
    console.error('[mailchimp] processLead error:', err);
  }
}
