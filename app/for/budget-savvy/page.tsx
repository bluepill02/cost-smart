import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator, PiggyBank, TrendingUp, Shield, Wallet,
  Check, ArrowRight, Zap,
} from 'lucide-react';
import EmailCaptureSection from '@/components/features/EmailCaptureSection';
import JsonLd from '@/components/seo/JsonLd';
import { CANONICAL_DOMAIN, getCalculatorSchema } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Take Control of Your Money | Budget Tools | CostSmart',
  description:
    'Free budget tools to take control of your money. Pay off debt faster, build an emergency fund, start investing, and plan retirement. Stop wondering where your salary goes.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/for/budget-savvy` },
};

export default function BudgetSavvyLandingPage() {
  const jsonLd = getCalculatorSchema(
    'Budget Tools for Smart Money Management',
    'Free budget tools to take control of your money. Pay off debt faster, build an emergency fund, start investing, and plan retirement.',
    '/for/budget-savvy',
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
            Free Budget Toolkit
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
            Take Control of{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #00D4AA 0%, #3B82F6 100%)' }}
            >
              Your Money
            </span>
          </h1>

          <p className="text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            Start telling your money where to go instead of wondering where it went. Free tools to
            pay off debt, build savings, and start investing.
          </p>

          {/* CTA */}
          <a
            href="#tools"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 text-base"
          >
            Start Your Budget Journey <ArrowRight className="w-5 h-5" />
          </a>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm">
            {['No Signup', 'Free Forever Plan', '30+ Calculators'].map((label) => (
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
            Your salary hits the account on the 1st. By the 20th, you are wondering where it all
            went.
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Student loans, rent, subscriptions, and everyday spending add up faster than you
            realize. Without a plan, saving feels impossible. But it does not have to be this way -
            small changes compound into big results.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* TOOLS GRID                                    */}
      {/* ══════════════════════════════════════════════ */}
      <section id="tools" className="bg-slate-50 py-16 px-4 scroll-mt-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            Your Budget Toolkit
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Wallet,
                title: 'Debt Payoff Calculator',
                href: '/debt-payoff-calculator',
                desc: 'See exactly when you will be debt-free. Compare snowball vs avalanche methods.',
              },
              {
                icon: Shield,
                title: 'Emergency Fund Calculator',
                href: '/emergency-fund-calculator',
                desc: 'Find your magic number. Know how much to save for 3-6 months of security.',
              },
              {
                icon: TrendingUp,
                title: 'SIP Calculator',
                href: '/in/sip-calculator',
                desc: 'Start small, grow big. See how monthly investments compound over time.',
              },
              {
                icon: PiggyBank,
                title: 'Retirement Calculator',
                href: '/retirement-calculator',
                desc: 'How much do you actually need? Find out your retirement number today.',
              },
              {
                icon: Calculator,
                title: 'Loan Calculator',
                href: '/loan-calculator',
                desc: 'Calculate EMI, total interest, and the true cost of any loan.',
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
      {/* FREE TO PRO JOURNEY                           */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            Your Journey: Free to Pro
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Start Free',
                desc: 'Use 30+ calculators, track your first budget, and get your debt payoff plan. No signup, no credit card.',
                color: 'bg-emerald-600',
              },
              {
                step: 2,
                title: 'Discover Value',
                desc: 'As you get serious about money, you will want unlimited budgets, AI insights, and detailed exports.',
                color: 'bg-blue-600',
              },
              {
                step: 3,
                title: 'Upgrade for Control',
                desc: 'Pro at $4.99/mo gives you complete financial control: unlimited budgets, data export, and ad-free experience.',
                color: 'bg-purple-600',
              },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="text-center">
                <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-black`}>
                  {step}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Pro Highlights */}
          <div className="mt-12 bg-white border-2 border-emerald-500 ring-4 ring-emerald-100 rounded-2xl p-8 relative max-w-lg mx-auto">
            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              BEST VALUE
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Cost-Smart Pro</h3>
            <p className="text-2xl font-black text-emerald-600 mb-6">
              $4.99<span className="text-sm font-medium text-slate-500">/mo</span>
            </p>
            <ul className="space-y-3">
              {[
                'Unlimited budget categories',
                'AI-powered spending insights',
                'CSV & PDF data export',
                'Advanced reporting & trends',
                'Ad-free experience',
                'All 30+ calculators unlocked',
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
              View Pricing <ArrowRight className="w-4 h-4" />
            </Link>
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
                name: 'Investment Calculator',
                href: '/investment-calculator',
                desc: 'See how your savings grow with compound interest',
              },
              {
                name: 'Inflation Calculator',
                href: '/inflation',
                desc: 'Understand how inflation affects your purchasing power',
              },
              {
                name: 'FD Calculator',
                href: '/in/fd-calculator',
                desc: 'Calculate fixed deposit returns for safe parking',
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
