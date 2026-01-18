import { Metadata } from 'next';
import GSTInputCreditCalculator from '@/components/calculators/business/GSTInputCreditCalculator';

export const metadata: Metadata = {
  title: 'GST Input Tax Credit (ITC) Calculator India | CostSmart',
  description: 'Calculate your Net GST Payable. Offset your Output Liability with Input Tax Credit (ITC) easily.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/in/gst-input-credit-calculator',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">GST Input Tax Credit (ITC) Calculator India</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Calculate your Net GST Payable. Offset your Output Liability with Input Tax Credit (ITC) easily.</p>
      </div>

      <GSTInputCreditCalculator />

      <article className="prose prose-slate lg:prose-lg mx-auto mt-16">
        <h2>How to use this calculator</h2>
        <p>
            This tool helps you make data-driven decisions for your business.
            Simply enter your specific details above, and the calculator will provide instant results.
        </p>
        <h3>Why is this important?</h3>
        <p>
            Understanding your numbers is crucial for financial health.
            Whether you are calculating margins, taxes, or shipping costs, accuracy saves money.
        </p>
      </article>
    </div>
  );
}
