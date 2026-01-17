import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Complete Guide to PPF (Public Provident Fund)',
    description: 'Understand PPF rules, interest rates, tax benefits, and withdrawal limits. Why PPF is the safest long-term investment in India.',
    alternates: {
        canonical: 'https://costsmart.app/blog/ppf-guide',
    }
};

export default function BlogPost() {
    return (
        <article>
            <h1>Complete Guide to Public Provident Fund (PPF)</h1>
            <p className="lead">
                In a volatile financial world, the Public Provident Fund (PPF) stands as a fortress of safety. Backed by the Government of India, it offers guaranteed returns that are completely tax-free.
            </p>

            <div className="my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold mb-1">Plan Your PPF</h3>
                    <p className="text-sm text-slate-600">See your maturity amount instantly.</p>
                </div>
                 <div className="flex gap-2">
                    <Link href="/in/ppf-calculator">
                        <Button>Open PPF Calculator</Button>
                    </Link>
                </div>
            </div>

            <h2>What makes PPF special?</h2>
            <p>
                PPF falls under the EEE (Exempt-Exempt-Exempt) category of taxation in India:
            </p>
            <ol>
                <li><strong>Investment is Tax Exempt:</strong> You get tax deduction u/s 80C for the amount you invest (up to ₹1.5 Lakh).</li>
                <li><strong>Interest is Tax Exempt:</strong> The interest earned every year is not taxed.</li>
                <li><strong>Maturity is Tax Exempt:</strong> The final amount you withdraw after 15 years is fully tax-free.</li>
            </ol>

            <h2>Key Rules You Must Know</h2>
            <ul>
                <li><strong>Tenure:</strong> The account matures after 15 full financial years. You can extend it in blocks of 5 years indefinitely.</li>
                <li><strong>Investment Limits:</strong> Minimum ₹500 and Maximum ₹1.5 Lakh per financial year. Investing more than 1.5L will not earn interest.</li>
                <li><strong>Deposit Frequency:</strong> You can deposit in lump sum or installments (max 12 per year used to be the rule, now flexible).</li>
            </ul>

            <h2>How to Maximize Your Interest?</h2>
            <p>
                This is a secret many investors miss. Interest in PPF is calculated on the <strong>lowest balance between the 5th and the last day of the month</strong>.
            </p>
            <div className="bg-amber-50 p-4 border-l-4 border-amber-500 my-4 not-prose">
                <p className="text-amber-900 font-medium">
                    <strong>Tip:</strong> Always deposit your PPF contribution <strong>before the 5th of the month</strong>.
                    If you deposit on the 6th, you lose interest for that entire month!
                </p>
            </div>

            <h2>Premature Withdrawal</h2>
            <p>
                While PPF is a 15-year scheme, liquidity is available:
            </p>
            <ul>
                <li><strong>Partial Withdrawal:</strong> Allowed from the 7th financial year.</li>
                <li><strong>Loan:</strong> You can take a loan against your PPF balance between the 3rd and 6th year.</li>
                <li><strong>Premature Closure:</strong> Allowed after 5 years only for specific reasons like medical treatment or higher education.</li>
            </ul>
        </article>
    );
}
