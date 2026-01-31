import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sun, Wind, MapPin, AlertCircle, TrendingUp } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQSection } from '@/components/ui/FAQSection';

export const metadata: Metadata = {
  title: 'Solar vs Wind Energy ROI Calculator - Which is Better for India in 2026?',
  description: 'Compare Solar and Wind energy for home/business. Analyze installation costs, ROI, payback period, efficiency, maintenance, and suitability for Indian climate.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/compare/solar-vs-wind',
  },
};

export default function SolarVsWindPage() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "ComparisonTable",
    "name": "Solar Energy vs Wind Energy Comparison",
    "description": "Detailed comparison between Solar and Wind power systems for residential and commercial use in India"
  };

  const faqs = [
    {
      question: "Which is cheaper - Solar or Wind energy for homes?",
      answer: "Solar is significantly cheaper for residential use. A 3kW solar system costs ₹1.5-2 lakhs, while small wind turbines (1kW) cost ₹2-3 lakhs. Solar has better economies of scale and mature technology, making it 30-40% cheaper per kW for home installations."
    },
    {
      question: "Does wind energy work better than solar in India?",
      answer: "Solar is better for most Indian locations. India receives 300+ sunny days annually with 5-7 kWh/m²/day solar radiation. Wind is viable only in specific high-wind zones (Tamil Nadu, Gujarat, Rajasthan coasts). Solar works consistently across all states."
    },
    {
      question: "What is the payback period for Solar vs Wind?",
      answer: "Solar payback: 4-6 years for residential, 3-5 years for commercial. Wind payback: 6-10 years (highly location-dependent). Solar ROI is faster and more predictable due to government subsidies (₹18,000/kW), net metering, and lower maintenance."
    },
    {
      question: "Can I install wind turbine on my rooftop like solar?",
      answer: "Not recommended. Rooftop wind turbines (vertical axis) are inefficient due to turbulent wind, building vibration, and noise concerns. Solar panels work perfectly on rooftops. Wind turbines need open ground with minimum 10-15 mph sustained wind speeds."
    },
    {
      question: "Which requires less maintenance - Solar or Wind?",
      answer: "Solar requires minimal maintenance (panel cleaning 2-4 times/year, inverter replacement after 10 years). Wind turbines have mechanical parts requiring regular servicing, lubrication, and part replacements every 2-3 years. Solar is significantly lower maintenance."
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
              { name: 'Solar vs Wind' }
            ]}
            className="mb-6"
          />

          <AdContainer size="leaderboard" className="mb-8" slotId="1475703853" />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Solar vs Wind Energy: <span className="text-amber-600">Which is Right for You?</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A complete comparison of Solar and Wind power systems covering costs, ROI, installation, efficiency, maintenance, and viability for Indian homes and businesses.
            </p>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <Sun className="w-6 h-6" />
                  Solar Energy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">Homes, offices, rooftops, all Indian locations</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Installation Cost (3kW)</p>
                  <p className="font-semibold text-slate-900">₹1,50,000 - ₹2,00,000 (post-subsidy)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Payback Period</p>
                  <p className="font-semibold text-green-600">4-6 years</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Suitability</p>
                  <p className="font-semibold text-slate-900">✅ Works everywhere in India</p>
                </div>
                <Link href="/solar-roi" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
                  Calculate Solar ROI <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sky-900">
                  <Wind className="w-6 h-6" />
                  Wind Energy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">Open land, high-wind zones, large-scale projects</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Installation Cost (1kW)</p>
                  <p className="font-semibold text-slate-900">₹2,00,000 - ₹3,00,000 (no major subsidy)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Payback Period</p>
                  <p className="font-semibold text-amber-600">6-10 years</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Suitability</p>
                  <p className="font-semibold text-slate-900">⚠️ Only coastal/hilly areas</p>
                </div>
                <Link href="/compare/solar-vs-wind#wind-zones" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium">
                  Check Wind Zones <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Detailed Comparison: Solar vs Wind Energy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left p-4 font-bold text-slate-900">Parameter</th>
                      <th className="text-left p-4 font-bold text-amber-900">Solar Energy</th>
                      <th className="text-left p-4 font-bold text-sky-900">Wind Energy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-semibold">Cost per kW</td>
                      <td className="p-4">₹50,000 - ₹65,000</td>
                      <td className="p-4">₹2,00,000 - ₹3,00,000</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Government Subsidy</td>
                      <td className="p-4">✅ ₹18,000/kW (up to 3kW)</td>
                      <td className="p-4">❌ Limited/None for small scale</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Space Requirement</td>
                      <td className="p-4">100 sq ft per kW (rooftop)</td>
                      <td className="p-4">500+ sq ft ground clearance</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Installation Time</td>
                      <td className="p-4">1-3 days</td>
                      <td className="p-4">7-15 days (permits, foundation)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Efficiency</td>
                      <td className="p-4">18-22% (modern panels)</td>
                      <td className="p-4">30-45% (in optimal wind)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Energy Generation</td>
                      <td className="p-4">4-5 units/kW/day (avg)</td>
                      <td className="p-4">2-8 units/kW/day (variable)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Lifespan</td>
                      <td className="p-4">25+ years (panels), 10 years (inverter)</td>
                      <td className="p-4">20-25 years (with maintenance)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Maintenance Cost</td>
                      <td className="p-4">₹2,000-5,000/year (cleaning)</td>
                      <td className="p-4">₹15,000-30,000/year (mechanical)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Noise</td>
                      <td className="p-4">Silent operation</td>
                      <td className="p-4">40-50 dB (noticeable hum)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Location Dependency</td>
                      <td className="p-4">Low (works 90% of India)</td>
                      <td className="p-4">Very High (15-20% suitable zones)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Regulatory Approvals</td>
                      <td className="p-4">Minimal (net metering, DISCOM)</td>
                      <td className="p-4">Extensive (height, safety, aviation)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Residential Viability</td>
                      <td className="p-4">✅ Excellent</td>
                      <td className="p-4">❌ Poor (except farms)</td>
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
                <MapPin className="w-6 h-6 text-emerald-500" />
                Decision Framework: Solar or Wind?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="font-bold text-lg mb-2">Choose Solar If:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✓ You have a rooftop or terrace</li>
                    <li>✓ You're in any Indian city/town</li>
                    <li>✓ You want residential/small business solution</li>
                    <li>✓ You need quick installation (1-3 days)</li>
                    <li>✓ You want government subsidy benefits</li>
                    <li>✓ You prefer low-maintenance systems</li>
                    <li>✓ You have ₹1.5-6 lakhs budget (1-10kW)</li>
                  </ul>
                </div>

                <div className="border-l-4 border-sky-500 pl-4">
                  <h3 className="font-bold text-lg mb-2">Choose Wind If:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>✓ You're in high-wind coastal/hilly area</li>
                    <li>✓ You have open land (1+ acre)</li>
                    <li>✓ You're setting up large industrial project</li>
                    <li>✓ Wind speed consistently &gt;6 m/s (13 mph)</li>
                    <li>✓ You can afford ₹20+ lakhs investment</li>
                    <li>✓ You have budget for ongoing maintenance</li>
                    <li>✓ You can handle regulatory complexity</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-2">For 95% of Indian Homes & Businesses: Solar Wins</p>
                    <p className="text-slate-700">
                      Unless you're in specific wind zones (Tamil Nadu, Gujarat coastal, Rajasthan), 
                      <strong> solar offers better ROI, faster payback, lower maintenance, and simpler installation</strong>. 
                      Wind is suitable for utility-scale projects in high-wind regions only.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wind Zones in India */}
          <Card className="mb-12" id="wind-zones">
            <CardHeader>
              <CardTitle>Wind-Suitable Zones in India</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-bold text-green-900 mb-2">Excellent Wind Zones</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Tamil Nadu (Coimbatore, Tirunelveli)</li>
                      <li>• Gujarat Coast (Kutch, Jamnagar)</li>
                      <li>• Rajasthan (Jaisalmer, Barmer)</li>
                      <li>• Karnataka (Chitradurga, Gadag)</li>
                    </ul>
                    <p className="text-xs text-green-700 mt-2">Wind Speed: 7-9 m/s avg</p>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h4 className="font-bold text-amber-900 mb-2">Moderate Wind Zones</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Maharashtra (Satara, Sangli)</li>
                      <li>• Madhya Pradesh (Dewas, Ratlam)</li>
                      <li>• Andhra Pradesh (Anantapur)</li>
                      <li>• Kerala Coast</li>
                    </ul>
                    <p className="text-xs text-amber-700 mt-2">Wind Speed: 5-7 m/s avg</p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-bold text-red-900 mb-2">Poor Wind Zones</h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Most North Indian plains</li>
                      <li>• Delhi NCR region</li>
                      <li>• Urban centers</li>
                      <li>• Inland locations</li>
                    </ul>
                    <p className="text-xs text-red-700 mt-2">Wind Speed: &lt;4 m/s (not viable)</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">
                  Note: Even in excellent zones, wind is typically viable only for 50kW+ commercial/utility projects. 
                  For homes, solar remains the better choice.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Real Example Calculation */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
                Real Example: 3kW System for 20 Years
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-amber-50 rounded-lg p-6 border-2 border-amber-200">
                  <h3 className="font-bold text-xl mb-4 text-amber-900">☀️ Solar (3kW Rooftop)</h3>
                  <div className="space-y-3 text-slate-700">
                    <p><span className="font-semibold">Installation Cost:</span> ₹1,65,000 (post-₹54K subsidy)</p>
                    <p><span className="font-semibold">Annual Generation:</span> 4,380 units (~12 units/day)</p>
                    <p><span className="font-semibold">Annual Savings:</span> ₹35,040 (@ ₹8/unit)</p>
                    <p><span className="font-semibold">Maintenance (20yr):</span> ₹60,000</p>
                    <p><span className="font-semibold">Payback Period:</span> 4.7 years</p>
                    <p className="text-2xl font-bold text-amber-900 pt-2 border-t-2 border-amber-300">20-Year Profit: ₹5,40,800</p>
                    <p className="text-sm text-emerald-600 font-semibold">ROI: 327% over 20 years</p>
                  </div>
                </div>

                <div className="bg-sky-50 rounded-lg p-6 border-2 border-sky-200">
                  <h3 className="font-bold text-xl mb-4 text-sky-900">💨 Wind (1kW Turbine)</h3>
                  <div className="space-y-3 text-slate-700">
                    <p><span className="font-semibold">Installation Cost:</span> ₹2,50,000 (no subsidy)</p>
                    <p><span className="font-semibold">Annual Generation:</span> 2,190 units (~6 units/day avg)</p>
                    <p><span className="font-semibold">Annual Savings:</span> ₹17,520 (@ ₹8/unit)</p>
                    <p><span className="font-semibold">Maintenance (20yr):</span> ₹3,00,000</p>
                    <p><span className="font-semibold">Payback Period:</span> 14.3 years</p>
                    <p className="text-2xl font-bold text-sky-900 pt-2 border-t-2 border-sky-300">20-Year Loss: ₹1,99,600</p>
                    <p className="text-sm text-red-600 font-semibold">ROI: Negative in poor wind zones</p>
                  </div>
                </div>
              </div>
              <p className="text-center mt-6 text-lg font-semibold text-slate-700">
                Solar delivers <span className="text-emerald-600">5X better ROI for residential installations!</span>
              </p>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-amber-900">Calculate Your Solar ROI</h3>
                <p className="text-slate-700 mb-6">
                  Get personalized solar ROI calculations for your city with actual subsidy amounts, electricity savings, and payback period.
                </p>
                <Link 
                  href="/solar-roi"
                  className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  Calculate Solar Savings <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-emerald-900">Compare Other Options</h3>
                <p className="text-slate-700 mb-6">
                  Explore more comparisons to make informed decisions about your investments and expenses.
                </p>
                <Link 
                  href="/compare"
                  className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  View All Comparisons <ArrowRight className="ml-2 w-5 h-5" />
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
