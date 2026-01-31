import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, Landmark, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQSection } from '@/components/ui/FAQSection';
import { RBIDataBadge } from '@/components/ui/DataFreshnessBadge';

export const metadata: Metadata = {
  title: 'PPF vs FD Calculator - Which is Better for Long-term Savings in 2026?',
  description: 'Compare Public Provident Fund (PPF) and Fixed Deposit (FD). Analyze interest rates, tax benefits, liquidity, lock-in, and returns to choose the best savings option.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/compare/ppf-vs-fd',
  },
};

export default function PPFvsFDPage() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "ComparisonTable",
    "name": "PPF vs FD Comparison",
    "description": "Detailed comparison between Public Provident Fund and Fixed Deposit for long-term savings"
  };

  const faqs = [
    {
      question: "Which is better for tax saving - PPF or FD?",
      answer: "PPF is far superior for tax savings. It offers EEE (Exempt-Exempt-Exempt) status: investment up to ₹1.5L deductible under 80C, interest is tax-free, and maturity amount is tax-free. FD interest is fully taxable as per your slab. A person in 30% tax bracket saves ₹45,000 tax on ₹1.5L PPF investment."
    },
    {
      question: "Is PPF interest rate higher than FD?",
      answer: "Currently (Q4 FY 2025-26), PPF offers 7.1% p.a. while FDs offer 6-7.5% p.a. However, PPF interest is tax-free, giving it an effective rate of 10.14% for 30% tax bracket investors. FD interest is taxable, reducing effective returns significantly."
    },
    {
      question: "Can I withdraw PPF money anytime like FD?",
      answer: "No. PPF has 15-year lock-in (partial withdrawals allowed after 7 years). FD allows premature withdrawal anytime with 0.5-1% penalty. If you need liquidity, FD is better. For long-term retirement savings, PPF's lock-in is actually beneficial for discipline."
    },
    {
      question: "Which is safer - PPF or FD?",
      answer: "Both are equally safe. PPF is backed by Government of India (sovereign guarantee). FD is insured by DICGC up to ₹5 lakhs per bank. For amounts >₹5L, PPF is safer as there's no upper limit on government guarantee."
    },
    {
      question: "Should I invest in both PPF and FD?",
      answer: "Yes, recommended! Use PPF for long-term retirement corpus (invest ₹1.5L/year for 80C benefit + tax-free growth). Use FD for emergency fund (3-6 months expenses) and short-term goals (2-5 years). Diversification across both provides tax efficiency + liquidity."
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
              { name: 'PPF vs FD' }
            ]}
            className="mb-6"
          />

          <AdContainer size="leaderboard" className="mb-8" slotId="1475703853" />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              PPF vs FD: <span className="text-emerald-600">Which Should You Choose in 2026?</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A complete comparison of Public Provident Fund (PPF) and Fixed Deposit (FD) covering interest rates, tax benefits, liquidity, safety, and suitability for financial goals.
            </p>
            <div className="flex justify-center mt-4">
              <RBIDataBadge variant="detailed" />
            </div>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-900">
                  <Shield className="w-6 h-6" />
                  Public Provident Fund (PPF)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">Retirement savings, tax planning, long-term wealth</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Interest Rate (Current)</p>
                  <p className="font-semibold text-slate-900">7.1% p.a. (Tax-Free)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Effective Rate (30% tax bracket)</p>
                  <p className="font-semibold text-emerald-600">~10.14% p.a.</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Lock-in Period</p>
                  <p className="font-semibold text-amber-600">15 years (partial withdrawal after 7 years)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Tax Benefit</p>
                  <p className="font-semibold text-green-600">EEE Status (Triple Tax Exemption)</p>
                </div>
                <Link href="/in/ppf-calculator" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                  Calculate PPF Returns <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Landmark className="w-6 h-6" />
                  Fixed Deposit (FD)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">Emergency fund, short-term goals, liquidity needs</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Interest Rate (Current)</p>
                  <p className="font-semibold text-slate-900">6.0% - 7.5% p.a. (Taxable)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Effective Rate (30% tax bracket)</p>
                  <p className="font-semibold text-amber-600">~4.2% - 5.25% p.a.</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Lock-in Period</p>
                  <p className="font-semibold text-green-600">7 days - 10 years (flexible)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Tax Benefit</p>
                  <p className="font-semibold text-slate-600">Only Tax Saver FD (5yr) - Section 80C</p>
                </div>
                <Link href="/in/fd-calculator" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Calculate FD Returns <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Detailed Comparison: PPF vs FD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left p-4 font-bold text-slate-900">Parameter</th>
                      <th className="text-left p-4 font-bold text-emerald-900">PPF</th>
                      <th className="text-left p-4 font-bold text-blue-900">FD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-semibold">Interest Rate</td>
                      <td className="p-4">7.1% p.a. (Govt. reviewed quarterly)</td>
                      <td className="p-4">6-7.5% p.a. (bank-specific)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Tax on Interest</td>
                      <td className="p-4">✅ Tax-Free (EEE)</td>
                      <td className="p-4">❌ Fully Taxable as per slab</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Investment Deduction</td>
                      <td className="p-4">✅ Up to ₹1.5L under 80C</td>
                      <td className="p-4">Only Tax Saver FD (5yr lock-in)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Maturity Tax</td>
                      <td className="p-4">✅ Tax-Free</td>
                      <td className="p-4">❌ Interest component taxed</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Min Investment</td>
                      <td className="p-4">₹500 (₹500 per year min)</td>
                      <td className="p-4">₹1,000 - ₹10,000</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Max Investment (per FY)</td>
                      <td className="p-4">₹1,50,000</td>
                      <td className="p-4">No limit</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Tenure</td>
                      <td className="p-4">15 years (extendable 5yr blocks)</td>
                      <td className="p-4">7 days - 10 years (flexible)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Premature Withdrawal</td>
                      <td className="p-4">Allowed after 7 years (conditions)</td>
                      <td className="p-4">Anytime (0.5-1% penalty)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Loan Against Deposit</td>
                      <td className="p-4">✅ Years 3-6 (max 25% balance)</td>
                      <td className="p-4">✅ Up to 90% of FD value</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Safety</td>
                      <td className="p-4">Govt of India guarantee</td>
                      <td className="p-4">DICGC insured (₹5L per bank)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Inflation Beating</td>
                      <td className="p-4">✅ Tax-free returns beat inflation</td>
                      <td className="p-4">❌ Post-tax barely matches inflation</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Nomination</td>
                      <td className="p-4">✅ Allowed</td>
                      <td className="p-4">✅ Allowed</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">TDS Applicable</td>
                      <td className="p-4">❌ No TDS</td>
                      <td className="p-4">✅ If interest &gt;₹40K (&gt;₹50K seniors)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Best For Goal</td>
                      <td className="p-4">Retirement, children education (long-term)</td>
                      <td className="p-4">Emergency fund, short-term goals</td>
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
                <TrendingUp className="w-6 h-6 text-emerald-500" />
                Decision Framework: PPF or FD?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-bold text-lg mb-2">Choose PPF if:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✓ You're in 20-30% tax bracket (maximize tax-free benefit)</li>
                    <li>✓ Your investment horizon is 10+ years</li>
                    <li>✓ You're building retirement corpus</li>
                    <li>✓ You want guaranteed, tax-free, inflation-beating returns</li>
                    <li>✓ You need Section 80C deduction (up to ₹1.5L)</li>
                    <li>✓ You don't need liquidity for 7 years</li>
                    <li>✓ You're saving for child's higher education (15yr goal)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-lg mb-2">Choose FD if:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✓ You need liquidity (emergency fund)</li>
                    <li>✓ Your goal is short-term (1-5 years)</li>
                    <li>✓ You're in 0% or 5% tax bracket (minimal tax impact)</li>
                    <li>✓ You want to invest &gt;₹1.5L per year</li>
                    <li>✓ You're a senior citizen (higher FD rates 7.5-8%)</li>
                    <li>✓ You need predictable monthly income (interest payout)</li>
                    <li>✓ You prefer flexible tenure options</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-2">Smart Strategy: Use Both!</p>
                    <p className="text-slate-700">
                      <strong>PPF:</strong> Invest ₹1.5L/year for retirement (15-30 years). 
                      <strong> FD:</strong> Park emergency fund (3-6 months expenses) in 1-year rolling FDs. 
                      <strong> This gives you tax efficiency + liquidity + long-term wealth creation.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real Example Calculation */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-indigo-500" />
                Real Example: Invest ₹1,50,000/year for 15 Years
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-lg p-6 border-2 border-emerald-200">
                  <h3 className="font-bold text-xl mb-4 text-emerald-900">PPF (7.1% Tax-Free)</h3>
                  <div className="space-y-3 text-slate-700">
                    <p><span className="font-semibold">Total Investment:</span> ₹22,50,000</p>
                    <p><span className="font-semibold">Interest Earned:</span> ₹18,18,209 (Tax-Free)</p>
                    <p className="text-2xl font-bold text-emerald-900 pt-2 border-t-2 border-emerald-300">Maturity: ₹40,68,209</p>
                    <p><span className="font-semibold">Tax Saved (80C):</span> ₹6,75,000 (lifetime)*</p>
                    <p className="text-lg font-bold text-emerald-700">Effective Gain: ₹24,93,209</p>
                    <p className="text-sm text-slate-600 mt-4">*Assuming 30% tax bracket, ₹1.5L investment/year</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  <h3 className="font-bold text-xl mb-4 text-blue-900">FD (7% Taxable)</h3>
                  <div className="space-y-3 text-slate-700">
                    <p><span className="font-semibold">Total Investment:</span> ₹22,50,000</p>
                    <p><span className="font-semibold">Interest Earned:</span> ₹16,91,223</p>
                    <p><span className="font-semibold">Tax on Interest (30%):</span> -₹5,07,367</p>
                    <p className="text-2xl font-bold text-blue-900 pt-2 border-t-2 border-blue-300">Maturity: ₹34,33,856</p>
                    <p><span className="font-semibold">Tax Saved (80C):</span> ₹0 (Regular FD)</p>
                    <p className="text-lg font-bold text-blue-700">Effective Gain: ₹11,83,856</p>
                    <p className="text-sm text-slate-600 mt-4">*Post-tax returns in 30% bracket</p>
                  </div>
                </div>
              </div>
              <p className="text-center mt-6 text-lg font-semibold text-slate-700">
                PPF creates <span className="text-emerald-600">₹6,34,353 more wealth</span> (₹13,09,353 including 80C tax savings)!
              </p>
            </CardContent>
          </Card>

          {/* PPF Extension Strategy */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>PPF Extension Strategy After 15 Years</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">After 15-year maturity, you have 3 options:</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-bold text-green-900 mb-2">1. Withdraw Fully</h4>
                  <p className="text-sm text-slate-700">Take entire corpus, close account. Best if you need lump sum for retirement income or immediate goal.</p>
                </div>

                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-2">2. Extend Without Contribution</h4>
                  <p className="text-sm text-slate-700">Let corpus grow with interest (7.1% tax-free). Withdraw partial amounts as needed. Unlimited extensions in 5-year blocks.</p>
                </div>

                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <h4 className="font-bold text-emerald-900 mb-2">3. Extend With Contribution</h4>
                  <p className="text-sm text-slate-700">Continue investing up to ₹1.5L/year, earn tax-free interest. No 80C benefit on new contributions. Best for continued growth.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tax Efficiency Visualization */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Tax Efficiency: Why PPF Beats FD for High Earners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">Effective returns after tax for ₹1 lakh investment in 1 year:</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">PPF: 7.1% (All Tax Brackets)</span>
                    <span className="text-emerald-600 font-bold">₹7,100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-emerald-600 h-4 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">FD: 7% (5% Tax Bracket)</span>
                    <span className="text-blue-600 font-bold">₹6,650</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-600 h-4 rounded-full" style={{width: '93.7%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">FD: 7% (20% Tax Bracket)</span>
                    <span className="text-amber-600 font-bold">₹5,600</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-amber-600 h-4 rounded-full" style={{width: '78.9%'}}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">FD: 7% (30% Tax Bracket)</span>
                    <span className="text-red-600 font-bold">₹4,900</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-red-600 h-4 rounded-full" style={{width: '69%'}}></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-4 italic">
                Higher your tax bracket, greater the PPF advantage. In 30% bracket, PPF effectively gives 45% more returns than FD!
              </p>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-emerald-900">Calculate Your PPF Maturity</h3>
                <p className="text-slate-700 mb-6">
                  See exactly how much your PPF account will grow with annual contributions and tax-free compound interest.
                </p>
                <Link 
                  href="/in/ppf-calculator"
                  className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Use PPF Calculator <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Compare FD Returns</h3>
                <p className="text-slate-700 mb-6">
                  Calculate FD maturity amounts with various tenures, interest rates, and compounding frequencies.
                </p>
                <Link 
                  href="/in/fd-calculator"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Use FD Calculator <ArrowRight className="ml-2 w-5 h-5" />
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
