import { Metadata } from 'next';
import LPGSubsidyCalculator from '@/components/calculators/real-estate/LPGSubsidyCalculator';
import JsonLd from '@/components/seo/JsonLd';
import { getCalculatorSchema } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'LPG Subsidy Calculator | CostSmart',
  description: 'Calculate annual savings from LPG subsidies.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/lpg-subsidy-calculator',
  },
};

export default function Page() {
  const jsonLd = getCalculatorSchema(
    'LPG Subsidy Calculator',
    'Calculate annual savings from LPG subsidies.',
    '/in/lpg-subsidy-calculator'
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">LPG Subsidy Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate annual savings from LPG subsidies.</p>
      </div>

      <LPGSubsidyCalculator />

      <article className="prose prose-slate lg:prose-lg mx-auto mt-16">
        <h2>How to use this calculator</h2>
        <p>
            This tool helps you make data-driven decisions.
            Simply enter your specific details above, and the calculator will provide instant results.
        </p>
        <h3>Why is this important?</h3>
        <p>
            Understanding your numbers is crucial for financial health.
            Accuracy saves money and helps in better planning.
        </p>
      </article>
    </div>
  );
}
