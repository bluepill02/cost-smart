import React from 'react';
import type { Metadata } from 'next';
import GSTCalculator from '@/components/calculators/tax/GSTCalculator';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'GST Calculator India | Inclusive vs Exclusive GST Calculation (2025)',
  description: 'Calculate GST amount, pre-tax value, and total cost instantly. Supports 5%, 12%, 18%, 28% tax slabs. Differentiate between Inclusive and Exclusive GST.',
  alternates: {
    canonical: '/in/gst-calculator',
  },
  keywords: 'gst calculator, gst inclusive calculator, gst exclusive calculator, india gst rates, gst calculation formula',
};

export default function GSTPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd
        data={{
          "@type": "SoftwareApplication",
          name: "GST Calculator India",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR",
          },
        }}
      />

      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          GST <span className="text-emerald-600">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Instantly calculate Goods and Services Tax (GST). Switch between Exclusive (add tax) and Inclusive (extract tax) modes.
        </p>
      </div>

      <GSTCalculator />

      <div className="mt-12 prose prose-slate max-w-none">
        <h2>How GST Calculation Works</h2>
        <p>
            GST (Goods and Services Tax) can be calculated in two ways:
        </p>
        <ul>
            <li><strong>GST Exclusive:</strong> You have a base price and need to add tax. <br/><code>Total = Base Price + (Base Price × Rate%)</code></li>
            <li><strong>GST Inclusive:</strong> You have a final price and need to find the tax component. <br/><code>Tax = Total Price - (Total Price / (1 + Rate%))</code></li>
        </ul>

        <h3>Current GST Rates in India</h3>
        <ul>
            <li><strong>5%:</strong> Essential goods (Food items, medicines)</li>
            <li><strong>12%:</strong> Standard goods (Processed food, computers)</li>
            <li><strong>18%:</strong> Most services and standard goods (Restaurants, electronics)</li>
            <li><strong>28%:</strong> Luxury goods (Cars, tobacco, cement)</li>
        </ul>
      </div>
    </div>
  );
}
