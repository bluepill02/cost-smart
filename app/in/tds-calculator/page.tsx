import { Metadata } from 'next';
import TDSCalculator from '@/components/calculators/business/TDSCalculator';

export const metadata: Metadata = {
  title: 'TDS Calculator India (FY 2024-25) | CostSmart',
  description: 'Calculate TDS for Contractors (194C), Professionals (194J), Rent (194I), and more. Includes rates for PAN vs No PAN.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/tds-calculator',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">TDS Calculator India (FY 2024-25)</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate TDS for Contractors (194C), Professionals (194J), Rent (194I), and more. Includes rates for PAN vs No PAN.</p>
      </div>

      <TDSCalculator />

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
