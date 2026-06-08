import { Metadata } from 'next';
import Link from 'next/link';
import {
  Package, Ship, Truck, DollarSign, MapPin, Shield,
  Check, ArrowRight, Zap,
} from 'lucide-react';
import LandedCostReport from '@/components/calculators/LandedCostReport';
import EmailCaptureSection from '@/components/features/EmailCaptureSection';
import JsonLd from '@/components/seo/JsonLd';
import { CANONICAL_DOMAIN, getCalculatorSchema } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Landed Cost Calculator for US Importers | CostSmart',
  description:
    'Calculate your total landed cost before you ship. Duties, taxes, freight, route distance, and last-mile delivery in one free report.',
  alternates: { canonical: `${CANONICAL_DOMAIN}/for/logistics` },
};

export default function LogisticsLandingPage() {
  const jsonLd = getCalculatorSchema(
    'Landed Cost Calculator',
    'Calculate your total landed cost before you ship. Duties, taxes, freight, route distance, and last-mile delivery in one free report.',
    '/for/logistics',
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
            Free Landed Cost Calculator for US Importers
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
            Know Your Exact{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #00D4AA 0%, #3B82F6 100%)' }}
            >
              Landed Cost
            </span>
            <br />Before You Ship
          </h1>

          <p className="text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            The only free tool that calculates your total import cost - duties, shipping, route
            distance, and last-mile delivery - in one report.
          </p>

          {/* CTA */}
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 text-base"
          >
            Get Your Landed Cost Report <ArrowRight className="w-5 h-5" />
          </a>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm">
            {[
              'No Signup Required',
              'Free for 3 Reports/Day',
              'Powered by Google Routes',
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
            Most importers discover hidden costs{' '}
            <span className="text-red-600">AFTER</span> the shipment arrives.
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Customs surprises. Unexpected freight charges. Last-mile fees you never budgeted for.
            Stop guessing your margins.
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
                icon: Package,
                title: 'Enter Shipment Details',
                desc: 'Origin, destination, product info, weight and dimensions',
              },
              {
                step: 2,
                icon: Zap,
                title: 'We Calculate Everything',
                desc: 'Duties, taxes, freight costs, route distance, last-mile delivery',
              },
              {
                step: 3,
                icon: DollarSign,
                title: 'Get Your Report',
                desc: 'Complete landed cost breakdown with every fee itemized',
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
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            What&apos;s Included in Your Report
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Package,
                title: 'Import Duty & Customs',
                desc: 'Accurate duty rates for 8 origin countries to USA',
                badge: null,
              },
              {
                icon: Ship,
                title: 'Freight/Shipping Estimate',
                desc: 'Air and sea freight with volumetric weight calculation',
                badge: null,
              },
              {
                icon: MapPin,
                title: 'Route Distance & Transit Time',
                desc: 'Powered by Google Routes API',
                badge: 'Google Routes API',
              },
              {
                icon: Truck,
                title: 'Last-Mile Delivery',
                desc: 'Domestic delivery cost from port to your door',
                badge: null,
              },
              {
                icon: DollarSign,
                title: 'Total Landed Cost',
                desc: 'Every fee, tax, and charge in one number',
                badge: null,
              },
              {
                icon: Shield,
                title: 'Tax Summary',
                desc: 'MPF fees, harbor maintenance, handling charges',
                badge: null,
              },
            ].map(({ icon: Icon, title, desc, badge }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                {badge && (
                  <span className="inline-block mt-2 text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </div>
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
                  'Basic landed cost estimate',
                  '3 reports per day',
                  'Route distance calculation',
                  'Duty & tax breakdown',
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
                $9<span className="text-sm font-medium text-slate-500">/mo</span>
              </p>
              <ul className="space-y-3">
                {[
                  'Everything in Free',
                  'Unlimited calculations',
                  'Detailed PDF export',
                  'Route map visualization',
                  'Historical rate tracking',
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
              <p className="mt-3 text-center text-xs text-slate-500">
                Or get a single report for $7 - no subscription needed
              </p>
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
            Trusted by Importers
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'Saved me from a $3,200 customs surprise on my first electronics shipment from Shenzhen.',
                name: 'Sarah K.',
                role: 'Amazon FBA Seller',
              },
              {
                quote:
                  'Finally, a tool that gives me the TOTAL picture, not just duty rates.',
                name: 'David M.',
                role: 'Auto Parts Importer',
              },
              {
                quote:
                  'I use this before every purchase order. My margins are predictable now.',
                name: 'Lisa T.',
                role: 'Fashion Boutique Owner',
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
      {/* CALCULATOR                                    */}
      {/* ══════════════════════════════════════════════ */}
      <section id="calculator" className="bg-white py-16 px-4 scroll-mt-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-8 tracking-tight">
            Calculate Your Landed Cost
          </h2>
          <LandedCostReport />
        </div>
      </section>

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
                name: 'Import Duty Calculator',
                href: '/import-duty',
                desc: 'Calculate customs duties for international shipments',
              },
              {
                name: 'Shipping Cost Calculator',
                href: '/shipping-cost-calculator',
                desc: 'Estimate freight and volumetric shipping costs',
              },
              {
                name: 'Currency Converter',
                href: '/currency',
                desc: 'Convert between currencies with live rates',
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
