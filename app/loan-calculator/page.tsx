import { Metadata } from 'next';
import LoanCalculator from '@/components/calculators/loan/LoanCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'True Cost Loan Calculator | Mortgage & EMI Estimator',
    description: 'Calculate your monthly payments and see how much interest you really pay. Use our Extra Payment tool to see how to save thousands.',
    alternates: {
        canonical: 'https://costsmart.app/loan-calculator',
    }
};

export default function LoanCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CostSmart Loan Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Calculate true cost of loans including interest and extra payments."
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <ShieldCheck size={12} /> Financial Literacy Tool
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    True Cost <span className="text-emerald-600">Loan Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Banks focus on the monthly payment. We focus on the total cost.
                    See how interest eats into your money and how to fight back.
                </p>
            </div>

            <LoanCalculator />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Understanding the &quot;True Cost&quot; of Debt</h2>
                    <p>
                        When you take out a loan, the &quot;sticker price&quot; (the principal) is only part of the story.
                        The interest rate and the term length determine the final price tag.
                    </p>
                    <h3 className="font-bold text-slate-900">The Power of Extra Payments</h3>
                    <p>
                        Because interest is calculated on your <em>remaining balance</em>, paying even $50 extra a month reduces that balance faster.
                        This has a snowball effect: lower balance = less interest charged next month = more of your payment goes to principal.
                    </p>
                    <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500 not-prose">
                        <p className="text-emerald-800 text-sm font-medium">
                            <strong>Pro Tip:</strong> Making one extra mortgage payment per year can shave years off your loan term!
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>
        </div>
    );
}
