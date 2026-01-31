import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Calculator, Zap } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';

export const metadata: Metadata = {
  title: 'Financial Comparisons - Make Smarter Money Decisions | CostSmart',
  description: 'Compare financial options side-by-side: FD vs Mutual Funds, PPF vs FD, Solar vs Wind, Rent vs Buy. Data-driven analysis to help you choose the best option for your goals.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/compare',
  },
};

export default function ComparePage() {
  const comparisons = [
    {
      title: 'FD vs Mutual Fund',
      slug: 'fd-vs-mutual-fund',
      description: 'Compare Fixed Deposits and Mutual Funds for returns, risk, tax benefits, and liquidity. Find out which suits your investment goals.',
      icon: TrendingUp,
      color: 'emerald',
      categories: ['Investment', 'Tax Planning']
    },
    {
      title: 'PPF vs FD',
      slug: 'ppf-vs-fd',
      description: 'Detailed comparison of Public Provident Fund and Fixed Deposit covering interest rates, tax exemptions, lock-in periods, and long-term wealth creation.',
      icon: Calculator,
      color: 'blue',
      categories: ['Savings', 'Retirement']
    },
    {
      title: 'Solar vs Wind Energy',
      slug: 'solar-vs-wind',
      description: 'Compare Solar and Wind power systems for homes and businesses. Analyze costs, ROI, maintenance, and viability for Indian locations.',
      icon: Zap,
      color: 'amber',
      categories: ['Green Energy', 'ROI']
    },
    {
      title: 'Rent vs Buy vs Invest',
      slug: 'rent-vs-buy-vs-invest',
      description: 'Three-way comparison of renting, buying with home loan, or renting + investing in SIP. See 20-year wealth outcomes and make the smartest property decision.',
      icon: TrendingUp,
      color: 'purple',
      categories: ['Property', 'Wealth']
    }
  ];

  const colorClasses = {
    emerald: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-emerald-200',
    blue: 'border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 hover:shadow-blue-200',
    amber: 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-amber-200',
    purple: 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-purple-200'
  };

  const textColorClasses = {
    emerald: 'text-emerald-900',
    blue: 'text-blue-900',
    amber: 'text-amber-900',
    purple: 'text-purple-900'
  };

  const buttonClasses = {
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    amber: 'bg-amber-600 hover:bg-amber-700 text-white',
    purple: 'bg-purple-600 hover:bg-purple-700 text-white'
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <AdContainer size="leaderboard" className="mb-8" slotId="1475703853" />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Financial <span className="text-emerald-600">Comparisons</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Make informed decisions with side-by-side comparisons of financial products, investments, and strategies. 
            All comparisons backed by real data, calculations, and long-term projections.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {comparisons.map((comparison) => {
            const Icon = comparison.icon;
            return (
              <Card 
                key={comparison.slug}
                className={`border-2 transition-all duration-300 hover:shadow-xl ${colorClasses[comparison.color as keyof typeof colorClasses]}`}
              >
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 ${textColorClasses[comparison.color as keyof typeof textColorClasses]}`}>
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xl">{comparison.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 min-h-[60px]">
                    {comparison.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {comparison.categories.map((category) => (
                      <span 
                        key={category}
                        className="px-3 py-1 bg-white/70 rounded-full text-xs font-semibold text-slate-700 border border-slate-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={`/compare/${comparison.slug}`}
                    className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${buttonClasses[comparison.color as keyof typeof buttonClasses]}`}
                  >
                    Compare Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Use Comparisons Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Why Use Financial Comparisons?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3 text-slate-900">Make Data-Driven Decisions</h3>
                <p className="text-slate-700 mb-4">
                  Stop relying on generic advice or anecdotal experiences. Our comparisons use actual interest rates, 
                  tax laws, historical data, and mathematical projections to show you exactly which option performs better 
                  for your specific situation.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Real numbers from RBI, SEBI, and government sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>10-year, 20-year, and 30-year projections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Tax-adjusted returns (not just headline rates)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 text-slate-900">Avoid Costly Mistakes</h3>
                <p className="text-slate-700 mb-4">
                  A wrong financial decision today can cost you lakhs or even crores over your lifetime. 
                  Our comparisons help you avoid common traps like:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Choosing FD over PPF when you're in 30% tax bracket (losing ₹3L+ in 15 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Buying home at 25 instead of investing in SIP (missing out on ₹2-3 Cr wealth)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>Installing wind turbine where solar makes 5X more sense</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Calculators Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border-2 border-emerald-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-900">
            Use Our <span className="text-emerald-600">Financial Calculators</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link 
              href="/in/fd-calculator"
              className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow border border-slate-200"
            >
              <p className="font-semibold text-slate-900">FD Calculator</p>
              <p className="text-xs text-slate-600 mt-1">Calculate returns</p>
            </Link>
            <Link 
              href="/in/sip-calculator"
              className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow border border-slate-200"
            >
              <p className="font-semibold text-slate-900">SIP Calculator</p>
              <p className="text-xs text-slate-600 mt-1">Mutual fund SIP</p>
            </Link>
            <Link 
              href="/in/home-loan-calculator"
              className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow border border-slate-200"
            >
              <p className="font-semibold text-slate-900">Home Loan EMI</p>
              <p className="text-xs text-slate-600 mt-1">Calculate EMI</p>
            </Link>
            <Link 
              href="/solar-roi"
              className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow border border-slate-200"
            >
              <p className="font-semibold text-slate-900">Solar ROI</p>
              <p className="text-xs text-slate-600 mt-1">Savings calculator</p>
            </Link>
          </div>
        </div>

        <AdContainer size="leaderboard" className="mt-12" slotId="1475703853" />
      </div>
    </div>
  );
}
