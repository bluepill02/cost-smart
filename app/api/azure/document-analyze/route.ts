import { NextRequest, NextResponse } from 'next/server';
import { isValidSubscriptionId, verifySubscription } from '@/lib/paypal';
import { azureSentiment, azureKeyPhrases } from '@/lib/azure-ai';

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

    let keyPhrases: string[] = [];
    let sentiment = { overall: 'neutral', confidence: { positive: 0, neutral: 1, negative: 0 } };
    let documentType = 'receipt';
    let summary = '';

    try {
      // Call Azure Text Analytics: Key Phrases and Sentiment in parallel
      const truncatedText = text.slice(0, 5000);

      const [sentimentResult, keyPhrasesResult] = await Promise.all([
        azureSentiment(truncatedText),
        azureKeyPhrases(truncatedText),
      ]);

      // Map sentiment result
      sentiment = {
        overall: sentimentResult.sentiment,
        confidence: sentimentResult.confidenceScores,
      };

      // Map key phrases result
      keyPhrases = keyPhrasesResult.keyPhrases;

      // Classify document type using extracted key phrases
      documentType = classifyDocumentType(text, keyPhrases);

      // Generate summary from extracted information
      summary = generateSummary(text, keyPhrases, documentType);
    } catch (apiErr) {
      console.error('Azure Text Analytics document analysis error:', apiErr);
      // Fall back to local classification and summary generation
      keyPhrases = [];
      documentType = classifyDocumentType(text, keyPhrases);
      summary = generateSummary(text, keyPhrases, documentType);
    }

    // If Azure did not provide summary or document type, use fallbacks
    if (!documentType) {
      documentType = classifyDocumentType(text, keyPhrases);
    }
    if (!summary) {
      summary = generateSummary(text, keyPhrases, documentType);
    }

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
