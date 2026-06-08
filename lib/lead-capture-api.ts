'use client';

interface LeadCaptureData {
  email: string;
  name?: string;
  formSource: string;
  pageUrl?: string;
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

/**
 * Parse UTM parameters from the current page URL.
 */
function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const result: Record<string, string> = {};

  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Submit lead capture data to the API endpoint.
 * Fire-and-forget: never throws to the caller.
 */
export function submitLeadCapture(data: LeadCaptureData): void {
  try {
    const payload = {
      email: data.email,
      name: data.name,
      formSource: data.formSource,
      pageUrl: data.pageUrl || (typeof window !== 'undefined' ? window.location.href : ''),
      timestamp: new Date().toISOString(),
      utmParams: data.utmParams || getUtmParams(),
      calculatorContext: data.calculatorContext,
    };

    fetch('/api/lead-capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.error('[lead-capture-api] Submit error:', err);
    });
  } catch (err) {
    console.error('[lead-capture-api] Error preparing lead data:', err);
  }
}
