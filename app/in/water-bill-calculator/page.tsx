import { Metadata } from 'next';
import WaterBillCalculator from '@/components/calculators/real-estate/WaterBillCalculator';
import JsonLd from '@/components/seo/JsonLd';
import { getCalculatorSchema } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Water Bill Calculator | CostSmart',
  description: 'Calculate estimated water bill charges based on usage.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/water-bill-calculator',
  },
};

export default function Page() {
  const jsonLd = getCalculatorSchema(
    'Water Bill Calculator',
    'Calculate estimated water bill charges based on usage.',
    '/in/water-bill-calculator'
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Water Bill Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate estimated water bill charges based on usage.</p>
      </div>

      <WaterBillCalculator />

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
