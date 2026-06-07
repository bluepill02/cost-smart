import { Metadata } from 'next';
import PricingCard from '@/components/premium/PricingCard';
import { PREMIUM_CONFIG } from '@/lib/premium-config';
import { Sparkles, ShieldCheck, CreditCard, HelpCircle } from 'lucide-react';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import RelatedCalculators from '@/components/features/RelatedCalculators';
import ProRecovery from '@/components/premium/ProRecovery';

export const metadata: Metadata = {
  title: 'Pricing | CostSmart Pro - PDF Reports, Ad-Free, AI Advice',
  description:
    'Upgrade to CostSmart Pro for $4.99/month. Get PDF report exports, ad-free experience, advanced AI financial advice, and priority support.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/pricing',
  },
  openGraph: {
    title: 'Pricing | CostSmart Pro - PDF Reports, Ad-Free, AI Advice',
    description: 'Upgrade to CostSmart Pro for $4.99/month. Get PDF report exports, ad-free experience, advanced AI financial advice, and priority support.',
    url: `${CANONICAL_DOMAIN}/pricing`,
    type: 'website',
    images: [{ url: `${CANONICAL_DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'CostSmart Pro Pricing' }],
  },
};

const FAQ_ITEMS = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, you can cancel your Pro subscription at any time through PayPal. Your access continues until the end of the billing period.',
  },
  {
    q: 'Is there a money-back guarantee?',
    a: 'Absolutely. We offer a 30-day money-back guarantee, no questions asked. If you are not satisfied, contact us for a full refund.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept payments through PayPal, which supports credit cards, debit cards, and PayPal balance.',
  },
  {
    q: 'Will I lose access to free features?',
    a: 'Never. All free features remain available to everyone. Pro simply adds premium capabilities on top of the free tier.',
  },
  {
    q: 'How do PDF exports work?',
    a: 'After upgrading, a "Download PDF" button appears on every calculator. It generates a professional report with your inputs, results, charts, and recommendations.',
  },
];

export default function PricingPage() {
  const { free, proMonthly, proYearly } = PREMIUM_CONFIG.plans;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="py-16 md:py-24 text-center"
        style={{
          background: 'linear-gradient(180deg, #0A0F1E 0%, #111827 100%)',
        }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">CostSmart Pro</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            All calculators are free forever. Upgrade to Pro for premium exports,
            ad-free experience, and advanced AI-powered financial advice.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 max-w-5xl -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <PricingCard
            planName={free.name}
            price={free.price}
            interval={free.interval}
            features={free.features}
            ctaText="Current Plan"
            ctaHref="/calculators"
          />
          <PricingCard
            planName={proMonthly.name}
            price={proMonthly.price}
            interval={proMonthly.interval}
            features={proMonthly.features}
            highlighted
            paypalButton
            planType="monthly"
          />
          <PricingCard
            planName={proYearly.name}
            price={proYearly.price}
            interval={proYearly.interval}
            features={proYearly.features}
            paypalButton
            planType="yearly"
          />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto px-4 max-w-4xl mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100">
            <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-900">30-Day Money Back</p>
              <p className="text-xs text-slate-500">Full refund, no questions asked</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100">
            <CreditCard className="w-8 h-8 text-emerald-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Secure Payment</p>
              <p className="text-xs text-slate-500">Protected by PayPal encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100">
            <Sparkles className="w-8 h-8 text-emerald-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Cancel Anytime</p>
              <p className="text-xs text-slate-500">No lock-in, no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container mx-auto px-4 max-w-4xl mt-16" id="checkout">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Feature</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-900">Free</th>
                <th className="text-center py-3 px-4 font-semibold text-emerald-600">Pro</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['30+ Financial Calculators', true, true],
                ['Shareable Result Links', true, true],
                ['Mobile-Optimized', true, true],
                ['PDF Report Exports', false, true],
                ['Ad-Free Experience', false, true],
                ['Advanced AI Financial Advice', false, true],
                ['Priority Support', false, true],
                ['Advanced Charts & Projections', false, true],
                ['Custom Report Branding', false, true],
                ['Email Report Delivery', false, true],
                ['AI Receipt & Document Scanner', false, true],
                ['Financial Health Analysis', 'Basic Score', 'Full Analysis'],
                ['Multilingual Translation', '2 Languages', '10+ Languages'],
              ].map(([feature, free, pro]) => (
                <tr key={feature as string} className="border-b border-slate-100">
                  <td className="py-3 px-4 text-slate-700">{feature as string}</td>
                  <td className="py-3 px-4 text-center">
                    {free === true ? (
                      <span className="text-emerald-500 font-bold">&#10003;</span>
                    ) : free === false ? (
                      <span className="text-slate-300">&#8212;</span>
                    ) : (
                      <span className="text-slate-500 text-xs">{free as string}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {pro === true ? (
                      <span className="text-emerald-500 font-bold">&#10003;</span>
                    ) : pro === false ? (
                      <span className="text-slate-300">&#8212;</span>
                    ) : (
                      <span className="text-emerald-600 text-xs font-medium">{pro as string}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 max-w-3xl mt-16 pb-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.q}
              className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{item.q}</h3>
              <p className="text-sm text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Recovery */}
      <section className="container mx-auto px-4 max-w-3xl mt-8">
        <ProRecovery />
      </section>

      {/* Explore Calculators */}
      <section className="container mx-auto px-4 max-w-3xl pb-16">
        <RelatedCalculators category="india-finance" title="Explore Our Calculators" />
      </section>
    </div>
  );
}
