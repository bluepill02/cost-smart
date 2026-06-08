import { Metadata } from 'next';
import GSTInputCreditCalculator from '@/components/calculators/business/GSTInputCreditCalculator';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import RelatedCalculators from '@/components/features/RelatedCalculators';

export const metadata: Metadata = {
  title: 'GST Input Credit Calculator | CostSmart',
  description: 'Calculate net GST payable after claiming Input Tax Credit (ITC). Enter GST collected on sales and GST paid on purchases to find your exact tax liability.',
  alternates: {
    canonical: '/in/gst-input-credit-calculator',
  },
  openGraph: {
    title: 'GST Input Credit Calculator | CostSmart',
    description: 'Calculate net GST payable after claiming Input Tax Credit (ITC). Enter GST collected on sales and GST paid on purchases to find your exact tax liability.',
    url: `${CANONICAL_DOMAIN}/in/gst-input-credit-calculator`,
    type: 'website',
    images: [{ url: `${CANONICAL_DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'GST Input Credit Calculator' }],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <CalculatorSchemaInjector calculatorName="GST Input Credit Calculator" calculatorDescription="Calculate Net GST Payable after Input Tax Credit adjustment." urlPath="/in/gst-input-credit-calculator" calculatorType="tax" />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">GST Input Credit Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate Net GST Payable after Input Tax Credit adjustment.</p>
      </div>

      <GSTInputCreditCalculator />

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

      <RelatedCalculators category="business" currentHref="/in/gst-input-credit-calculator" />
    </div>
  );
}
