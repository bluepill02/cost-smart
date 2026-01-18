import React from 'react';
import type { Metadata } from 'next';
import HomeLoanCalculator from '@/components/calculators/loan/HomeLoanCalculator';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator with Prepayment | Amortization Schedule',
  description: 'Calculate Home Loan EMI and see how much you can save by making prepayments. View detailed amortization schedule and interest breakdown.',
  alternates: {
    canonical: '/home-loan-calculator',
  },
  keywords: 'home loan calculator, home loan emi calculator, prepayment calculator, loan amortization, housing loan interest',
};

export default function HomeLoanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd
        data={{
          "@type": "SoftwareApplication",
          name: "Home Loan EMI Calculator",
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
          Home Loan <span className="text-emerald-600">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Plan your dream home with confidence. Calculate EMIs and discover the massive power of prepayments.
        </p>
      </div>

      <HomeLoanCalculator />

      <div className="mt-12 prose prose-slate max-w-none">
        <h2>Why Use a Home Loan Calculator?</h2>
        <p>
            A home loan is often the biggest financial commitment in a person's life. Small changes in interest rates or tenure can change the total cost by lakhs or millions.
        </p>

        <h3>The Power of Prepayment</h3>
        <p>
            Most home loans allow you to make extra payments towards the principal. This reduces your outstanding balance, which in turn reduces the interest charged in subsequent months.
        </p>
        <p>
            Even a small increase in your EMI (e.g., paying 5-10% extra per month) can reduce a 20-year loan to 12-15 years, saving you a fortune in interest. Use the "Enable Prepayment" toggle above to simulate this.
        </p>
      </div>
    </div>
  );
}
