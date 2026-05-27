import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home, Calculator, MapPin, Sun, Truck, FileText,
  DollarSign, Check, ArrowRight, Zap, Shield, TrendingUp,
} from 'lucide-react';
import EmailCaptureSection from '@/components/features/EmailCaptureSection';
import JsonLd from '@/components/seo/JsonLd';
import { CANONICAL_DOMAIN, getCalculatorSchema } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Home Buying Calculator & Toolkit | CostSmart',
  description:
    'Free home buying toolkit with EMI calculator, rent vs buy analysis, neighborhood explorer, stamp duty calculator, and more. Everything you need to decide: Should I buy this house?',
  alternates: { canonical: `${CANONICAL_DOMAIN}/for/homebuyers` },
};

export default function HomebuyersLandingPage() {
  const jsonLd = getCalculatorSchema(
    'Home Buying Calculator & Toolkit',
    'Free home buying toolkit with EMI calculator, rent vs buy analysis, neighborhood explorer, stamp duty calculator, and more. Everything you need to decide: Should I buy this house?',
    '/for/homebuyers',
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
            Complete Home Buying Toolkit - Free
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
            Make Your Home Purchase Decision{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #00D4AA 0%, #3B82F6 100%)' }}
            >
              With Confidence
            </span>
          </h1>

          <p className="text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            The complete toolkit to know if you can afford it, if the neighborhood is right,
            and how much you&apos;ll really pay.
          </p>

          {/* CTA */}
          <a
            href="#tools"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 text-base"
          >
            Start Your Analysis <ArrowRight className="w-5 h-5" />
          </a>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm">
            {[
              'No Signup Required',
              'Free Calculators',
              'India & USA',
            ].map((label) => (
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
            Buying a home is the biggest financial decision of your life. Most buyers only look at the sticker price and miss{' '}
            <span className="text-red-600">40%</span> of the real costs.
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hidden charges, registration fees, maintenance deposits, society costs, and loan interest
            add up to lakhs more than you planned for.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* HOW IT WORKS                                  */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: Home,
                title: 'Enter Your Details',
                desc: 'House price, your income, preferred city, and loan terms',
              },
              {
                step: 2,
                icon: Zap,
                title: 'We Analyze Everything',
                desc: 'EMI affordability, neighborhood quality, solar potential, total ownership cost',
              },
              {
                step: 3,
                icon: DollarSign,
                title: 'Get Your Affordability Report',
                desc: 'Complete breakdown showing if you can truly afford this home',
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-black">
                  {step}
                </div>
                <Icon className="w-6 h-6 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* WHAT'S INCLUDED                               */}
      {/* ══════════════════════════════════════════════ */}
      <section id="tools" className="bg-white py-16 px-4 scroll-mt-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            What&apos;s Included in Your Toolkit
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Calculator,
                title: 'Home Loan EMI Calculator',
                href: '/home-loan-calculator',
                desc: 'Calculate exact EMI, total interest, and amortization schedule',
              },
              {
                icon: Home,
                title: 'Rent vs Buy Analysis',
                href: '/rent-vs-buy-calculator',
                desc: '20-year comparison: Is buying actually cheaper than renting?',
              },
              {
                icon: MapPin,
                title: 'Neighborhood Explorer',
                href: '/neighborhood-explorer',
                desc: 'Safety scores, amenities, commute times for any location',
              },
              {
                icon: Sun,
                title: 'Solar ROI for Your Roof',
                href: '/solar-roi/analyze',
                desc: 'Will solar panels pay for themselves on your new home?',
              },
              {
                icon: Truck,
                title: 'Moving Cost Estimate',
                href: '/moving-cost-calculator',
                desc: 'Budget for packers, movers, and setup costs',
              },
              {
                icon: FileText,
                title: 'Stamp Duty & Registration',
                href: '/in/stamp-duty-calculator',
                desc: 'State-wise stamp duty, registration charges, and GST',
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
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FREE VS PRO                                   */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            Free vs Pro
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Card */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
              <h3 className="text-xl font-black text-slate-900 mb-1">Free</h3>
              <p className="text-sm text-slate-500 mb-6">Get started instantly</p>
              <ul className="space-y-3">
                {[
                  'Basic EMI calculation',
                  '3 reports per day',
                  'Rent vs Buy comparison',
                  'Basic neighborhood score',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Card */}
            <div className="bg-white border-2 border-emerald-500 ring-4 ring-emerald-100 rounded-2xl p-8 relative">
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">Pro</h3>
              <p className="text-2xl font-black text-emerald-600 mb-6">
                $4.99<span className="text-sm font-medium text-slate-500">/mo</span>
              </p>
              <ul className="space-y-3">
                {[
                  'Everything in Free',
                  'Unlimited calculations',
                  'Detailed PDF export',
                  'Full neighborhood analysis',
                  'Solar rooftop assessment (30/day)',
                  'Ad-free experience',
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
      {/* SOCIAL PROOF                                  */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            Trusted by Home Buyers
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'This toolkit saved us from buying a flat where the society maintenance alone was \u20B98,000/month. The neighborhood explorer caught it.',
                name: 'Priya M.',
                role: 'First-time buyer, Bangalore',
              },
              {
                quote:
                  'The rent vs buy calculator showed us we\'d save $340/month buying vs renting in Austin. We pulled the trigger.',
                name: 'James R.',
                role: 'Relocating family, Austin TX',
              },
              {
                quote:
                  'I had no idea stamp duty in Maharashtra was 6%. The stamp duty calculator helped me budget an extra \u20B94.2L I hadn\'t planned for.',
                name: 'Anita S.',
                role: 'Upgrading from 2BHK, Mumbai',
              },
            ].map(({ quote, name, role }) => (
              <div
                key={name}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                <p className="text-slate-700 italic text-sm leading-relaxed mb-4">
                  &ldquo;{quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{name}</p>
                  <p className="text-xs text-slate-500">{role}</p>
                </div>
              </div>
            ))}
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
                desc: 'Calculate monthly payments and true cost of any loan',
              },
              {
                name: 'Investment Calculator',
                href: '/investment-calculator',
                desc: 'See how your savings grow with compound interest',
              },
              {
                name: 'Inflation Calculator',
                href: '/inflation',
                desc: 'Understand how inflation affects your home\'s future value',
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
