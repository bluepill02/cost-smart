import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Shield, Zap, AlertCircle } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQSection } from '@/components/ui/FAQSection';

export const metadata: Metadata = {
  title: 'FD vs Mutual Fund Calculator - Which Investment is Better in 2026?',
  description: 'Compare Fixed Deposit and Mutual Fund returns. Analyze risk, liquidity, tax implications, and returns to make the right investment choice for your goals.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/compare/fd-vs-mutual-fund',
  },
};

export default function FDvsMutualFundPage() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "ComparisonTable",
    "name": "FD vs Mutual Fund Comparison",
    "description": "Detailed comparison between Fixed Deposits and Mutual Funds"
  };

  const faqs = [
    {
      question: "Which is safer - FD or Mutual Fund?",
      answer: "Fixed Deposits are safer with guaranteed returns and DICGC insurance up to ₹5 lakhs. Mutual Funds carry market risk but offer higher return potential. FDs are ideal for capital preservation, while mutual funds suit wealth creation goals."
    },
    {
      question: "Can I lose money in FD vs Mutual Fund?",
      answer: "You cannot lose your principal in FD (guaranteed by bank). In Mutual Funds, you can lose money if markets decline, especially in short term. However, equity funds historically deliver 12-15% over 10+ years despite volatility."
    },
    {
      question: "Which gives better returns - FD or Mutual Fund?",
      answer: "FDs currently offer 6-7.5% fixed returns. Equity mutual funds average 12-15% over long term, debt funds offer 7-9%. Mutual funds generally outperform FDs over 5+ years but come with market risk."
    },
    {
      question: "How are FD and Mutual Fund taxed differently?",
      answer: "FD interest is fully taxable as per your income slab. Mutual funds: Equity funds have 12.5% LTCG tax (gains > ₹1.25L), debt funds taxed as per slab. Long-term equity mutual funds are more tax-efficient than FDs."
    },
    {
      question: "Can I withdraw FD and Mutual Fund anytime?",
      answer: "FDs allow premature withdrawal with penalty (1-2% interest reduction). Mutual funds (open-ended) allow withdrawal anytime, but equity funds may have exit loads if redeemed within 1 year. Both offer decent liquidity."
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Breadcrumbs 
            items={[
              { name: 'Comparisons', url: '/compare' },
              { name: 'FD vs Mutual Fund' }
            ]}
            className="mb-6"
          />

          <AdContainer size="leaderboard" className="mb-8" slotId="1475703853" />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              FD vs Mutual Fund: <span className="text-emerald-600">Which Should You Choose?</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A comprehensive comparison of Fixed Deposits and Mutual Funds covering returns, risk, taxation, liquidity, and suitability for different investor profiles.
            </p>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Shield className="w-6 h-6" />
                  Fixed Deposit (FD)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">Conservative investors, short-term goals, capital preservation</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Expected Returns</p>
                  <p className="font-semibold text-slate-900">6.0% - 7.5% per year (guaranteed)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Risk Level</p>
                  <p className="font-semibold text-green-600">Very Low (Principal protected)</p>
                </div>
                <Link href="/in/fd-calculator" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Calculate FD Returns <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 bg-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-900">
                  <TrendingUp className="w-6 h-6" />
                  Mutual Fund
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">Growth-oriented investors, long-term goals, wealth creation</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Expected Returns</p>
                  <p className="font-semibold text-slate-900">10% - 15% per year (equity, not guaranteed)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Risk Level</p>
                  <p className="font-semibold text-amber-600">Medium to High (Market-linked)</p>
                </div>
                <Link href="/in/sip-calculator" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                  Calculate SIP Returns <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Detailed Comparison: FD vs Mutual Fund</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left p-4 font-bold text-slate-900">Parameter</th>
                      <th className="text-left p-4 font-bold text-blue-900">Fixed Deposit</th>
                      <th className="text-left p-4 font-bold text-emerald-900">Mutual Fund</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-semibold">Returns</td>
                      <td className="p-4">6-7.5% fixed (guaranteed)</td>
                      <td className="p-4">10-15% avg (equity, variable)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Risk</td>
                      <td className="p-4">Very Low (principal safe)</td>
                      <td className="p-4">Medium-High (market risk)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Liquidity</td>
                      <td className="p-4">Premature withdrawal with penalty</td>
                      <td className="p-4">Redeem anytime (may have exit load)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Minimum Investment</td>
                      <td className="p-4">₹1,000 - ₹10,000</td>
                      <td className="p-4">₹100 - ₹500 (SIP)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Tenure</td>
                      <td className="p-4">7 days - 10 years (fixed lock-in)</td>
                      <td className="p-4">Flexible (open-ended funds)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Taxation</td>
                      <td className="p-4">Interest taxed as per slab</td>
                      <td className="p-4">12.5% LTCG on equity (&gt;₹1.25L)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Inflation Beating</td>
                      <td className="p-4">❌ Barely matches inflation (~6%)</td>
                      <td className="p-4">✅ Historically beats inflation</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Compounding</td>
                      <td className="p-4">Simple/cumulative options</td>
                      <td className="p-4">Automatic compounding</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Insurance</td>
                      <td className="p-4">✅ DICGC insured up to ₹5L</td>
                      <td className="p-4">❌ No insurance, SEBI regulated</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Ideal Time Horizon</td>
                      <td className="p-4">1-5 years</td>
                      <td className="p-4">5+ years (equity), 3+ (debt)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Decision Framework */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-500" />
                Decision Framework: Which Should You Choose?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-lg mb-2">Choose FD if:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✓ You need guaranteed returns with zero risk</li>
                    <li>✓ Your investment horizon is 1-3 years</li>
                    <li>✓ You're saving for a specific short-term goal</li>
                    <li>✓ You're close to retirement (50+ years)</li>
                    <li>✓ You cannot afford any capital loss</li>
                    <li>✓ You want simple, predictable returns</li>
                  </ul>
                </div>

                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-bold text-lg mb-2">Choose Mutual Fund if:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✓ Your goal is 5+ years away</li>
                    <li>✓ You want to beat inflation significantly</li>
                    <li>✓ You can tolerate short-term volatility</li>
                    <li>✓ You're building retirement corpus (20-40 years)</li>
                    <li>✓ You want tax-efficient returns</li>
                    <li>✓ You understand equity market cycles</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-2">Best Strategy: Diversify!</p>
                    <p className="text-slate-700">
                      Don't choose one vs the other. Allocate based on goals:
                      <strong> Emergency Fund → FD</strong> (3-6 months expenses),
                      <strong> Retirement → Equity MF</strong> (long-term), 
                      <strong> House Down Payment (3 years) → Debt MF or FD</strong>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real Example Calculation */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Real Example: ₹10,000/month for 10 Years</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4 text-blue-900">FD Route (7% p.a.)</h3>
                  <div className="space-y-3 text-slate-700">
                    <p><span className="font-semibold">Total Investment:</span> ₹12,00,000</p>
                    <p><span className="font-semibold">Interest Earned:</span> ₹5,52,000</p>
                    <p className="text-2xl font-bold text-blue-900 pt-2">Final Value: ₹17,52,000</p>
                    <p className="text-sm text-slate-600 mt-4">Safe, predictable, but barely beats inflation</p>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-4 text-emerald-900">Mutual Fund SIP (12% p.a.)</h3>
                  <div className="space-y-3 text-slate-700">
                    <p><span className="font-semibold">Total Investment:</span> ₹12,00,000</p>
                    <p><span className="font-semibold">Capital Gains:</span> ₹11,26,000</p>
                    <p className="text-2xl font-bold text-emerald-900 pt-2">Final Value: ₹23,26,000</p>
                    <p className="text-sm text-slate-600 mt-4">Higher returns, wealth creation, market-linked</p>
                  </div>
                </div>
              </div>
              <p className="text-center mt-6 text-lg font-semibold text-slate-700">
                Difference: <span className="text-emerald-600">₹5,74,000 more with Mutual Funds!</span>
              </p>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Ready to Invest in FD?</h3>
                <p className="text-slate-700 mb-6">
                  Calculate exactly how much your FD will grow with compound interest over different tenures.
                </p>
                <Link 
                  href="/in/fd-calculator"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Use FD Calculator <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-emerald-900">Start SIP in Mutual Funds?</h3>
                <p className="text-slate-700 mb-6">
                  See how small monthly SIPs can create massive wealth through the power of compounding.
                </p>
                <Link 
                  href="/in/sip-calculator"
                  className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Use SIP Calculator <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <FAQSection faqs={faqs} className="mb-12" />

          <AdContainer size="leaderboard" className="mb-8" slotId="1475703853" />
        </div>
      </div>
    </>
  );
}
