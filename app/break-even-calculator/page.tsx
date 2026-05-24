import { Metadata } from 'next';
import BreakEvenCalculator from '@/components/calculators/business/BreakEvenCalculator';
import JsonLd from '@/components/seo/JsonLd';
import { getCalculatorSchema, CANONICAL_DOMAIN } from '@/lib/seo-utils';
import AmazonRecommendations from '@/components/affiliate/AmazonRecommendations';

export const metadata: Metadata = {
  title: 'Break-Even Calculator | CostSmart',
  description: 'Find your break-even point in units and revenue.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/break-even-calculator',
  },
  openGraph: {
    title: 'Break-Even Calculator | CostSmart',
    description: 'Find your break-even point in units and revenue.',
    url: `${CANONICAL_DOMAIN}/break-even-calculator`,
    type: 'website',
    images: [{ url: `${CANONICAL_DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'Break-Even Calculator' }],
  },
};

export default function Page() {
  const jsonLd = getCalculatorSchema(
    'Break-Even Calculator',
    'Find your break-even point in units and revenue.',
    '/break-even-calculator'
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={jsonLd} />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Break-Even Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Find your break-even point in units and revenue.</p>
      </div>

      <BreakEvenCalculator />

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

      <AmazonRecommendations calculatorSlug="break-even" />
    </div>
  );
}
