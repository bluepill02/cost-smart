import type { Metadata } from 'next';
import BudgetAnalyzer from '@/components/features/BudgetAnalyzer';
import AdContainer from '@/components/ads/AdContainer';

export const metadata: Metadata = {
  title: 'Smart Budget Analyzer - AI-Powered Expense Tracking | CostSmart',
  description: 'Upload your bank statement and get AI-powered insights on spending patterns, budget optimization, and personalized savings recommendations. Free CSV analyzer.',
  keywords: 'budget analyzer, expense tracker, spending analysis, AI categorization, personal finance, savings optimizer, bank statement analyzer',
  openGraph: {
    title: 'Smart Budget Analyzer - AI-Powered Expense Tracking',
    description: 'Upload bank statement, analyze spending patterns, get AI recommendations',
    url: '/tools/budget-analyzer',
    type: 'website',
  },
};

export default function BudgetAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Budget Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Upload your bank statement and get instant AI-powered insights on spending patterns,
            budget optimization, and personalized savings recommendations.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              🔒 100% Private (Client-side processing)
            </span>
            <span className="flex items-center gap-1">
              🤖 AI-Powered Categorization
            </span>
            <span className="flex items-center gap-1">
              💰 Smart Savings Recommendations
            </span>
          </div>
        </div>

        {/* Top Ad */}
        <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mb-8" />

        {/* Budget Analyzer Component */}
        <BudgetAnalyzer />

        {/* Features */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📤</span>
              </div>
              <h3 className="font-semibold mb-2">1. Upload Statement</h3>
              <p className="text-sm text-gray-600">
                Upload your bank statement in CSV format. We support all major Indian banks.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-sm text-gray-600">
                Our AI automatically categorizes expenses, detects patterns, and identifies overspending areas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="font-semibold mb-2">3. Get Insights</h3>
              <p className="text-sm text-gray-600">
                Receive personalized recommendations to optimize your budget and increase savings.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            🔒 Your Privacy Matters
          </h3>
          <p className="text-sm text-green-800">
            All analysis happens directly in your browser. Your bank statement data never leaves your device.
            We don't upload, store, or transmit any of your financial information to any server.
          </p>
        </div>

        {/* Related Tools */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Optimize Your Finances Further</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/emergency-fund-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">💰 Emergency Fund Calculator</h3>
              <p className="text-sm text-gray-600">Calculate how much you need for financial security</p>
            </a>
            <a
              href="/investment-calculator"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">📈 SIP Calculator</h3>
              <p className="text-sm text-gray-600">Plan your systematic investment strategy</p>
            </a>
            <a
              href="/tools/ai-advisor"
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">🤖 AI Financial Advisor</h3>
              <p className="text-sm text-gray-600">Get personalized financial advice via chat</p>
            </a>
          </div>
        </div>

        {/* Bottom Ad */}
        <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mt-8" />
      </div>
    </div>
  );
}
