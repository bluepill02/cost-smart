import type { Metadata } from 'next';
import DocumentScanner from '@/components/features/DocumentScanner';
import AdContainer from '@/components/ads/AdContainer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  alternates: { canonical: `${CANONICAL_DOMAIN}/tools/document-scanner` },
  title: 'AI Receipt & Invoice Scanner - OCR Expense Tracker | CostSmart',
  description: 'Scan receipts, invoices, and bills with AI-powered OCR. Extract amounts, dates, vendor names, GST details, and line items automatically. Turn photos into organized expense data.',
  keywords: 'receipt scanner, invoice OCR, expense tracker from photos, bill scanner, receipt to text, GST scanner, document OCR, expense management, receipt digitizer',
  openGraph: {
    title: 'AI Receipt & Invoice Scanner - OCR Expense Tracker | CostSmart',
    description: 'Scan receipts and invoices with AI-powered OCR. Extract financial data automatically from photos.',
    url: `${CANONICAL_DOMAIN}/tools/document-scanner`,
    type: 'website',
  },
};

export default function DocumentScannerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <BreadcrumbSchema items={[{ label: 'Tools', href: '/tools' }, { label: 'Document Scanner' }]} currentPath="/tools/document-scanner" />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Document Scanner
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Photograph or upload receipts, invoices, bills, and financial documents.
            Our AI-powered OCR extracts amounts, dates, vendor names, and line items automatically.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              📷 Camera Capture Supported
            </span>
            <span className="flex items-center gap-1">
              🤖 Azure AI OCR
            </span>
            <span className="flex items-center gap-1">
              📊 Auto-Categorization
            </span>
          </div>
        </div>

        {/* Top Ad */}
        <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mb-8" />

        {/* Document Scanner Component */}
        <DocumentScanner />

        {/* How It Works */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📸</span>
              </div>
              <h3 className="font-semibold mb-2">1. Capture or Upload</h3>
              <p className="text-sm text-gray-600">
                Take a photo with your camera or upload an existing image of your receipt, invoice, or bill.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="font-semibold mb-2">2. AI Extracts Data</h3>
              <p className="text-sm text-gray-600">
                Azure AI reads and understands your document, pulling out amounts, dates, vendors, and line items.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="font-semibold mb-2">3. Export & Track</h3>
              <p className="text-sm text-gray-600">
                Review extracted data, export as CSV, and feed directly into your budget tracking workflow.
              </p>
            </div>
          </div>
        </div>

        {/* Supported Documents */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Supported Documents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🧾', title: 'Receipts', desc: 'Store receipts, restaurant bills, online order confirmations' },
              { icon: '📄', title: 'Invoices', desc: 'Business invoices with line items and GST details' },
              { icon: '💡', title: 'Utility Bills', desc: 'Electricity, water, gas, internet, and phone bills' },
              { icon: '💰', title: 'Salary Slips', desc: 'Monthly pay slips with deduction breakdowns' },
              { icon: '📑', title: 'Tax Documents', desc: 'Tax receipts, Form 16, and assessment orders' },
              { icon: '🏥', title: 'Medical Bills', desc: 'Hospital bills, pharmacy receipts, insurance claims' },
            ].map((doc) => (
              <div key={doc.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl flex-shrink-0">{doc.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{doc.title}</h3>
                  <p className="text-xs text-gray-600">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Features */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Pro Features</h2>
          <p className="text-center text-gray-600 mb-6">Unlock the full power of AI document scanning</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              'Full itemized breakdown of all line items',
              'GST number and invoice number extraction',
              'Automatic expense categorization',
              'Raw OCR text export for custom processing',
              'Complete key phrase analysis',
              'Priority processing speed',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm">
                <span className="w-5 h-5 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                {feature}
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>

        {/* Bottom Ad */}
        <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mt-8" />
      </div>
    </div>
  );
}
