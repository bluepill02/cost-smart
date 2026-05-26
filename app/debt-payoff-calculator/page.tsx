import { Metadata } from 'next';
import { getCalculatorSchema, CANONICAL_DOMAIN } from '@/lib/seo-utils';
import DebtPayoffCalculator from '@/components/calculators/debt/DebtPayoffCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { TrendingDown } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import AmazonRecommendations from '@/components/affiliate/AmazonRecommendations';
import PremiumBanner from '@/components/premium/PremiumBanner';
import RelatedCalculators from '@/components/features/RelatedCalculators';

export const metadata: Metadata = {
    title: 'Debt Payoff Calculator | CostSmart',
    description: 'Create a plan to get out of debt faster. Compare Debt Snowball vs Debt Avalanche strategies to see which one saves you more money.',
    alternates: {
        canonical: 'https://cost-smart-five.vercel.app/debt-payoff-calculator',
    },
    openGraph: {
        title: 'Debt Payoff Calculator | CostSmart',
        description: 'Create a plan to get out of debt faster. Compare Debt Snowball vs Debt Avalanche strategies to see which one saves you more money.',
        url: `${CANONICAL_DOMAIN}/debt-payoff-calculator`,
        type: 'website',
        images: [{ url: `${CANONICAL_DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'Debt Payoff Calculator' }],
    },
};

export default function DebtCalculatorPage() {
    const jsonLd = getCalculatorSchema(
        'CostSmart Debt Payoff Calculator',
        'Calculate your debt-free date using snowball or avalanche method.',
        '/debt-payoff-calculator'
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <JsonLd data={jsonLd} />
            <div className="text-center mb-10 space-y-4">
                 <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                        <TrendingDown size={12} /> Debt Free Journey
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Debt Payoff <span className="text-emerald-600">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Stop drowning in interest. Use the Snowball or Avalanche method to crush your debt once and for all.
                </p>
            </div>

            <DebtPayoffCalculator />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Which method is right for you?</h2>
                    <div className="grid md:grid-cols-2 gap-6 not-prose my-6">
                        <div className="bg-slate-50 p-6 rounded-xl border">
                            <h3 className="font-bold text-lg mb-2">🏔️ Debt Avalanche</h3>
                            <p className="text-sm mb-4">You pay off the debt with the <strong>highest interest rate</strong> first.</p>
                            <ul className="text-sm list-disc pl-4 space-y-1">
                                <li><strong>Pro:</strong> Mathematically saves the most money.</li>
                                <li><strong>Con:</strong> Takes longer to see the first debt disappear.</li>
                                <li><strong>Best for:</strong> Logical, patient people.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border">
                            <h3 className="font-bold text-lg mb-2">❄️ Debt Snowball</h3>
                            <p className="text-sm mb-4">You pay off the debt with the <strong>smallest balance</strong> first.</p>
                            <ul className="text-sm list-disc pl-4 space-y-1">
                                <li><strong>Pro:</strong> Quick wins boost motivation.</li>
                                <li><strong>Con:</strong> You pay slightly more interest overall.</li>
                                <li><strong>Best for:</strong> People who need motivation to keep going.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>

            <AmazonRecommendations calculatorSlug="debt-payoff" />

            <RelatedCalculators category="loan" currentHref="/debt-payoff-calculator" />

            <PremiumBanner />
        </div>
    );
}
