import { Metadata } from 'next';
import ElectricityBillCalculator from '@/components/calculators/real-estate/ElectricityBillCalculator';
import JsonLd from '@/components/seo/JsonLd';
import { getCalculatorSchema, CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Electricity Bill Calculator | CostSmart',
  description: 'Estimate your monthly electricity bill using state-wise slab rates. Add appliances, get per-unit cost, and see how to reduce your power consumption in India.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/electricity-bill-calculator',
  },
  openGraph: {
    title: 'Electricity Bill Calculator | CostSmart',
    description: 'Estimate your monthly electricity bill using state-wise slab rates. Add appliances, get per-unit cost, and see how to reduce your power consumption in India.',
    url: `${CANONICAL_DOMAIN}/in/electricity-bill-calculator`,
    type: 'website',
    images: [{ url: `${CANONICAL_DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'Electricity Bill Calculator' }],
  },
};

export default function Page() {
  const jsonLd = getCalculatorSchema(
    'Electricity Bill Calculator',
    'Estimate your monthly electricity bill based on consumption.',
    '/in/electricity-bill-calculator'
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Electricity Bill Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Estimate your monthly electricity bill based on consumption.</p>
      </div>

      <ElectricityBillCalculator />

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
