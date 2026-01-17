import React from 'react';
import type { Metadata } from 'next';
import RentVsBuyCalculator from '@/components/calculators/real-estate/RentVsBuyCalculator';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator | Real Estate Decision Tool',
  description: 'Should you rent or buy? Compare the long-term financial impact of buying a home vs renting and investing the difference. Expert level analysis.',
  alternates: {
    canonical: '/rent-vs-buy-calculator',
  },
  keywords: 'rent vs buy calculator, renting vs buying, real estate investment, property appreciation, opportunity cost',
};

export default function RentVsBuyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd
        data={{
          "@type": "SoftwareApplication",
          name: "Rent vs Buy Calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />

      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Rent vs Buy <span className="text-emerald-600">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          The ultimate financial showdown. We use the "Opportunity Cost" method to mathematically determine if you should sign the lease or the deed.
        </p>
      </div>

      <RentVsBuyCalculator />

      <div className="mt-12 prose prose-slate max-w-none">
        <h2>The Math Behind Rent vs Buy</h2>
        <p>
            It's not as simple as comparing "Monthly Rent" vs "Monthly EMI". To get the true picture, we track the <strong>Net Worth</strong> of two parallel universes over time:
        </p>

        <h3>Universe A: You Buy</h3>
        <ul>
            <li>You pay a Down Payment (Cash Outflow).</li>
            <li>You pay Monthly EMIs + Maintenance.</li>
            <li>Your Asset (Home) appreciates in value.</li>
            <li>Your Loan Balance decreases.</li>
            <li><strong>Net Worth = Property Value - Loan Balance</strong></li>
        </ul>

        <h3>Universe B: You Rent</h3>
        <ul>
            <li>You invest the Down Payment amount instead.</li>
            <li>You pay Monthly Rent.</li>
            <li>If (Rent) is cheaper than (EMI + Maintenance), you invest the difference.</li>
            <li>If (Rent) is more expensive, you withdraw from your investments.</li>
            <li><strong>Net Worth = Value of Investment Portfolio</strong></li>
        </ul>

        <p>
            The calculator projects these two lines forward to see which one ends up higher.
        </p>
      </div>
    </div>
  );
}
