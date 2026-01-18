import { Metadata } from 'next';
import RetirementCalculator from '@/components/calculators/retirement/RetirementCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { Palmtree } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Retirement Planner | Inflation Adjusted Calculator',
    description: 'Calculate how much money you need to retire comfortably. accounts for inflation, life expectancy, and investment returns.',
    alternates: {
        canonical: 'https://costsmart.app/retirement-calculator',
    }
};

export default function RetirementCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CostSmart Retirement Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Calculate retirement corpus with inflation adjustment."
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <div className="text-center mb-10 space-y-4">
                 <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <Palmtree size={12} /> Financial Freedom
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Retirement <span className="text-emerald-600">Planner</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Retirement is not an age, it is a financial number. Find out yours today.
                </p>
            </div>

            <RetirementCalculator currency="USD" locale="en-US" />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">The Silent Killer: Inflation</h2>
                    <p>
                        Most calculators mislead you by ignoring inflation.
                        If you need $4,000/month today, you will need nearly <strong>$9,700/month</strong> in 20 years (at 6% inflation) just to maintain the same lifestyle.
                    </p>
                    <h3 className="font-bold text-slate-900">The 4% Rule</h3>
                    <p>
                        A common rule of thumb is that you can withdraw 4% of your retirement portfolio annually without running out of money.
                        Our calculator uses a more precise method based on your specific life expectancy and return rates.
                    </p>
                </div>
                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>
        </div>
    );
}
