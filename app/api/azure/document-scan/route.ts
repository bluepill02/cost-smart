import { NextRequest, NextResponse } from 'next/server';
import { isValidSubscriptionId, verifySubscription } from '@/lib/paypal';
import { azureReadOCR } from '@/lib/azure-ai';

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

    // Convert base64 to Buffer for Azure Computer Vision Read API
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Use Azure Computer Vision Read API (async polling) for OCR
    let extractedText = '';
    try {
      extractedText = await azureReadOCR(imageBuffer);
    } catch (apiErr) {
      console.error('Azure Computer Vision OCR error:', apiErr);
      return NextResponse.json(
        { error: 'OCR service unavailable. Please try again later.' },
        { status: 502 }
      );
    }

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
