import { Metadata } from 'next';
import ProfitMarginCalculator from '@/components/calculators/business/ProfitMarginCalculator';

export const metadata: Metadata = {
  title: 'Profit Margin Calculator - Margin vs Markup | CostSmart',
  description: 'Calculate Gross Margin, Markup percentage, and Net Profit. Understand the difference between margin and markup for your business.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/profit-margin-calculator',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Profit Margin Calculator - Margin vs Markup</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate Gross Margin, Markup percentage, and Net Profit. Understand the difference between margin and markup for your business.</p>
      </div>

      <ProfitMarginCalculator />

      <article className="prose prose-slate lg:prose-lg mx-auto mt-16">
        <h2>How to use this calculator</h2>
        <p>
            This tool helps you make data-driven decisions for your business.
            Simply enter your specific details above, and the calculator will provide instant results.
        </p>
        <h3>Why is this important?</h3>
        <p>
            Understanding your numbers is crucial for financial health.
            Whether you are calculating margins, taxes, or shipping costs, accuracy saves money.
        </p>
      </article>
    </div>
  );
}
