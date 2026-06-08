import { Metadata } from 'next';
import WaterBillCalculator from '@/components/calculators/real-estate/WaterBillCalculator';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import RelatedCalculators from '@/components/features/RelatedCalculators';

export const metadata: Metadata = {
  title: 'Water Bill Calculator | CostSmart',
  description: 'Calculate your monthly water bill based on usage in kilolitres. Covers slab rates for major Indian cities including Mumbai, Delhi, Chennai, and Bangalore.',
  alternates: {
    canonical: '/in/water-bill-calculator',
  },
  openGraph: {
    title: 'Water Bill Calculator | CostSmart',
    description: 'Calculate your monthly water bill based on usage in kilolitres. Covers slab rates for major Indian cities including Mumbai, Delhi, Chennai, and Bangalore.',
    url: `${CANONICAL_DOMAIN}/in/water-bill-calculator`,
    type: 'website',
    images: [{ url: `${CANONICAL_DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'Water Bill Calculator' }],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <CalculatorSchemaInjector calculatorName="Water Bill Calculator" calculatorDescription="Calculate estimated water bill charges based on usage." urlPath="/in/water-bill-calculator" calculatorType="general" />
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

      <RelatedCalculators category="utility" currentHref="/in/water-bill-calculator" />
    </div>
  );
}
