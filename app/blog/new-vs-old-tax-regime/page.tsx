import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'New vs Old Tax Regime FY 2024-25: Which is Better?',
    description: 'Confusion about the new tax slabs? We explain the difference between Old and New Regime and help you choose the right one.',
    alternates: {
        canonical: 'https://costsmart.app/blog/new-vs-old-tax-regime',
    }
};

export default function BlogPost() {
    return (
        <article>
            <h1>New vs Old Tax Regime (FY 2024-25): The Final Verdict</h1>
            <p className="lead">
                Budget 2024 made the New Regime the default tax option. But is it actually better for you? The answer depends on your investments.
            </p>

            <div className="my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold mb-1">Check Your Tax</h3>
                    <p className="text-sm text-slate-600">Compare both regimes instantly.</p>
                </div>
                 <div className="flex gap-2">
                     <Link href="/in/income-tax-calculator">
                        <Button>Tax Calculator</Button>
                    </Link>
                </div>
            </div>

            <h2>The New Regime (Default)</h2>
            <p>
                <strong>Philosophy:</strong> Lower tax rates, zero paperwork.
            </p>
            <ul>
                <li><strong>Pros:</strong> No need to invest in insurance or PPF just to save tax. Higher Standard Deduction (₹75,000). Tax-free up to ₹7 Lakhs.</li>
                <li><strong>Cons:</strong> You lose HRA, LTA, and Section 80C deductions.</li>
            </ul>

            <h2>The Old Regime</h2>
            <p>
                <strong>Philosophy:</strong> Incentivize savings and investments.
            </p>
            <ul>
                <li><strong>Pros:</strong> You can claim HRA (Rent), Home Loan Interest (up to 2L), and 80C (1.5L).</li>
                <li><strong>Cons:</strong> Higher tax slab rates. Complex paperwork.</li>
            </ul>

            <h2>Breakeven Point</h2>
            <p>
                Generally, if your total deductions (HRA + 80C + 80D) exceed <strong>₹3.75 Lakhs</strong>, the Old Regime might save you more tax.
                Otherwise, the New Regime is usually better and simpler.
            </p>
        </article>
    );
}
