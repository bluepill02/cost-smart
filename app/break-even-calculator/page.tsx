import { Metadata } from 'next';
import BreakEvenCalculator from '@/components/calculators/business/BreakEvenCalculator';

export const metadata: Metadata = {
  title: 'Break-Even Point Calculator | CostSmart',
  description: 'Find out how many units you need to sell to cover your fixed costs. Essential for pricing strategy and business planning.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/break-even-calculator',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Break-Even Point Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Find out how many units you need to sell to cover your fixed costs. Essential for pricing strategy and business planning.</p>
      </div>

      <BreakEvenCalculator />

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
