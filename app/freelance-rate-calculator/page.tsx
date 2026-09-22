import { Metadata } from 'next';
import FreelanceRateCalculator from '@/components/calculators/business/FreelanceRateCalculator';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import AmazonRecommendations from '@/components/affiliate/AmazonRecommendations';
import PremiumBanner from '@/components/premium/PremiumBanner';
import RelatedCalculators from '@/components/features/RelatedCalculators';

export const metadata: Metadata = {
  title: 'Freelance Rate Calculator | CostSmart',
  description: 'Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours. Stop undercharging for your work.',
  alternates: {
    canonical: '/freelance-rate-calculator',
  },
  openGraph: {
    title: 'Freelance Rate Calculator | CostSmart',
    description: 'Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours. Stop undercharging for your work.',
    url: `${CANONICAL_DOMAIN}/freelance-rate-calculator`,
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <CalculatorSchemaInjector calculatorName="Freelance Rate Calculator" calculatorDescription="Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours. Stop undercharging for your work." urlPath="/freelance-rate-calculator" calculatorType="business" />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Freelance Rate Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours. Stop undercharging for your work.</p>
      </div>

      <FreelanceRateCalculator />

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

      <AmazonRecommendations calculatorSlug="freelance-rate" />

      <RelatedCalculators category="business" currentHref="/freelance-rate-calculator" />

      <PremiumBanner />
    </div>
  );
}
