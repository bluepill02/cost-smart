import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Why You Need an Emergency Fund (Before Investing)',
    description: 'An emergency fund is your financial seatbelt. Learn why you need it, how much to save, and where to park this cash.',
    alternates: {
        canonical: 'https://costsmart.app/blog/emergency-fund-importance',
    }
};

export default function BlogPost() {
    return (
        <article>
            <h1>Why You Need an Emergency Fund (Before Investing)</h1>
            <p className="lead">
                Life is unpredictable. Layoffs, medical emergencies, or car repairs can strike anytime. Without an emergency fund, you might be forced to break your investments or take high-interest debt.
            </p>

            <div className="my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold mb-1">Size Your Safety Net</h3>
                    <p className="text-sm text-slate-600">Calculate 3-6 months of expenses.</p>
                </div>
                 <div className="flex gap-2">
                     <Link href="/emergency-fund-calculator">
                        <Button variant="destructive">Calculate Now</Button>
                    </Link>
                </div>
            </div>

            <h2>What is an Emergency Fund?</h2>
            <p>
                It is a stash of money set aside specifically for unplanned events. It is NOT for:
            </p>
            <ul>
                <li>Buying a new phone</li>
                <li>Vacations</li>
                <li>Down payment for a house</li>
            </ul>

            <h2>How Much Should You Save?</h2>
            <p>
                The general rule is <strong>3 to 6 months of essential living expenses</strong>.
            </p>
            <ul>
                <li><strong>Stable Job (Govt/MNC):</strong> 3 Months might suffice.</li>
                <li><strong>Private Sector / Single Income:</strong> 6 Months is recommended.</li>
                <li><strong>Freelancer / Business Owner:</strong> 9 to 12 Months is safer due to income volatility.</li>
            </ul>

            <h2>Where to Keep It?</h2>
            <p>
                <strong>Liquidity &gt; Returns.</strong> You need this money instantly when disaster strikes.
            </p>
            <ol>
                <li>High-Yield Savings Account</li>
                <li>Liquid Mutual Funds (Redeemable in 24 hours)</li>
                <li>Sweep-in Fixed Deposits</li>
            </ol>
            <p>
                Avoid stocks, real estate, or lock-in schemes like PPF for this fund.
            </p>
        </article>
    );
}
