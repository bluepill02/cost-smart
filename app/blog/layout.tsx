import AdContainer from '@/components/ads/AdContainer';
import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

const POPULAR_TOOLS = [
  { name: 'SIP Calculator', href: '/in/sip-calculator' },
  { name: 'EMI Calculator', href: '/in/emi-calculator' },
  { name: 'Income Tax', href: '/in/income-tax-calculator' },
  { name: 'FD Calculator', href: '/in/fd-calculator' },
  { name: 'Home Loan', href: '/home-loan-calculator' },
  { name: 'Solar ROI', href: '/solar-roi' },
  { name: 'Loan Calculator', href: '/loan-calculator' },
  { name: 'Retirement', href: '/retirement-calculator' },
];

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top leaderboard ad */}
      <div className="container mx-auto px-4 pt-6 max-w-6xl">
        <AdContainer slotId="1706594832" size="leaderboard" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">

          {/* Main article content */}
          <main>
            <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 prose prose-slate lg:prose-lg max-w-none
              prose-headings:font-extrabold prose-headings:text-slate-900
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-800
              prose-li:text-slate-700
              prose-p:text-slate-600 prose-p:leading-relaxed">
              {children}
            </article>

            {/* After-article ad */}
            <div className="mt-8">
              <AdContainer slotId="1475703853" size="rectangle" />
            </div>

            {/* Related tools CTA */}
            <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-800 text-lg">Try Our Free Calculators</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {POPULAR_TOOLS.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="bg-white rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all text-center"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/calculators" className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                  See all 30+ calculators <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Sidebar sticky ad */}
            <div className="sticky top-24 space-y-6">
              <AdContainer slotId="5821640937" size="vertical" />

              {/* Quick tool links */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Popular Tools</h4>
                <ul className="space-y-2">
                  {POPULAR_TOOLS.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className="flex items-center justify-between text-sm text-slate-600 hover:text-emerald-600 transition-colors py-1"
                      >
                        {tool.name}
                        <ArrowRight className="w-3 h-3 opacity-50" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/calculators"
                  className="mt-4 block text-center bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  All Calculators
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
