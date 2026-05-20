import { Metadata } from 'next';
import { getCalculatorSchema } from '@/lib/seo-utils';
import InvestmentCalculator from '@/components/calculators/investment/InvestmentCalculator';
import AdContainer from '@/components/ads/AdContainer';
import AfterResultAd from '@/components/ads/AfterResultAd';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, IndianRupee } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'SIP Calculator | Mutual Fund Returns Estimator India',
    description: 'Calculate returns on your Systematic Investment Plan (SIP). See how your monthly mutual fund investments grow over 5, 10, or 20 years.',
    openGraph: {
    title: 'SIP Calculator | Mutual Fund Returns Estimator India',
    description: 'Calculate SIP returns with compound interest over 5-30 years. Compare monthly vs lumpsum investing, see wealth growth charts, and plan your mutual fund goals.',
    url: 'https://cost-smart-five.vercel.app/in/sip-calculator',
    type: 'website',
  },
  alternates: {
        canonical: 'https://cost-smart-five.vercel.app/in/sip-calculator',
    }
};

export default function SIPCalculatorPage() {
    const jsonLd = getCalculatorSchema(
        'CostSmart SIP Calculator India',
        'Calculate mutual fund SIP returns over 5, 10, or 20 years.',
        '/in/sip-calculator'
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <TrendingUp size={12} /> Mutual Funds
                    </Badge>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
                        <IndianRupee size={12} /> India Edition
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    SIP <span className="text-emerald-600">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Systematic Investment Plans (SIP) are the disciplined way to build wealth. Calculate your future corpus based on monthly investments.
                </p>
            </div>

            <InvestmentCalculator
                currency="INR"
                locale="en-IN"
                mode="SIP"
                defaultMonthly={5000}
                defaultInitial={0}
                defaultRate={12}
            />

            {/* High-viewability ad — shown right after user sees their result */}
            <AfterResultAd slotId="1475703853" />

            <div className="mt-8 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Why SIPs Work</h2>
                    <p>
                        Rupee Cost Averaging: You buy more units when markets are low and fewer when they are high. This averages out your purchase cost over time.
                    </p>
                    <h3 className="font-bold text-slate-900">Expected Returns</h3>
                    <ul className="list-disc pl-5">
                        <li><strong>Equity Funds:</strong> 10-15% (Long Term)</li>
                        <li><strong>Debt Funds:</strong> 6-8% (Low Risk)</li>
                        <li><strong>Hybrid Funds:</strong> 8-12% (Balanced)</li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>
        </div>
    );
}
