import type { Metadata } from 'next';
import FinancialHealthAnalyzer from '@/components/features/FinancialHealthAnalyzer';
import AdContainer from '@/components/ads/AdContainer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  alternates: { canonical: `${CANONICAL_DOMAIN}/tools/financial-health` },
  title: 'AI Financial Health Score - Money Health Check & Spending Analysis | CostSmart',
  description: 'Get your AI-powered Financial Health Score (0-100). Analyze bank statements and spending patterns with sentiment analysis. Detect financial stress indicators and get personalized recommendations.',
  keywords: 'financial health check, money health score, spending analysis AI, financial wellness, bank statement analyzer, financial stress test, money habits analysis, personal finance score, financial behavior analysis',
  openGraph: {
    title: 'AI Financial Health Score - Money Health Check | CostSmart',
    description: 'Analyze your financial documents with AI. Get a health score, sentiment breakdown, and personalized recommendations.',
    url: `${CANONICAL_DOMAIN}/tools/financial-health`,
    type: 'website',
  },
};

export default function FinancialHealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <BreadcrumbSchema items={[{ label: 'Tools', href: '/tools' }, { label: 'Financial Health Analyzer' }]} currentPath="/tools/financial-health" />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Financial Health Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Understand the emotional and behavioral patterns in your financial decisions.
            Our AI analyzes not just numbers, but the sentiment behind your money habits.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              💓 Health Score 0-100
            </span>
            <span className="flex items-center gap-1">
              🧠 AI Sentiment Analysis
            </span>
            <span className="flex items-center gap-1">
              📊 Behavioral Insights
            </span>
          </div>
        </div>

        {/* Top Ad */}
        <AdContainer size="leaderboard" className="container mx-auto px-4 max-w-6xl mb-8" />

        {/* Financial Health Analyzer Component */}
        <FinancialHealthAnalyzer />

        {/* How It Works */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="font-semibold mb-2">1. Describe Your Finances</h3>
              <p className="text-sm text-gray-600">
                Paste bank statement descriptions, financial goals, or simply describe your current money situation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="font-semibold mb-2">2. AI Analyzes Patterns</h3>
              <p className="text-sm text-gray-600">
                Azure AI detects sentiment, extracts key financial phrases, and identifies stress vs. confidence patterns.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💯</span>
              </div>
              <h3 className="font-semibold mb-2">3. Get Your Score</h3>
              <p className="text-sm text-gray-600">
                Receive a 0-100 health score with detailed breakdown, key indicators, and actionable recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* What We Analyze */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">What Gets Analyzed</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '📈', title: 'Spending Confidence', desc: 'Detect positive financial language indicating healthy spending habits' },
              { icon: '📉', title: 'Financial Stress', desc: 'Identify anxiety patterns like overdue, penalty, and insufficient fund mentions' },
              { icon: '🔑', title: 'Key Phrases', desc: 'Extract important financial entities - investments, debts, savings, goals' },
              { icon: '🎯', title: 'Behavioral Patterns', desc: 'Understand if your financial decisions lean towards growth or survival' },
              { icon: '💡', title: 'Opportunities', desc: 'Spot areas where you could optimize spending or increase savings' },
              { icon: '⚠️', title: 'Risk Indicators', desc: 'Flag potential issues before they become serious financial problems' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Features */}
        <div className="mt-8 bg-gradient-to-r from-rose-50 to-purple-50 border border-rose-200 rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Pro Features</h2>
          <p className="text-center text-gray-600 mb-6">Unlock the full power of AI financial health analysis</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              'Detailed sentiment distribution chart',
              'Positive & negative indicator breakdown',
              'All key financial phrases extracted',
              'Personalized actionable recommendations',
              'Behavioral pattern analysis',
              'Priority processing speed',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm">
                <span className="w-5 h-5 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                {feature}
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors"
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
