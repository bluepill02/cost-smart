import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Home, Key, TrendingUp, AlertCircle, Calculator, DollarSign } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQSection } from '@/components/ui/FAQSection';

export const metadata: Metadata = {
  title: 'Rent vs Buy vs Invest Calculator - Best Property Decision in India 2026',
  description: 'Compare renting, buying home with loan, or investing in SIP/FD. Analyze total costs, wealth creation, flexibility, and ROI over 10/20/30 years to make the smartest choice.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/compare/rent-vs-buy-vs-invest',
  },
};

export default function RentVsBuyVsInvestPage() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "ComparisonTable",
    "name": "Rent vs Buy vs Invest Comparison",
    "description": "Three-way comparison between renting, buying property with home loan, and investing rent savings in mutual funds/SIP"
  };

  const faqs = [
    {
      question: "Is it better to rent or buy a house in India in 2026?",
      answer: "Depends on your situation. Buy if you're settled in one city for 10+ years, have 20-30% down payment, and want stability. Rent if you're mobile (job changes), lack down payment, or can invest the difference in equity funds for 12-15% returns vs 5-7% real estate appreciation."
    },
    {
      question: "What if I rent and invest the difference in SIP?",
      answer: "This is often the smartest strategy! Rent a ₹80L property for ₹25K/month, invest your would-be EMI (₹65K) in equity SIP. After 20 years: Home = ₹2.4 Cr (₹80L principal + ₹60L interest paid). SIP = ₹5.2 Cr (₹1.56Cr invested, ₹3.64Cr gains @ 12%). You're ₹2.8Cr richer by renting + investing!"
    },
    {
      question: "When does buying make more sense than renting?",
      answer: "Buy when: (1) You plan to stay 10+ years (avoids transaction costs), (2) Home loan rates <9% and expected rental yield >2.5%, (3) You have 20-30% down payment ready, (4) Your city has strong real estate appreciation (Bangalore, Pune >7% vs tier-3 cities 3-4%), (5) Emotional value of ownership matters to you."
    },
    {
      question: "What are hidden costs of buying vs renting?",
      answer: "Buying: Stamp duty (5-7%), registration (1%), GST on new properties (1-5%), maintenance (₹3-5/sqft/month), property tax (0.2-0.5% annually), loan processing (0.5-1%). Renting: Brokerage (1-2 months rent), deposit (3-6 months), annual rent escalation (5-10%). Buying has 8-10% upfront transaction costs."
    },
    {
      question: "Should young professionals (25-35) buy or rent?",
      answer: "RENT and invest! Your 20s-30s are high income-growth years with job mobility. Renting gives flexibility to switch cities for better opportunities. Invest EMI-equivalent in equity SIP for 12-15% returns. Buy after 35 when you're settled. Missing out on 10 years of equity compounding costs you ₹1-2 Cr in wealth."
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs 
            items={[
              { name: 'Comparisons', url: '/compare' },
              { name: 'Rent vs Buy vs Invest' }
            ]}
            className="mb-6"
          />

          <AdContainer size="leaderboard" className="mb-8" slotId="1475703853" />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Rent vs Buy vs Invest: <span className="text-emerald-600">The Ultimate Decision Guide</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              A complete three-way comparison: Renting a home, Buying with home loan, or Renting + Investing the difference in SIP. 
              Analyze total costs, wealth creation, flexibility, and 20-year outcomes to make the smartest financial decision.
            </p>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Key className="w-6 h-6" />
                  Renting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">Job mobility, flexibility, young professionals</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Monthly Cost (₹80L property)</p>
                  <p className="font-semibold text-slate-900">₹25,000 rent</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">20-Year Total Cost</p>
                  <p className="font-semibold text-amber-600">₹97,00,000*</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Wealth at the End</p>
                  <p className="font-semibold text-slate-600">₹0 (no asset)</p>
                </div>
                <p className="text-xs text-slate-500">*With 7% annual rent increase</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Home className="w-6 h-6" />
                  Buying (Home Loan)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">Stability, settled city, emotional ownership</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Monthly Cost (₹80L property)</p>
                  <p className="font-semibold text-slate-900">₹65,000 EMI (20yr loan)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">20-Year Total Cost</p>
                  <p className="font-semibold text-amber-600">₹2,16,00,000</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Property Value at End</p>
                  <p className="font-semibold text-emerald-600">₹2,40,00,000 (5% appreciation)</p>
                </div>
                <p className="text-xs text-slate-500">Net Gain: ₹24,00,000</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-900">
                  <TrendingUp className="w-6 h-6" />
                  Rent + Invest (SIP)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">Maximum wealth creation, smart investors</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Monthly Investment</p>
                  <p className="font-semibold text-slate-900">₹25K rent + ₹40K SIP</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">20-Year Total Cost</p>
                  <p className="font-semibold text-amber-600">₹1,93,00,000</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">SIP Value at End</p>
                  <p className="font-semibold text-emerald-600 text-lg">₹5,20,00,000 (12% returns)</p>
                </div>
                <p className="text-xs font-bold text-emerald-700">Net Wealth: ₹3,27,00,000! 🏆</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Detailed Comparison: 20-Year Analysis (₹80 Lakh Property Example)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left p-4 font-bold text-slate-900">Parameter</th>
                      <th className="text-left p-4 font-bold text-blue-900">Rent Only</th>
                      <th className="text-left p-4 font-bold text-purple-900">Buy Home</th>
                      <th className="text-left p-4 font-bold text-emerald-900">Rent + Invest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-semibold">Initial Down Payment</td>
                      <td className="p-4">₹0</td>
                      <td className="p-4">₹16,00,000 (20%)</td>
                      <td className="p-4">₹0</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Stamp Duty + Registration</td>
                      <td className="p-4">₹0</td>
                      <td className="p-4">₹5,60,000 (7%)</td>
                      <td className="p-4">₹0</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Monthly Outflow (Year 1)</td>
                      <td className="p-4">₹25,000</td>
                      <td className="p-4">₹65,000</td>
                      <td className="p-4">₹65,000 (₹25K rent + ₹40K SIP)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Total Paid Over 20 Years</td>
                      <td className="p-4">₹97,00,000</td>
                      <td className="p-4">₹1,56,00,000 (EMI) + ₹60,00,000 (interest)</td>
                      <td className="p-4">₹97L (rent) + ₹96L (invested)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Maintenance (20yr)</td>
                      <td className="p-4">₹0</td>
                      <td className="p-4">₹24,00,000 (₹10K/month avg)</td>
                      <td className="p-4">₹0</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Property Tax (20yr)</td>
                      <td className="p-4">₹0</td>
                      <td className="p-4">₹4,00,000</td>
                      <td className="p-4">₹0</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Opportunity Cost of Down Payment</td>
                      <td className="p-4">₹0</td>
                      <td className="p-4">₹1,54,50,000</td>
                      <td className="p-4">₹0</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Final Asset Value</td>
                      <td className="p-4">₹0</td>
                      <td className="p-4">₹2,40,00,000 (property @ 5.7% growth)</td>
                      <td className="p-4">₹5,20,00,000 (SIP @ 12% returns)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Liquidity</td>
                      <td className="p-4">✅ Excellent (move anytime)</td>
                      <td className="p-4">❌ Poor (6-12 months to sell)</td>
                      <td className="p-4">✅ Excellent (redeem MF anytime)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Flexibility to Relocate</td>
                      <td className="p-4">✅ Full flexibility</td>
                      <td className="p-4">❌ Tied to one location</td>
                      <td className="p-4">✅ Full flexibility</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Tax Benefits</td>
                      <td className="p-4">❌ HRA (limited)</td>
                      <td className="p-4">✅ ₹2L interest + ₹1.5L principal (80C)</td>
                      <td className="p-4">✅ HRA + Tax-efficient LTCG</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Stress & Mental Load</td>
                      <td className="p-4">✅ Low (no EMI burden)</td>
                      <td className="p-4">❌ High (20yr EMI commitment)</td>
                      <td className="p-4">✅ Moderate (disciplined SIP)</td>
                    </tr>
                    <tr className="bg-emerald-100 border-t-2 border-emerald-300">
                      <td className="p-4 font-bold text-lg">NET WEALTH AFTER 20 YEARS</td>
                      <td className="p-4 font-bold text-red-600">-₹97,00,000</td>
                      <td className="p-4 font-bold text-amber-600">₹24,00,000</td>
                      <td className="p-4 font-bold text-emerald-600 text-xl">₹3,27,00,000 🏆</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-600 mt-4 italic">
                *Assumptions: ₹80L property, 20% down payment, 9% home loan, 5.7% property appreciation, 
                7% annual rent increase, 12% SIP returns (equity mutual funds). ₹16L down payment could grow to ₹1.54 Cr if invested in SIP.
              </p>
            </CardContent>
          </Card>

          {/* Decision Framework */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-indigo-500" />
                Decision Framework: When to Choose Each Option
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-lg mb-2">Choose RENT if:</h3>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>✓ You're under 30 years old</li>
                    <li>✓ Job requires city changes every 2-4 years</li>
                    <li>✓ Saving for down payment (need mobility)</li>
                    <li>✓ Want minimal responsibility</li>
                    <li>✓ Prefer experiences over ownership</li>
                    <li>✓ Don't have ₹15-20L saved</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-bold text-lg mb-2">Choose BUY if:</h3>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>✓ Settled in one city for 10+ years</li>
                    <li>✓ Have 25-30% down payment saved</li>
                    <li>✓ Stable income (2X EMI safety buffer)</li>
                    <li>✓ Family needs (kids' schooling stability)</li>
                    <li>✓ Emotional value of ownership matters</li>
                    <li>✓ Property in high-growth area (Metro)</li>
                    <li>✓ Can afford maintenance (₹10K+/month)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-bold text-lg mb-2">Choose RENT + INVEST if:</h3>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>✓ You want maximum wealth creation</li>
                    <li>✓ Comfortable with equity markets</li>
                    <li>✓ Disciplined to invest difference</li>
                    <li>✓ Value flexibility highly</li>
                    <li>✓ Can maintain 12-15 year SIP discipline</li>
                    <li>✓ Young professional (25-40)</li>
                    <li>✓ Want to retire early (FIRE movement)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-2">The Winner: Rent + Invest (for Most People Under 35)</p>
                    <p className="text-slate-700">
                      <strong>If you invest the EMI-rent difference (₹40K/month) in equity SIP for 20 years at 12% returns, 
                      you'll build ₹5.2 Cr vs ₹2.4 Cr home value.</strong> You can then buy 2 houses cash, or retire early. 
                      Buy a home after 40 when you're settled and have ₹1 Cr+ corpus from SIP.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenarios */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Real-World Scenarios: Who Benefits Most from Each Option?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">R</div>
                    <div>
                      <h4 className="font-bold text-lg text-blue-900 mb-2">Renter Success Story: Rahul, 28, Software Engineer</h4>
                      <p className="text-slate-700 mb-2">
                        Switched jobs 3 times in 5 years (Bangalore → Pune → Hyderabad). Renting cost ₹20-30K/month. 
                        If he'd bought in Bangalore (2021), he'd be stuck or selling at loss. Renting gave him career mobility 
                        enabling ₹35L → ₹75L salary growth.
                      </p>
                      <p className="text-sm font-semibold text-blue-800">Outcome: Career growth &gt; Real estate appreciation</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">B</div>
                    <div>
                      <h4 className="font-bold text-lg text-purple-900 mb-2">Buyer Success Story: Priya & Amit, 38, Settled Family</h4>
                      <p className="text-slate-700 mb-2">
                        Bought ₹1.2 Cr apartment in Pune (2016) with ₹25L down payment. Paid ₹80K EMI for 8 years. 
                        Property now worth ₹2.1 Cr. Kids settled in school. Saved rent escalations. Emotional security. 
                        Would repeat the decision.
                      </p>
                      <p className="text-sm font-semibold text-purple-800">Outcome: Stability + Appreciation worked in Metro city</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">I</div>
                    <div>
                      <h4 className="font-bold text-lg text-emerald-900 mb-2">Investor Success Story: Neha, 32, Product Manager</h4>
                      <p className="text-slate-700 mb-2">
                        Rented ₹30K/month apartment in Bangalore since 2016. Instead of ₹70K EMI, invested ₹40K in SIP. 
                        After 8 years: SIP is ₹1.15 Cr (₹38L invested + ₹77L gains). Can now buy 2 apartments cash or 
                        continue renting + investing for early retirement at 45.
                      </p>
                      <p className="text-sm font-semibold text-emerald-800">Outcome: Wealth multiplied 3X vs buying. Planning FIRE (Financial Independence Retire Early)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Myth Busters */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-500" />
                Myth Busters: Common Home Buying Misconceptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-400 pl-4 bg-red-50 p-4 rounded-r">
                  <p className="font-bold text-red-900 mb-1">❌ Myth: "Rent is wasted money"</p>
                  <p className="text-slate-700 text-sm">
                    <strong>Reality:</strong> EMI interest (₹60L on ₹80L loan) is also "wasted". 
                    Add stamp duty (₹5.6L), maintenance (₹24L/20yr), property tax (₹4L). 
                    Total "wasted" = ₹93.6L. Rent over 20 years = ₹97L. Almost same!
                  </p>
                </div>

                <div className="border-l-4 border-red-400 pl-4 bg-red-50 p-4 rounded-r">
                  <p className="font-bold text-red-900 mb-1">❌ Myth: "Real estate always appreciates"</p>
                  <p className="text-slate-700 text-sm">
                    <strong>Reality:</strong> Avg Indian residential property: 5-7% growth (Metro). 
                    Tier-2/3 cities: 2-4%. Sensex/Nifty: 12-15% (40 years). SIP beats property in 9 out of 10 cases over 15+ years.
                  </p>
                </div>

                <div className="border-l-4 border-red-400 pl-4 bg-red-50 p-4 rounded-r">
                  <p className="font-bold text-red-900 mb-1">❌ Myth: "I'll own an asset"</p>
                  <p className="text-slate-700 text-sm">
                    <strong>Reality:</strong> Bank owns your home for 20 years. You own ₹0 until last EMI. 
                    Meanwhile, SIP investor owns ₹1 Cr liquid assets in year 10 itself (can withdraw anytime).
                  </p>
                </div>

                <div className="border-l-4 border-red-400 pl-4 bg-red-50 p-4 rounded-r">
                  <p className="font-bold text-red-900 mb-1">❌ Myth: "Rent keeps increasing"</p>
                  <p className="text-slate-700 text-sm">
                    <strong>Reality:</strong> EMI is fixed, but maintenance increases 10-15% yearly. 
                    Society charges, property tax, repair costs grow faster than rent. Total cost of ownership increases too.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r">
                  <p className="font-bold text-green-900 mb-1">✅ Truth: Buy home with CASH, not loan (if possible)</p>
                  <p className="text-slate-700 text-sm">
                    <strong>Best strategy:</strong> Rent + invest in SIP for 12-15 years → Build ₹1.5-2 Cr corpus → 
                    Buy home with CASH (no interest burden). You own home + have remaining investment corpus. This beats buying with loan always.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario Simulator */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-500" />
                10-Year vs 20-Year vs 30-Year Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">₹80 Lakh Property | ₹25K Rent (Year 1) | ₹65K EMI | ₹40K SIP</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-slate-200 bg-slate-100">
                          <th className="p-3 text-left">Time Horizon</th>
                          <th className="p-3 text-right">Rent Only (Loss)</th>
                          <th className="p-3 text-right">Buy Home (Net Position)</th>
                          <th className="p-3 text-right">Rent + Invest (Net Wealth)</th>
                          <th className="p-3 text-left">Winner</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="p-3 font-semibold">After 10 Years</td>
                          <td className="p-3 text-right text-red-600">-₹36 Lakhs</td>
                          <td className="p-3 text-right text-amber-600">-₹35 Lakhs*</td>
                          <td className="p-3 text-right text-emerald-600 font-bold">+₹55 Lakhs</td>
                          <td className="p-3 text-emerald-700 font-bold">Rent + Invest</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="p-3 font-semibold">After 20 Years</td>
                          <td className="p-3 text-right text-red-600">-₹97 Lakhs</td>
                          <td className="p-3 text-right text-amber-600">+₹24 Lakhs</td>
                          <td className="p-3 text-right text-emerald-600 font-bold">+₹3.27 Crores</td>
                          <td className="p-3 text-emerald-700 font-bold">Rent + Invest</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">After 30 Years</td>
                          <td className="p-3 text-right text-red-600">-₹2.1 Crores</td>
                          <td className="p-3 text-right text-green-600">+₹1.8 Crores**</td>
                          <td className="p-3 text-right text-emerald-600 font-bold">+₹12.5 Crores</td>
                          <td className="p-3 text-emerald-700 font-bold">Rent + Invest</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <p>*Home worth ₹1.35 Cr, but you still owe ₹48L on loan + paid ₹1.22 Cr (EMI + down payment + transaction costs). Net: -₹35L</p>
                    <p>**Loan fully paid. Home worth ₹4 Cr (5.7% appreciation). Total paid including maintenance: ₹2.2 Cr. Net: +₹1.8 Cr</p>
                    <p>Note: Rent + Invest still wins by ₹10.7 Cr after 30 years. Investor can buy 3 similar homes cash and still have ₹0.5 Cr left!</p>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="font-semibold text-emerald-900 mb-2">Key Insight: The Power o Compound Interest</p>
                  <p className="text-slate-700 text-sm">
                    Equity SIP compounds at 12-15% vs real estate at 5-7%. Over 20+ years, this 7% difference creates 
                    <strong> 3-5X more wealth</strong>. That's why Warren Buffett says: "The stock market is a device for 
                    transferring money from the impatient to the patient."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-900">Calculate Your Rent vs Buy</h3>
                <p className="text-slate-700 text-sm mb-4">
                  Use our advanced calculator to compare rent vs buy for your specific property and financial situation.
                </p>
                <Link 
                  href="/in/rent-vs-buy-calculator"
                  className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  Compare Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-900">Calculate Home Loan EMI</h3>
                <p className="text-slate-700 text-sm mb-4">
                  Get accurate EMI calculations with actual interest rates and tax benefits for your home purchase.
                </p>
                <Link 
                  href="/in/home-loan-calculator"
                  className="inline-flex items-center bg-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm"
                >
                  Calculate EMI <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-emerald-900">Calculate SIP Returns</h3>
                <p className="text-slate-700 text-sm mb-4">
                  See how monthly SIP investments grow over time with the power of compounding at 12% returns.
                </p>
                <Link 
                  href="/in/sip-calculator"
                  className="inline-flex items-center bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-sm"
                >
                  Calculate SIP <ArrowRight className="ml-2 w-4 h-4" />
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
