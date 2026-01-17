import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'CTC vs In-Hand Salary: Why is it Different?',
    description: 'Offered 10 LPA but getting only 60k per month? Understand the difference between Cost to Company (CTC) and Net Salary.',
    alternates: {
        canonical: 'https://costsmart.app/blog/ctc-vs-in-hand',
    }
};

export default function BlogPost() {
    return (
        <article>
            <h1>CTC vs In-Hand Salary: The Reality Check</h1>
            <p className="lead">
                You get a job offer of ₹12 LPA. You expect ₹1 Lakh per month. Then the first paycheck arrives, and it is ₹78,000. What happened?
            </p>

            <div className="my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold mb-1">Estimate Your Pay</h3>
                    <p className="text-sm text-slate-600">See your real take-home amount.</p>
                </div>
                 <div className="flex gap-2">
                     <Link href="/in/salary-calculator">
                        <Button>Salary Calculator</Button>
                    </Link>
                </div>
            </div>

            <h2>What is CTC?</h2>
            <p>
                <strong>Cost to Company (CTC)</strong> is the total amount an employer spends on you. It includes:
            </p>
            <ul>
                <li><strong>Direct Pay:</strong> Basic, HRA, Allowances.</li>
                <li><strong>Indirect Benefits:</strong> Health Insurance, Food Coupons, Cab Service.</li>
                <li><strong>Future Benefits:</strong> Gratuity, Employer&apos;s Contribution to PF (12%).</li>
            </ul>

            <h2>The Deductions</h2>
            <p>
                Your &quot;In-Hand&quot; is calculated as:
                <br/>
                <code>Gross Salary - (PF + PT + TDS)</code>
            </p>
            <ol>
                <li><strong>Provident Fund (PF):</strong> 12% of your Basic salary is deducted for your future.</li>
                <li><strong>Professional Tax (PT):</strong> A small state tax (usually ₹200).</li>
                <li><strong>TDS (Income Tax):</strong> Your employer estimates your annual tax and deducts it monthly.</li>
            </ol>

            <h2>Variable Pay</h2>
            <p>
                Many CTCs include a &quot;Performance Bonus&quot; (e.g., 10% of CTC). This is not paid monthly but annually, and depends on company performance.
                Always ask for the <strong>Fixed Component</strong> of your CTC.
            </p>
        </article>
    );
}
