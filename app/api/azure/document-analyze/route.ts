import { NextRequest, NextResponse } from 'next/server';
import { isValidSubscriptionId, verifySubscription } from '@/lib/paypal';

const AZURE_ENDPOINT = process.env.AZURE_AI_ENDPOINT || '';
const AZURE_TEXT_ANALYTICS_ENDPOINT = `${AZURE_ENDPOINT}/text/analytics/v3.1`;
const AZURE_API_KEY = process.env.AZURE_AI_KEY || '';

interface AnalyzeRequest {
  text: string;
  isPro?: boolean;
  subscriptionId?: string;
}

interface DocumentAnalysis {
  keyPhrases: string[];
  sentiment: {
    overall: string;
    confidence: { positive: number; neutral: number; negative: number };
  };
  documentType: string;
  summary: string;
}

function classifyDocumentType(text: string, keyPhrases: string[]): string {
  const lowerText = text.toLowerCase();
  const phraseText = keyPhrases.join(' ').toLowerCase();

  if (lowerText.includes('invoice') || phraseText.includes('invoice')) return 'invoice';
  if (lowerText.includes('receipt') || phraseText.includes('receipt')) return 'receipt';
  if (lowerText.includes('salary') || lowerText.includes('pay slip') || phraseText.includes('salary')) return 'salary_slip';
  if (lowerText.includes('bill') || lowerText.includes('utility') || phraseText.includes('bill')) return 'bill';
  if ((lowerText.includes('tax') && (lowerText.includes('return') || lowerText.includes('assessment'))) || phraseText.includes('tax')) return 'tax_document';
  if (lowerText.includes('insurance') || phraseText.includes('insurance')) return 'insurance';
  return 'receipt';
}

function generateSummary(text: string, keyPhrases: string[], docType: string): string {
  const amountMatch = text.match(/(?:total|amount|due)[\s:]*(?:[₹$][\s:]*)?([\d,]+(?:\.\d*)?)/i);
  const amount = amountMatch ? amountMatch[1] : null;
  const vendorLines = text.split('\n').filter(l => l.trim()).slice(0, 3);
  const vendor = vendorLines[0] || 'Unknown';

  const typeLabels: Record<string, string> = {
    invoice: 'Invoice',
    receipt: 'Receipt',
    salary_slip: 'Salary Slip',
    bill: 'Bill',
    tax_document: 'Tax Document',
    insurance: 'Insurance Document',
  };

  const typeLabel = typeLabels[docType] || 'Document';
  let summary = `${typeLabel} from ${vendor}`;
  if (amount) summary += ` for an amount of ${amount}`;
  if (keyPhrases.length > 0) {
    summary += `. Key items: ${keyPhrases.slice(0, 5).join(', ')}`;
  }
  return summary;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { text, isPro, subscriptionId } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing required field: text' },
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

    // Call Azure Text Analytics - Key Phrases
    const keyPhrasesResponse = await fetch(`${AZURE_TEXT_ANALYTICS_ENDPOINT}/keyPhrases`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documents: [{ id: '1', language: 'en', text: text.slice(0, 5000) }],
      }),
    });

    let keyPhrases: string[] = [];
    if (keyPhrasesResponse.ok) {
      const kpData = await keyPhrasesResponse.json();
      keyPhrases = kpData.documents?.[0]?.keyPhrases || [];
    }

    // Call Azure Text Analytics - Sentiment
    const sentimentResponse = await fetch(`${AZURE_TEXT_ANALYTICS_ENDPOINT}/sentiment`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documents: [{ id: '1', language: 'en', text: text.slice(0, 5000) }],
      }),
    });

    let sentiment = { overall: 'neutral', confidence: { positive: 0, neutral: 1, negative: 0 } };
    if (sentimentResponse.ok) {
      const sentData = await sentimentResponse.json();
      const doc = sentData.documents?.[0];
      if (doc) {
        sentiment = {
          overall: doc.sentiment || 'neutral',
          confidence: doc.confidenceScores || { positive: 0, neutral: 1, negative: 0 },
        };
      }
    }

    // Classify document type and generate summary
    const documentType = classifyDocumentType(text, keyPhrases);
    const summary = generateSummary(text, keyPhrases, documentType);

    const analysis: DocumentAnalysis = {
      keyPhrases: verifiedPro ? keyPhrases : keyPhrases.slice(0, 3),
      sentiment,
      documentType,
      summary,
    };

    return NextResponse.json({
      success: true,
      isPro: verifiedPro,
      analysis,
      ...(verifiedPro ? {} : { upgradeMessage: 'Upgrade to Pro for complete key phrase extraction and detailed analysis.' }),
    });
  } catch (error) {
    console.error('Document analyze error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze document. Please try again.' },
      { status: 500 }
    );
  }
}
