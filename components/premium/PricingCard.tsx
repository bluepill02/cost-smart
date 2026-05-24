import { Check } from 'lucide-react';
import Link from 'next/link';

interface PricingCardProps {
  planName: string;
  price: number;
  interval: string | null;
  features: readonly string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaHref?: string;
  paypalButton?: boolean;
}

export default function PricingCard({
  planName,
  price,
  interval,
  features,
  highlighted = false,
  ctaText = 'Get Started',
  ctaHref = '/calculators',
  paypalButton = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl border p-8 flex flex-col ${
        highlighted
          ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 scale-[1.02]'
          : 'border-slate-200 shadow-sm'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 uppercase tracking-wide">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1">{planName}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-slate-900">
            {price === 0 ? 'Free' : `$${price}`}
          </span>
          {interval && (
            <span className="text-slate-500 text-sm">/{interval}</span>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {paypalButton ? (
        <div id="paypal-button-container" className="w-full min-h-[50px]">
          {/* PayPal Smart Buttons will render here via the PayPal JS SDK on the pricing page */}
          <Link
            href="/pricing#checkout"
            className="block w-full text-center px-6 py-3 rounded-xl font-semibold text-white transition-colors bg-[#0070ba] hover:bg-[#005ea6]"
          >
            Pay with PayPal
          </Link>
        </div>
      ) : (
        <Link
          href={ctaHref}
          className={`block w-full text-center px-6 py-3 rounded-xl font-semibold transition-colors ${
            highlighted
              ? 'text-white bg-emerald-600 hover:bg-emerald-700'
              : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}
