import { Metadata } from 'next';
import InvestmentCalculator from '@/components/calculators/investment/InvestmentCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Investment Return Calculator | Compound Interest Growth',
    description: 'Calculate how your investments grow over time with compound interest. Model monthly contributions and initial lumpsums.',
    alternates: {
        canonical: 'https://costsmart.app/investment-calculator',
    }
};

export default function InvestmentCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CostSmart Investment Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Calculate investment growth and compound interest."
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <TrendingUp size={12} /> Wealth Builder
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Investment <span className="text-emerald-600">Growth Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    The 8th wonder of the world is compound interest. See how small monthly contributions turn into massive wealth.
                </p>
            </div>

            <InvestmentCalculator currency="USD" locale="en-US" />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">The Magic of Compounding</h2>
                    <p>
                        Compounding allows you to earn interest on your interest. Over long periods (10+ years), the interest you earn can exceed the amount you actually invested.
                    </p>
                    <h3 className="font-bold text-slate-900">Start Early</h3>
                    <p>
                        Time is your biggest asset. Investing $500/month starting at age 25 yields significantly more at age 60 than starting at age 35, even if you invest double the amount later.
                    </p>
                </div>

                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>
        </div>
    );
}
