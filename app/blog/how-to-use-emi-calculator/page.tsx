import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'How to Use an EMI Calculator: The Ultimate Guide',
    description: 'Learn how to calculate your loan EMI, understand the principal vs interest breakdown, and save money on your home loan.',
    alternates: {
        canonical: 'https://costsmart.app/blog/how-to-use-emi-calculator',
    }
};

export default function BlogPost() {
    return (
        <article>
            <h1>How to Use an EMI Calculator: The Ultimate Guide</h1>
            <p className="lead">
                Planning to take a home loan or car loan? The first step is knowing your affordability. An EMI Calculator is your best friend in this journey.
            </p>

            <div className="my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold mb-1">Try the Tool</h3>
                    <p className="text-sm text-slate-600">Calculate your EMI instantly.</p>
                </div>
                <div className="flex gap-2">
                     <Link href="/loan-calculator">
                        <Button>Global / US ($)</Button>
                    </Link>
                    <Link href="/in/emi-calculator">
                        <Button variant="secondary">India (₹)</Button>
                    </Link>
                </div>
            </div>

            <h2>What is an EMI?</h2>
            <p>
                EMI stands for <strong>Equated Monthly Installment</strong>. It is the fixed amount you pay to the bank every month to repay your loan.
                It consists of two parts:
            </p>
            <ul>
                <li><strong>Principal repayment:</strong> The money you actually borrowed.</li>
                <li><strong>Interest payment:</strong> The cost of borrowing that money.</li>
            </ul>

            <h2>How is EMI Calculated?</h2>
            <p>
                The mathematical formula for EMI calculation is:
            </p>
            <blockquote className="font-mono bg-slate-100 p-4 rounded-lg">
                EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
            </blockquote>
            <p>
                Where:
            </p>
            <ul>
                <li><strong>P</strong> is the Principal amount</li>
                <li><strong>R</strong> is the monthly interest rate</li>
                <li><strong>N</strong> is the tenure in months</li>
            </ul>

            <h2>3 Factors That Affect Your EMI</h2>
            <p>
                Understanding these factors helps you lower your monthly burden:
            </p>
            <ol>
                <li>
                    <strong>Loan Amount:</strong> Directly proportional. Higher loan = Higher EMI.
                </li>
                <li>
                    <strong>Interest Rate:</strong> Even a 0.5% difference can save you lakhs or thousands of dollars over 20 years.
                    Always negotiate with your lender.
                </li>
                <li>
                    <strong>Tenure:</strong> Longer tenure means lower monthly EMI, but <em>higher total interest paid</em>.
                    Shorter tenure means higher EMI, but you become debt-free faster.
                </li>
            </ol>

            <h2>Pro Tip: The Magic of Extra Payments</h2>
            <p>
                Most people don&apos;t realize that making just <strong>one extra EMI per year</strong> can reduce your loan tenure by years!
                Use the &quot;Pay Extra Monthly&quot; slider in our calculator to see the impact.
            </p>

        </article>
    );
}
