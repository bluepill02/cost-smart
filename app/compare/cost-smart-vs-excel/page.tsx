import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cost-Smart vs Excel Spreadsheets | Why Switch to a Dedicated Tool',
  description:
    'Compare Cost-Smart with Excel spreadsheets for personal finance tracking. See why a dedicated tool saves time, reduces errors, and gives you better financial insights.',
  alternates: {
    canonical: '/compare/cost-smart-vs-excel',
  },
};

export default function CostSmartVsExcelPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: 'Cost-Smart vs Excel Comparison',
    description:
      'Detailed comparison between Cost-Smart financial tools and Excel spreadsheets for personal finance management',
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
              { name: 'Cost-Smart vs Excel' },
            ]}
            className="mb-6"
          />

          <AdContainer size="leaderboard" className="mb-8" slotId="1475703853" />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Cost-Smart vs Excel:{' '}
              <span className="text-emerald-600">Why Switch to a Dedicated Tool?</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Excel is powerful, but managing your finances in spreadsheets is like using a Swiss Army
              knife to build a house. Here is how a purpose-built tool compares.
            </p>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle className="w-6 h-6" />
                  Cost-Smart
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">
                    Quick financial calculations, budgeting, and decision-making
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Setup Time</p>
                  <p className="font-semibold text-emerald-600">0 minutes - ready to use instantly</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Price</p>
                  <p className="font-semibold text-slate-900">Free (Pro at $4.99/month)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Financial Formulas</p>
                  <p className="font-semibold text-emerald-600">30+ built-in calculators</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <AlertCircle className="w-6 h-6" />
                  Excel Spreadsheets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Best For</p>
                  <p className="font-semibold text-slate-900">
                    Custom data analysis, complex modeling, one-off projects
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Setup Time</p>
                  <p className="font-semibold text-amber-600">Hours to days building templates</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Price</p>
                  <p className="font-semibold text-slate-900">$6.99 - $12.99/month (Microsoft 365)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Financial Formulas</p>
                  <p className="font-semibold text-amber-600">DIY - build your own</p>
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
                      <th className="text-left p-4 font-bold text-blue-900">Excel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-semibold">Automation</td>
                      <td className="p-4 text-emerald-700">
                        Automatic calculations, instant results
                      </td>
                      <td className="p-4 text-slate-700">
                        Manual formula setup required
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Templates</td>
                      <td className="p-4 text-emerald-700">
                        30+ ready-to-use calculators
                      </td>
                      <td className="p-4 text-slate-700">
                        Must find or build your own
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Mobile Access</td>
                      <td className="p-4 text-emerald-700">
                        Full mobile-responsive web app
                      </td>
                      <td className="p-4 text-slate-700">
                        Limited mobile experience
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Real-time Sync</td>
                      <td className="p-4 text-emerald-700">
                        Cloud-based, always up to date
                      </td>
                      <td className="p-4 text-slate-700">
                        Requires OneDrive/SharePoint setup
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Financial Formulas</td>
                      <td className="p-4 text-emerald-700">
                        Pre-built: EMI, SIP, tax, retirement
                      </td>
                      <td className="p-4 text-slate-700">
                        Must know PMT, FV, IRR functions
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Data Security</td>
                      <td className="p-4 text-emerald-700">
                        No personal data stored on server
                      </td>
                      <td className="p-4 text-slate-700">
                        Risk of accidental sharing or file loss
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Charts / Visualization</td>
                      <td className="p-4 text-emerald-700">
                        Auto-generated charts and breakdowns
                      </td>
                      <td className="p-4 text-slate-700">
                        Powerful but requires manual setup
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold">Collaboration</td>
                      <td className="p-4 text-emerald-700">
                        Share links to results instantly
                      </td>
                      <td className="p-4 text-slate-700">
                        File sharing with version conflicts
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Cost</td>
                      <td className="p-4 text-emerald-700">
                        Free forever plan; Pro at $4.99/mo
                      </td>
                      <td className="p-4 text-slate-700">
                        $6.99 - $12.99/mo (Microsoft 365)
                      </td>
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
                      Zero setup time - start calculating immediately
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      India-specific calculators (GST, stamp duty, PPF)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      No formula errors - tested and validated
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Mobile-friendly, works on any device
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Free tier covers most personal finance needs
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-2">Cons</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Less flexible for custom one-off analysis
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Cannot replace full accounting workflows
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Pro features require subscription for power users
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Excel: Pros &amp; Cons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Pros</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Infinitely customizable for any scenario
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Powerful for complex data modeling
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Industry-standard, widely known tool
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Integrates with other Office tools
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Good for large datasets and pivot tables
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 mb-2">Cons</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Hours of setup for financial templates
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Formula errors are common and hard to spot
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Requires Microsoft 365 subscription ($6.99+/mo)
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      Poor mobile experience for finance tracking
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
                <strong>For everyday personal finance decisions</strong>, Cost-Smart wins hands
                down. It gives you instant answers without the overhead of building and maintaining
                spreadsheets.
              </p>
              <p className="text-slate-700">
                <strong>Excel still has its place</strong> for custom analysis, complex modeling, or
                if you already have extensive spreadsheets set up. But for most people who just want
                to calculate EMI, compare investments, or plan their budget, a dedicated tool is
                faster and more reliable.
              </p>
              <div className="bg-white rounded-lg p-6 border border-emerald-200 mt-6">
                <h4 className="font-bold text-lg text-slate-900 mb-3">Our Recommendation:</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Start with Cost-Smart Free</strong> for basic calculations, SIP
                      planning, and EMI checks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Upgrade to Pro ($4.99/mo)</strong> for unlimited budgets, AI insights,
                      data export, and ad-free experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Keep Excel</strong> for one-off custom analysis or large business data
                      projects
                    </span>
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
                  Ready to Ditch the Spreadsheet?
                </h3>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  Join thousands of users who switched from Excel to Cost-Smart for faster, more
                  accurate financial planning. Start free, upgrade when you need more.
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
