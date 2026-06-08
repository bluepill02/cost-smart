import { Metadata } from 'next';
import InvoiceGenerator from '@/components/calculators/business/InvoiceGenerator';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import RelatedCalculators from '@/components/features/RelatedCalculators';

export const metadata: Metadata = {
  title: 'Invoice Generator | CostSmart',
  description: 'Create professional PDF invoices instantly for free.',
  alternates: {
    canonical: '/invoice-generator',
  },
  openGraph: {
    title: 'Invoice Generator | CostSmart',
    description: 'Create professional PDF invoices instantly for free.',
    url: `${CANONICAL_DOMAIN}/invoice-generator`,
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <CalculatorSchemaInjector calculatorName="Invoice Generator" calculatorDescription="Create professional PDF invoices instantly for free." urlPath="/invoice-generator" calculatorType="business" />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Invoice Generator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Create professional PDF invoices instantly for free.</p>
      </div>

      <InvoiceGenerator />

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

      <RelatedCalculators category="business" currentHref="/invoice-generator" />
    </div>
  );
}
