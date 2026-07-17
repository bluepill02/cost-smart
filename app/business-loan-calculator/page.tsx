import { Metadata } from 'next';
import BusinessLoanCalculator from '@/components/calculators/business/BusinessLoanCalculator';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import RelatedCalculators from '@/components/features/RelatedCalculators';
import AmazonRecommendations from '@/components/affiliate/AmazonRecommendations';

export const metadata: Metadata = {
  title: 'Business Loan Calculator | CostSmart',
  description: 'Calculate business loan EMI and check eligibility.',
  alternates: {
    canonical: '/business-loan-calculator',
  },
  openGraph: {
    title: 'Business Loan Calculator | CostSmart',
    description: 'Calculate business loan EMI and check eligibility.',
    url: `${CANONICAL_DOMAIN}/business-loan-calculator`,
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <CalculatorSchemaInjector calculatorName="Business Loan Calculator" calculatorDescription="Calculate business loan EMI and check eligibility." urlPath="/business-loan-calculator" calculatorType="loan" />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Business Loan Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate business loan EMI and check eligibility.</p>
      </div>

      <BusinessLoanCalculator />

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

      <AmazonRecommendations calculatorSlug="business-loan" />

      <RelatedCalculators category="business" currentHref="/business-loan-calculator" />
    </div>
  );
}
