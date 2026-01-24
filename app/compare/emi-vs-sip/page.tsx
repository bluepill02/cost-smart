import { Metadata } from 'next';
import EMIVsSIPCalculator from '@/components/calculators/compare/EMIVsSIPCalculator';
import AdContainer from '@/components/ads/AdContainer';
import JsonLd from '@/components/seo/JsonLd';
import { getCalculatorSchema } from '@/lib/seo-utils';
import RelatedTools from '@/components/layouts/RelatedTools';

export const metadata: Metadata = {
  title: 'EMI vs SIP Calculator | Pay Loan or Invest? | CostSmart',
  description: 'Should you pay EMI or start a SIP? Compare the cost of debt vs the power of compounding with our advanced comparison tool.',
  alternates: {
    canonical: 'https://cost-smart-five.vercel.app/compare/emi-vs-sip',
  },
};

export default function Page() {
  const jsonLd = getCalculatorSchema(
    'EMI vs SIP Calculator',
    'Compare the financial impact of paying a Home Loan EMI versus investing in a Mutual Fund SIP.',
    '/compare/emi-vs-sip'
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <JsonLd data={jsonLd} />
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Decision Engine
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">EMI vs SIP Calculator</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The ultimate financial dilemma: Buy a home on loan or rent and invest the difference?
        </p>
      </div>

      <EMIVsSIPCalculator />

      <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
        <div className="prose prose-slate lg:prose-lg">
            <h2>The Opportunity Cost of Buying</h2>
            <p>
                When you take a home loan, you commit to paying a large sum as interest over 20-30 years.
                This calculator helps you visualize the <strong>Opportunity Cost</strong>.
                If you invested that same monthly amount in a high-growth equity SIP (12-15% return),
                the compounding effect often outperforms the real estate appreciation.
            </p>
            <h3>Key Takeaways</h3>
            <ul>
                <li><strong>Interest Rate Gap:</strong> Home Loans are usually 8-9%, while Equity SIPs can yield 12%+. This spread creates wealth.</li>
                <li><strong>Liquidity:</strong> SIPs are liquid; Real Estate is not.</li>
                <li><strong>Tax:</strong> Home Loans offer tax benefits (Sec 24b, 80C) which reduce the effective interest rate. Ensure you factor this in.</li>
            </ul>
        </div>
        <div className="space-y-6">
             <AdContainer size="rectangle" />
        </div>
      </div>

      <RelatedTools currentTool="loan" />
    </div>
  );
}
