import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'FD vs Mutual Funds: Where Should You Invest?',
    description: 'A comprehensive comparison between Fixed Deposits (FD) and Mutual Funds. Understand risk, returns, taxation, and liquidity.',
    alternates: {
        canonical: 'https://costsmart.app/blog/fd-vs-mutual-funds',
    }
};

export default function BlogPost() {
    return (
        <article>
            <h1>Fixed Deposit vs Mutual Funds: The Ultimate Showdown</h1>
            <p className="lead">
                The classic dilemma for Indian investors: Safety of FD or High Returns of Mutual Funds? The answer depends on your goals and risk appetite.
            </p>

            <div className="my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold mb-1">Compare Returns</h3>
                    <p className="text-sm text-slate-600">See the difference in real numbers.</p>
                </div>
                 <div className="flex gap-2">
                     <Link href="/in/fd-calculator">
                        <Button variant="outline">FD Calculator</Button>
                    </Link>
                    <Link href="/in/sip-calculator">
                        <Button>SIP Calculator</Button>
                    </Link>
                </div>
            </div>

            <h2>Fixed Deposit (FD): The Safe Haven</h2>
            <p>
                FDs are loved for their predictability. You know exactly how much you will get at maturity.
            </p>
            <ul>
                <li><strong>Risk:</strong> Near Zero (Bank deposits insured up to ₹5 Lakhs).</li>
                <li><strong>Returns:</strong> 6% - 8% (varies by bank).</li>
                <li><strong>Taxation:</strong> Taxed at slab rate. Not tax-efficient for high earners.</li>
            </ul>

            <h2>Mutual Funds: The Wealth Builders</h2>
            <p>
                Mutual funds invest in stocks (Equity) or bonds (Debt). They carry market risk but beat inflation over the long term.
            </p>
            <ul>
                <li><strong>Risk:</strong> Moderate to High.</li>
                <li><strong>Returns:</strong> 10% - 15% (Equity Long Term).</li>
                <li><strong>Taxation:</strong>
                    <ul>
                        <li>Equity (LTCG): 12.5% on gains above ₹1.25 Lakh.</li>
                        <li>Debt: Taxed at slab rate.</li>
                    </ul>
                </li>
            </ul>

            <h2>When to choose what?</h2>
            <table className="min-w-full border-collapse border border-slate-200 text-sm my-4">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border p-3 text-left">Goal Duration</th>
                        <th className="border p-3 text-left">Best Choice</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-3">&lt; 1 Year</td>
                        <td className="border p-3">FD or Liquid Funds</td>
                    </tr>
                    <tr>
                        <td className="border p-3">1 - 3 Years</td>
                        <td className="border p-3">FD or Debt Mutual Funds</td>
                    </tr>
                    <tr>
                        <td className="border p-3">5+ Years</td>
                        <td className="border p-3">Equity Mutual Funds (SIP)</td>
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
