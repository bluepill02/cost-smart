/**
 * Azure AI Services multi-service configuration and helpers.
 *
 * This module provides authenticated REST API helpers for:
 * - Azure Translator (translate + detect)
 * - Azure Computer Vision (Read/OCR)
 * - Azure Text Analytics (sentiment + key phrases)
 *
 * All calls use native fetch() with Ocp-Apim-Subscription-Key authentication.
 */

const AZURE_ENDPOINT = process.env.AZURE_AI_ENDPOINT || '';
const AZURE_KEY = process.env.AZURE_AI_KEY || '';
const AZURE_REGION = process.env.AZURE_AI_REGION || '';

function getConfig() {
  if (!AZURE_ENDPOINT || !AZURE_KEY || !AZURE_REGION) {
    throw new Error('Azure AI Services credentials not configured. Set AZURE_AI_ENDPOINT, AZURE_AI_KEY, and AZURE_AI_REGION.');
  }
  return { endpoint: AZURE_ENDPOINT.replace(/\/$/, ''), key: AZURE_KEY, region: AZURE_REGION };
}

// ─── Translator ────────────────────────────────────────────────────────────────

export interface TranslatorTranslation {
  text: string;
  to: string;
}

export interface TranslatorDetectedLanguage {
  language: string;
  score: number;
}

export interface TranslatorResult {
  detectedLanguage?: TranslatorDetectedLanguage;
  translations: TranslatorTranslation[];
}

/**
 * Translate one or more texts using Azure Translator (multi-service endpoint).
 */
export async function azureTranslate(
  texts: string[],
  to: string,
  from?: string
): Promise<TranslatorResult[]> {
  const { endpoint, key, region } = getConfig();

  const params = new URLSearchParams({ 'api-version': '3.0', to });
  if (from) params.set('from', from);

  const url = `${endpoint}/translator/text/v3.0/translate?${params.toString()}`;

  const body = texts.map((t) => ({ Text: t }));

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Ocp-Apim-Subscription-Region': region,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Azure Translator error ${res.status}: ${errText}`);
  }

  return res.json();
}

export interface DetectResult {
  language: string;
  score: number;
  isTranslationSupported: boolean;
  isTransliterationSupported: boolean;
  alternatives?: { language: string; score: number }[];
}

/**
 * Detect language of a text using Azure Translator Detect endpoint.
 */
export async function azureDetectLanguage(text: string): Promise<DetectResult[]> {
  const { endpoint, key, region } = getConfig();

  const url = `${endpoint}/translator/text/v3.0/detect?api-version=3.0`;

  const body = [{ Text: text }];

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Ocp-Apim-Subscription-Region': region,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Azure Translator Detect error ${res.status}: ${errText}`);
  }

  return res.json();
}

// ─── Computer Vision (Read / OCR) ─────────────────────────────────────────────

/**
 * Submit an image to Azure Computer Vision Read API and poll for results.
 * Accepts raw binary (Buffer) for base64 decoded images.
 */
export async function azureReadOCR(imageBuffer: Buffer): Promise<string> {
  const { endpoint, key } = getConfig();

  const analyzeUrl = `${endpoint}/vision/v3.2/read/analyze`;

  // Submit the image for analysis
  // Convert Buffer to Uint8Array for fetch body compatibility
  const bodyData = new Uint8Array(imageBuffer);
  const submitRes = await fetch(analyzeUrl, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/octet-stream',
    },
    body: bodyData,
  });

  if (!submitRes.ok) {
    const errText = await submitRes.text();
    throw new Error(`Azure Computer Vision Read submit error ${submitRes.status}: ${errText}`);
  }

  // Get the Operation-Location header for polling
  const operationLocation = submitRes.headers.get('Operation-Location');
  if (!operationLocation) {
    throw new Error('Azure Computer Vision Read: no Operation-Location header returned');
  }

  // Poll for results (max 30 seconds)
  const maxAttempts = 30;
  const pollInterval = 1000; // 1 second

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval));

    const pollRes = await fetch(operationLocation, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
      },
    });

    if (!pollRes.ok) {
      const errText = await pollRes.text();
      throw new Error(`Azure Computer Vision Read poll error ${pollRes.status}: ${errText}`);
    }

    const result = await pollRes.json();

    if (result.status === 'succeeded') {
      // Extract all text from read results
      const lines: string[] = [];
      if (result.analyzeResult?.readResults) {
        for (const page of result.analyzeResult.readResults) {
          for (const line of page.lines || []) {
            lines.push(line.text);
          }
        }
      }
      return lines.join('\n');
    } else if (result.status === 'failed') {
      throw new Error('Azure Computer Vision Read analysis failed');
    }
    // Otherwise status is "running" or "notStarted", keep polling
  }

  throw new Error('Azure Computer Vision Read: timed out waiting for results');
}

// ─── Text Analytics ────────────────────────────────────────────────────────────

export interface TextAnalyticsSentimentResult {
  sentiment: string; // positive, negative, neutral, mixed
  confidenceScores: { positive: number; neutral: number; negative: number };
}

export interface TextAnalyticsKeyPhrasesResult {
  keyPhrases: string[];
}

/**
 * Analyze sentiment using Azure Text Analytics.
 */
export async function azureSentiment(
  text: string,
  language: string = 'en'
): Promise<TextAnalyticsSentimentResult> {
  const { endpoint, key } = getConfig();

  const url = `${endpoint}/text/analytics/v3.1/sentiment`;

  const body = {
    documents: [{ id: '1', language, text }],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Azure Text Analytics Sentiment error ${res.status}: ${errText}`);
  }

  const result = await res.json();
  const doc = result.documents?.[0];

  if (!doc) {
    throw new Error('Azure Text Analytics Sentiment: no documents in response');
  }

  return {
    sentiment: doc.sentiment,
    confidenceScores: doc.confidenceScores,
  };
}

/**
 * Extract key phrases using Azure Text Analytics.
 */
export async function azureKeyPhrases(
  text: string,
  language: string = 'en'
): Promise<TextAnalyticsKeyPhrasesResult> {
  const { endpoint, key } = getConfig();

  const url = `${endpoint}/text/analytics/v3.1/keyPhrases`;

  const body = {
    documents: [{ id: '1', language, text }],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Azure Text Analytics Key Phrases error ${res.status}: ${errText}`);
  }

  const result = await res.json();
  const doc = result.documents?.[0];

  if (!doc) {
    throw new Error('Azure Text Analytics Key Phrases: no documents in response');
  }

  return {
    keyPhrases: doc.keyPhrases || [],
  };
}
