import { NextRequest, NextResponse } from 'next/server';
import { isValidSubscriptionId, verifySubscription } from '@/lib/paypal';

const AZURE_ENDPOINT_BASE = process.env.AZURE_AI_ENDPOINT || '';
const AZURE_ENDPOINT = `${AZURE_ENDPOINT_BASE}/vision/v3.2/read/analyze`;
const AZURE_API_KEY = process.env.AZURE_AI_KEY || '';

interface ScanRequest {
  image: string; // base64 encoded image
  isPro?: boolean;
  subscriptionId?: string;
}

interface LineItem {
  description: string;
  amount: number | null;
}

interface ExtractedData {
  vendor: string | null;
  date: string | null;
  totalAmount: number | null;
  subtotal: number | null;
  tax: number | null;
  gstNumber: string | null;
  invoiceNumber: string | null;
  lineItems: LineItem[];
  rawText: string;
  category: string;
}

function extractFinancialData(text: string): ExtractedData {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract vendor (usually first non-empty line or line with business indicators)
  let vendor: string | null = null;
  for (const line of lines.slice(0, 5)) {
    if (line.length > 2 && !line.match(/^\d/) && !line.match(/^(date|invoice|receipt|bill|tax)/i)) {
      vendor = line;
      break;
    }
  }

  // Extract date patterns
  const datePatterns = [
    /(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})/,
    /(\d{4}[-/.]\d{1,2}[-/.]\d{1,2})/,
    /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{1,2},?\s*\d{4})/i,
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{4})/i,
  ];
  let date: string | null = null;
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      date = match[1];
      break;
    }
  }

  // Extract total amount
  const totalPatterns = [
    /(?:total|grand\s*total|amount\s*due|net\s*amount|balance\s*due)[:\s]*[₹$]?\s*([\d,]+\.?\d*)/i,
    /[₹$]\s*([\d,]+\.?\d*)\s*(?:total|due)/i,
    /(?:total)[:\s]*(?:rs\.?|inr)?\s*([\d,]+\.?\d*)/i,
  ];
  let totalAmount: number | null = null;
  for (const pattern of totalPatterns) {
    const match = text.match(pattern);
    if (match) {
      totalAmount = parseFloat(match[1].replace(/,/g, ''));
      break;
    }
  }

  // If no total found, look for largest amount in the text
  if (!totalAmount) {
    const amountMatches = text.match(/[₹$]?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+\.?\d*)/g);
    if (amountMatches) {
      const amounts = amountMatches
        .map(m => parseFloat(m.replace(/[₹$,\s]/g, '')))
        .filter(n => !isNaN(n) && n > 0);
      if (amounts.length > 0) {
        totalAmount = Math.max(...amounts);
      }
    }
  }

  // Extract subtotal
  let subtotal: number | null = null;
  const subtotalMatch = text.match(/(?:sub\s*total|subtotal)[:\s]*[₹$]?\s*([\d,]+\.?\d*)/i);
  if (subtotalMatch) {
    subtotal = parseFloat(subtotalMatch[1].replace(/,/g, ''));
  }

  // Extract tax/GST amount
  let tax: number | null = null;
  const taxMatch = text.match(/(?:tax|gst|vat|cgst|sgst|igst)[:\s]*[₹$]?\s*([\d,]+\.?\d*)/i);
  if (taxMatch) {
    tax = parseFloat(taxMatch[1].replace(/,/g, ''));
  }

  // Extract GST number
  let gstNumber: string | null = null;
  const gstMatch = text.match(/(?:GSTIN|GST\s*(?:No|Number|#)?)[:\s]*([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z][Z][0-9A-Z])/i);
  if (gstMatch) {
    gstNumber = gstMatch[1];
  }

  // Extract invoice number
  let invoiceNumber: string | null = null;
  const invoiceMatch = text.match(/(?:invoice|inv|bill|receipt)\s*(?:no|number|#)?[:\s]*([A-Z0-9-/]+)/i);
  if (invoiceMatch) {
    invoiceNumber = invoiceMatch[1];
  }

  // Extract line items (lines with amounts)
  const lineItems: LineItem[] = [];
  const lineItemPattern = /^(.+?)\s+[₹$]?\s*([\d,]+\.?\d*)\s*$/;
  for (const line of lines) {
    const match = line.match(lineItemPattern);
    if (match && match[1].length > 2) {
      const desc = match[1].trim();
      const amt = parseFloat(match[2].replace(/,/g, ''));
      if (!isNaN(amt) && amt > 0 && !desc.match(/^(total|subtotal|tax|gst|grand)/i)) {
        lineItems.push({ description: desc, amount: amt });
      }
    }
  }

  // Categorize the document
  let category = 'receipt';
  const lowerText = text.toLowerCase();
  if (lowerText.includes('invoice')) category = 'invoice';
  else if (lowerText.includes('bill') || lowerText.includes('utility')) category = 'bill';
  else if (lowerText.includes('salary') || lowerText.includes('pay slip')) category = 'salary_slip';
  else if (lowerText.includes('tax') && (lowerText.includes('return') || lowerText.includes('assessment'))) category = 'tax_document';

  return {
    vendor,
    date,
    totalAmount,
    subtotal,
    tax,
    gstNumber,
    invoiceNumber,
    lineItems,
    rawText: text,
    category,
  };
}

async function pollForResults(operationUrl: string): Promise<string> {
  // Production deployments may need a higher maxAttempts for large documents,
  // but 8 seconds fits within Vercel Hobby/Pro function timeout limits.
  const maxAttempts = 8;
  const delay = 1000;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, delay));

    const response = await fetch(operationUrl, {
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Poll request failed with status ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 'succeeded') {
      const pages = result.analyzeResult?.readResults || [];
      const allText = pages
        .map((page: { lines: { text: string }[] }) =>
          page.lines.map((line: { text: string }) => line.text).join('\n')
        )
        .join('\n');
      return allText;
    } else if (result.status === 'failed') {
      throw new Error('OCR analysis failed');
    }
    // status is 'running' or 'notStarted', continue polling
  }

  throw new Error('OCR polling timed out');
}

export async function POST(request: NextRequest) {
  try {
    const body: ScanRequest = await request.json();
    const { image, isPro, subscriptionId } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'Missing required field: image (base64 encoded)' },
        { status: 400 }
      );
    }

    // Server-side image size validation (reject if > 10MB decoded)
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const estimatedSize = Math.ceil(base64Data.length * 3 / 4);
    if (estimatedSize > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image too large. Maximum size is 10MB.' },
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

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Call Azure Computer Vision OCR
    const analyzeResponse = await fetch(AZURE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
        'Content-Type': 'application/octet-stream',
      },
      body: imageBuffer,
    });

    if (!analyzeResponse.ok) {
      const errText = await analyzeResponse.text();
      console.error('Azure OCR API error:', analyzeResponse.status, errText);
      return NextResponse.json(
        { error: 'OCR service unavailable. Please try again later.' },
        { status: 502 }
      );
    }

    // Get operation location for polling
    const operationLocation = analyzeResponse.headers.get('Operation-Location');
    if (!operationLocation) {
      return NextResponse.json(
        { error: 'Failed to initiate OCR analysis' },
        { status: 502 }
      );
    }

    // Poll for results
    const extractedText = await pollForResults(operationLocation);

    if (!extractedText) {
      return NextResponse.json(
        { error: 'No text detected in the image. Please try a clearer image.' },
        { status: 422 }
      );
    }

    // Extract financial data from OCR text
    const extractedData = extractFinancialData(extractedText);

    // Gate response based on Pro status
    if (verifiedPro) {
      // Pro users get full data
      return NextResponse.json({
        success: true,
        isPro: true,
        data: extractedData,
      });
    } else {
      // Free users get basic total amount only
      return NextResponse.json({
        success: true,
        isPro: false,
        data: {
          vendor: extractedData.vendor,
          date: extractedData.date,
          totalAmount: extractedData.totalAmount,
          category: extractedData.category,
          // Gated fields
          subtotal: null,
          tax: null,
          gstNumber: null,
          invoiceNumber: null,
          lineItems: [],
          rawText: '',
        },
        upgradeMessage: 'Upgrade to Pro for full itemized breakdown, GST details, line items, and expense categorization.',
      });
    }
  } catch (error) {
    console.error('Document scan error:', error);
    return NextResponse.json(
      { error: 'Failed to process document. Please try again.' },
      { status: 500 }
    );
  }
}
