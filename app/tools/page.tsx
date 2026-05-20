import { Metadata } from 'next';
import Link from 'next/link';
import { Bot, PieChart, ArrowRight, Zap, Shield } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'AI Financial Tools - Budget Analyzer & Smart Advisor | CostSmart',
  description:
    'Advanced AI-powered financial tools: budget analyzer and smart financial advisor. Get personalized insights on your spending and savings.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/tools` },
};

const TOOLS = [
  {
    title: 'AI Financial Advisor',
    href: '/tools/ai-advisor',
    icon: Bot,
    color: 'emerald',
    headerBg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    desc: 'Ask any financial question and get personalized, data-backed recommendations powered by AI. Covers investments, taxes, loans, and more.',
    features: [
      'Personalized investment advice',
      'Tax optimization suggestions',
      'Loan & EMI guidance',
      'Retirement planning help',
    ],
    badge: 'AI Powered',
  },
  {
    title: 'Budget Analyzer',
    href: '/tools/budget-analyzer',
    icon: PieChart,
    color: 'blue',
    headerBg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    desc: 'Analyze your monthly budget, identify overspending, and get actionable suggestions to improve your savings rate — no account needed.',
    features: [
      'Category-wise spending breakdown',
      'Savings rate analysis',
      'Overspending alerts',
      'Monthly budget recommendations',
    ],
    badge: 'Free',
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-blue-300 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            AI-Powered Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Smart Financial Tools
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Beyond calculators — AI-powered tools that analyze, advise, and help you make smarter financial decisions.
          </p>
        </div>
      </section>

      {/* Ad */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <AdContainer slotId="1706594832" size="leaderboard" />
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 max-w-4xl pb-16 space-y-8">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <div key={tool.href} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className={`${tool.headerBg} px-6 py-5 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl">{tool.title}</h2>
                    <span className="text-white/70 text-xs">{tool.badge}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-6 leading-relaxed">{tool.desc}</p>
                <div className="grid sm:grid-cols-2 gap-2 mb-6">
                  {tool.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-700 transition-colors"
                >
                  Open Tool <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}

        {/* Trust note */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mt-4">
          <Shield className="w-4 h-4 text-emerald-500" />
          All tools run in your browser — no data is stored or sent to servers.
        </div>

        {/* Bottom Ad */}
        <AdContainer slotId="1475703853" size="rectangle" />
      </div>
    </div>
  );
}
