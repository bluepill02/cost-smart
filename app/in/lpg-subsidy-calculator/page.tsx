import { Metadata } from 'next';
import LPGSubsidyCalculator from '@/components/calculators/real-estate/LPGSubsidyCalculator';
import JsonLd from '@/components/seo/JsonLd';
import { getCalculatorSchema, CANONICAL_DOMAIN } from '@/lib/seo-utils';
import RelatedCalculators from '@/components/features/RelatedCalculators';

export const metadata: Metadata = {
  title: 'LPG Subsidy Calculator | CostSmart',
  description: 'Calculate your annual LPG subsidy savings. Enter cylinder count and subsidy rate to know your total yearly benefit under PMUY and other government schemes.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/lpg-subsidy-calculator',
  },
  openGraph: {
    title: 'LPG Subsidy Calculator | CostSmart',
    description: 'Calculate your annual LPG subsidy savings. Enter cylinder count and subsidy rate to know your total yearly benefit under PMUY and other government schemes.',
    url: `${CANONICAL_DOMAIN}/in/lpg-subsidy-calculator`,
    type: 'website',
    images: [{ url: `${CANONICAL_DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'LPG Subsidy Calculator' }],
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

      <RelatedCalculators category="utility" currentHref="/in/lpg-subsidy-calculator" />
    </div>
  );
}
