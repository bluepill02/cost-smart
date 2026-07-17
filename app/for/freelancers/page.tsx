import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator, FileText, Receipt, IndianRupee, TrendingUp,
  Check, ArrowRight, Zap, Briefcase,
} from 'lucide-react';
import EmailCaptureSection from '@/components/features/EmailCaptureSection';
import JsonLd from '@/components/seo/JsonLd';
import { CANONICAL_DOMAIN, getCalculatorSchema } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Financial Tools for Freelancers | CostSmart',
  description:
    'Free financial tools built for freelancers. Calculate profit margins, generate invoices, estimate taxes (income tax + GST), and track break-even points. Separate business from personal finances.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/for/freelancers` },
};

export default function FreelancersLandingPage() {
  const jsonLd = getCalculatorSchema(
    'Financial Tools for Freelancers',
    'Free financial tools built for freelancers. Calculate profit margins, generate invoices, estimate taxes, and track break-even points.',
    '/for/freelancers',
    'BusinessApplication'
  );

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />

      {/* ══════════════════════════════════════════════ */}
      {/* HERO                                          */}
      {/* ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[#0A0F1E] pt-20 pb-24 px-4"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 60% -10%, rgba(0,212,170,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)
          `,
        }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container mx-auto max-w-4xl relative text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" />
            Free Financial Toolkit for Freelancers
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
            Simple Financial Management{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #00D4AA 0%, #3B82F6 100%)' }}
            >
              for Freelancers
            </span>
          </h1>

          <p className="text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop mixing personal and business finances. Calculate profit margins, estimate taxes,
            generate invoices, and know your break-even point - all in one place.
          </p>

          {/* CTA */}
          <a
            href="#tools"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 text-base"
          >
            Explore Free Tools <ArrowRight className="w-5 h-5" />
          </a>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm">
            {['No Signup Required', 'Free Tools', 'Export for Tax'].map((label) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-white/50"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PROBLEM STATEMENT                             */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug mb-4">
            Freelancing is freedom, until tax season hits and your business expenses are tangled
            with personal spending.
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Most freelancers spend 5+ hours each month trying to separate business from personal
            finances, guessing tax obligations, and scrambling to find deductions they missed. It
            does not have to be that stressful.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* TOOLS GRID                                    */}
      {/* ══════════════════════════════════════════════ */}
      <section id="tools" className="bg-slate-50 py-16 px-4 scroll-mt-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            Tools Built for Freelancers
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingUp,
                title: 'Profit Margin Calculator',
                href: '/profit-margin-calculator',
                desc: 'Know your real profit after costs. Set better rates for your services.',
              },
              {
                icon: FileText,
                title: 'Invoice Generator',
                href: '/invoice-generator',
                desc: 'Create professional invoices with tax breakdown in seconds.',
              },
              {
                icon: IndianRupee,
                title: 'Income Tax Calculator',
                href: '/in/income-tax-calculator',
                desc: 'Estimate your tax liability under old and new regime. Plan advance tax.',
              },
              {
                icon: Receipt,
                title: 'GST Calculator',
                href: '/in/gst-calculator',
                desc: 'Calculate GST on services, check if you need registration, estimate liability.',
              },
              {
                icon: Calculator,
                title: 'Break-Even Calculator',
                href: '/break-even-calculator',
                desc: 'Find out how many clients or projects you need to cover your costs.',
              },
            ].map(({ icon: Icon, title, href, desc }) => (
              <Link
                key={title}
                href={href}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* HOW PRO HELPS FREELANCERS                     */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            How Cost-Smart Pro Helps Freelancers
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Unlimited Budgets for Clients</h3>
                  <p className="text-sm text-slate-600">
                    Create separate budgets for each client or project. See profitability at a
                    glance without mixing numbers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Data Export for Tax Advisors</h3>
                  <p className="text-sm text-slate-600">
                    Export your financial data as CSV or PDF. Hand it to your CA or accountant and
                    save hours of back-and-forth.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">AI-Powered Insights</h3>
                  <p className="text-sm text-slate-600">
                    Spot spending patterns, identify your most profitable services, and get
                    actionable recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Pro Card */}
            <div className="bg-white border-2 border-emerald-500 ring-4 ring-emerald-100 rounded-2xl p-8 relative">
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                FOR FREELANCERS
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">Pro</h3>
              <p className="text-2xl font-black text-emerald-600 mb-6">
                $4.99<span className="text-sm font-medium text-slate-500">/mo</span>
              </p>
              <ul className="space-y-3">
                {[
                  'Unlimited client budgets',
                  'CSV & PDF data export',
                  'AI spending insights',
                  'Unlimited calculations',
                  'Ad-free experience',
                  'Priority support',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-500 transition-colors text-sm"
              >
                Upgrade to Pro <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* EMAIL CAPTURE                                 */}
      {/* ══════════════════════════════════════════════ */}
      <EmailCaptureSection />

      {/* ══════════════════════════════════════════════ */}
      {/* RELATED TOOLS                                 */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl font-black text-slate-900 text-center mb-8 tracking-tight">
            Related Tools
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                name: 'Loan Calculator',
                href: '/loan-calculator',
                desc: 'Calculate business loan EMI and total cost',
              },
              {
                name: 'Investment Calculator',
                href: '/investment-calculator',
                desc: 'Grow your freelance earnings with compound interest',
              },
              {
                name: 'Inflation Calculator',
                href: '/inflation',
                desc: 'Adjust your rates for inflation each year',
              },
            ].map(({ name, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                  {name}
                </h3>
                <p className="text-xs text-slate-500">{desc}</p>
                <div className="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1">
                  Try it <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
