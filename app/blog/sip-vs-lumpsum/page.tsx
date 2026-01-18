import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'SIP vs Lumpsum: Which is Better for You?',
    description: 'Compare Systematic Investment Plans (SIP) with Lumpsum investing. Understand the pros and cons of each strategy for mutual funds.',
    alternates: {
        canonical: 'https://costsmart.app/blog/sip-vs-lumpsum',
    }
};

export default function BlogPost() {
    return (
        <article>
            <h1>SIP vs Lumpsum: Which Strategy Wins?</h1>
            <p className="lead">
                Investing in mutual funds is one of the best ways to create wealth. But the big question remains: Should you invest a small amount every month (SIP) or a large amount at once (Lumpsum)?
            </p>

            <div className="my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold mb-1">Calculate Your Returns</h3>
                    <p className="text-sm text-slate-600">Model both SIP and Lumpsum scenarios.</p>
                </div>
                 <div className="flex gap-2">
                     <Link href="/investment-calculator">
                        <Button>Growth Calc ($)</Button>
                    </Link>
                    <Link href="/in/sip-calculator">
                        <Button variant="secondary">SIP Calc (₹)</Button>
                    </Link>
                </div>
            </div>

            <h2>What is SIP (Systematic Investment Plan)?</h2>
            <p>
                SIP is a method where you invest a fixed sum regularly (usually monthly) in a mutual fund scheme. It is similar to a Recurring Deposit (RD) but for market-linked investments.
            </p>
            <h3>Benefits of SIP</h3>
            <ul>
                <li><strong>Rupee Cost Averaging:</strong> You buy more units when the market is down and fewer when it&apos;s up, averaging your cost.</li>
                <li><strong>Discipline:</strong> Forces you to save money before you spend it.</li>
                <li><strong>No Market Timing:</strong> You don&apos;t need to worry if the market is at a peak or a bottom.</li>
            </ul>

            <h2>What is Lumpsum Investing?</h2>
            <p>
                Lumpsum is a one-time investment. This is usually done when you receive a bonus, windfall, or sale of an asset.
            </p>
            <h3>Benefits of Lumpsum</h3>
            <ul>
                <li><strong>Higher Potential Returns:</strong> If invested during a market dip, your money grows for the entire duration.</li>
                <li><strong>Convenience:</strong> One-time transaction.</li>
            </ul>

            <h2>Comparison Table</h2>
            <div className="not-prose overflow-x-auto">
                <table className="min-w-full border-collapse border border-slate-200 text-sm">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="border p-3 text-left">Feature</th>
                            <th className="border p-3 text-left">SIP</th>
                            <th className="border p-3 text-left">Lumpsum</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-3 font-medium">Risk</td>
                            <td className="border p-3">Lower (spread out)</td>
                            <td className="border p-3">Higher (market timing risk)</td>
                        </tr>
                        <tr>
                            <td className="border p-3 font-medium">Ideal For</td>
                            <td className="border p-3">Salaried individuals</td>
                            <td className="border p-3">Bonus/Windfall gains</td>
                        </tr>
                        <tr>
                            <td className="border p-3 font-medium">Market Timing</td>
                            <td className="border p-3">Not Required</td>
                            <td className="border p-3">Critical</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Verdict</h2>
            <p>
                If you have a regular salary, **SIP is the best route**. It automates your savings and reduces risk.
                If you have a large sum of money sitting idle, invest it via **Lumpsum**, but consider doing it in tranches (STP) if you fear a market crash.
            </p>
        </article>
    );
}
