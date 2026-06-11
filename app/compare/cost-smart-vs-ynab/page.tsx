import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cost-Smart vs YNAB | Affordable Alternative for Smart Budgeting',
  description:
    'Compare Cost-Smart with YNAB (You Need A Budget). Get similar budgeting power at $4.99/month vs $14.99/month. India-focused features, 30+ calculators, and a generous free tier.',
  alternates: {
    canonical: '/compare/cost-smart-vs-ynab',
  },
};

export default function CostSmartVsYNABPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: 'Cost-Smart vs YNAB Comparison',
    description:
      'Detailed comparison between Cost-Smart and YNAB budgeting tools covering price, features, and suitability',
  };

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
              { name: 'Cost-Smart vs YNAB' },
            ]}
            className="mb-6"
          />

          <AdContainer size="leaderboard" className="mb-8" slotId="1475703853" />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Cost-Smart vs YNAB:{' '}
              <span className="text-emerald-600">The Affordable Alternative</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              YNAB is a great budgeting tool, but at $14.99/month it is expensive for many users.
              Cost-Smart Pro offers similar power at $4.99/month with India-focused features and a
              generous free tier.
            </p>
          </div>

          {/* Price Comparison Highlight */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-900">
                  <DollarSign className="w-6 h-6" />
                  Cost-Smart Pro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-4xl font-black text-emerald-600">
                    $4.99<span className="text-base font-medium text-slate-500">/month</span>
                  </p>
                  <p className="text-sm text-slate-600 mt-1">Plus a free forever plan</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Free Tier</p>
                  <p className="font-semibold text-emerald-600">Yes - 30+ calculators free forever</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Annual Savings vs YNAB</p>
                  <p className="font-semibold text-emerald-600">Save $120/year</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">
                    India/US users who want budgeting + calculators + AI insights
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <DollarSign className="w-6 h-6" />
                  YNAB
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-4xl font-black text-blue-600">
                    $14.99<span className="text-base font-medium text-slate-500">/month</span>
                  </p>
                  <p className="text-sm text-slate-600 mt-1">Or $99/year (billed annually)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Free Tier</p>
                  <p className="font-semibold text-amber-600">No - 34-day trial only</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Annual Cost</p>
                  <p className="font-semibold text-slate-900">$99 - $179.88/year</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">
                    US users committed to envelope budgeting methodology
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Feature-by-Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left p-4 font-bold text-slate-900">Feature</th>
                      <th className="text-left p-4 font-bold text-emerald-900">Cost-Smart</th>
                      <th className="text-left p-4 font-bold text-blue-900">YNAB</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-semibold">Price</td>
                      <td className="p-4 text-emerald-700">Free / $4.99/mo Pro</td>
                      <td className="p-4 text-slate-700">$14.99/mo or $99/yr</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Free Tier</td>
                      <td className="p-4 text-emerald-700">
                        Yes - 30+ calculators, basic budgeting
                      </td>
                      <td className="p-4 text-slate-700">No - 34-day trial only</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">India-focused Features</td>
                      <td className="p-4 text-emerald-700">
                        GST, PPF, stamp duty, SIP, FD calculators
                      </td>
                      <td className="p-4 text-slate-700">
                        Primarily US/UK focused
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Calculator Suite</td>
                      <td className="p-4 text-emerald-700">
                        30+ financial calculators included
                      </td>
                      <td className="p-4 text-slate-700">No calculators - budgeting only</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">AI Insights</td>
                      <td className="p-4 text-emerald-700">
                        Pro: AI-powered spending analysis
                      </td>
                      <td className="p-4 text-slate-700">Basic spending reports</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Envelope Budgeting</td>
                      <td className="p-4 text-slate-700">Category-based budgeting</td>
                      <td className="p-4 text-emerald-700">
                        Full envelope methodology (strength)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Goal Tracking</td>
                      <td className="p-4 text-slate-700">Basic goal tracking</td>
                      <td className="p-4 text-emerald-700">
                        Advanced goal categories and targets
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Data Export</td>
                      <td className="p-4 text-emerald-700">
                        Pro: PDF and CSV export
                      </td>
                      <td className="p-4 text-slate-700">CSV export available</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Mobile App</td>
                      <td className="p-4 text-emerald-700">
                        Responsive web app (works on all devices)
                      </td>
                      <td className="p-4 text-emerald-700">Native iOS and Android apps</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Cost-Smart: Pros &amp; Cons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Pros</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      67% cheaper than YNAB ($4.99 vs $14.99/mo)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Generous free tier - never forced to pay
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      30+ financial calculators included
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      India-specific tools (GST, PPF, stamp duty)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      AI-powered insights (Pro)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-2">Cons</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      No native mobile app (web-based)
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Envelope budgeting is less mature than YNAB
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Smaller community compared to YNAB
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">YNAB: Pros &amp; Cons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Pros</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Best-in-class envelope budgeting system
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Advanced goal tracking and reporting
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Large, active community and educational content
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Native mobile apps (iOS and Android)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Bank sync for US accounts
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-2">Cons</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Expensive at $14.99/month
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      No free tier - must pay after 34-day trial
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      No financial calculators or planning tools
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Limited India-specific features
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verdict Section */}
          <Card className="mb-12 border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-900">Our Verdict</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-slate-700">
                <strong>YNAB is excellent</strong> if you are fully committed to the envelope
                budgeting methodology and are okay paying $14.99/month for it. Its community and
                educational content are unmatched.
              </p>
              <p className="text-slate-700">
                <strong>Cost-Smart is the better choice</strong> if you want an affordable
                all-in-one financial tool that combines budgeting with 30+ calculators, AI
                insights, and India-specific features. You save $120/year while getting tools YNAB
                does not offer.
              </p>
              <div className="bg-white rounded-lg p-6 border border-emerald-200 mt-6">
                <h4 className="font-bold text-lg text-slate-900 mb-3">Choose Cost-Smart if:</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>You want to start free and upgrade only when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>You need India-focused tools (GST, PPF, stamp duty, SIP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Budget matters - $4.99/mo vs $14.99/mo is significant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>You want calculators + budgeting in one platform</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mb-12">
            <Card className="bg-gradient-to-br from-emerald-600 to-green-700 border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Save $120/Year with Cost-Smart Pro
                </h3>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  Get powerful budgeting, 30+ calculators, AI insights, and data export for just
                  $4.99/month. Or start with the free tier and upgrade when you are ready.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center bg-white text-emerald-700 px-8 py-4 rounded-lg font-bold hover:bg-emerald-50 transition-colors"
                >
                  View Plans &amp; Pricing <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <AdContainer size="leaderboard" className="mb-8" slotId="1475703853" />
        </div>
      </div>
    </>
  );
}
