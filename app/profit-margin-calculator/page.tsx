import { Metadata } from 'next';
import ProfitMarginCalculator from '@/components/calculators/business/ProfitMarginCalculator';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import AmazonRecommendations from '@/components/affiliate/AmazonRecommendations';
import RelatedCalculators from '@/components/features/RelatedCalculators';

export const metadata: Metadata = {
  title: 'Profit Margin Calculator | CostSmart',
  description: 'Calculate Gross Margin, Markup, and Net Profit.',
  alternates: {
    canonical: '/profit-margin-calculator',
  },
  openGraph: {
    title: 'Profit Margin Calculator | CostSmart',
    description: 'Calculate Gross Margin, Markup, and Net Profit.',
    url: `${CANONICAL_DOMAIN}/profit-margin-calculator`,
    type: 'website',
    images: [{ url: `${CANONICAL_DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'Profit Margin Calculator' }],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <CalculatorSchemaInjector calculatorName="Profit Margin Calculator" calculatorDescription="Calculate Gross Margin, Markup, and Net Profit." urlPath="/profit-margin-calculator" calculatorType="business" />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Profit Margin Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate Gross Margin, Markup, and Net Profit.</p>
      </div>

      <ProfitMarginCalculator />

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

      <AmazonRecommendations calculatorSlug="profit-margin" />

      <RelatedCalculators category="business" currentHref="/profit-margin-calculator" />
    </div>
  );
}
