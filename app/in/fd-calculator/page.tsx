import { Metadata } from 'next';
import { getCalculatorSchema } from '@/lib/seo-utils';
import FDCalculator from '@/components/calculators/savings/FDCalculator';
import AdContainer from '@/components/ads/AdContainer';
import AfterResultAd from '@/components/ads/AfterResultAd';
import { Badge } from '@/components/ui/badge';
import { Archive, IndianRupee } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import ShareResultButton from '@/components/features/ShareResultButton';
import RelatedCalculators from '@/components/features/RelatedCalculators';

export const metadata: Metadata = {
    title: 'Fixed Deposit Calculator | FD Interest Rates India',
    description: 'Calculate maturity amount and interest earned on Fixed Deposits (FD) in India. Supports quarterly, monthly, and annual compounding.',
    openGraph: {
    title: 'FD Calculator India | Fixed Deposit Returns',
    description: 'Calculate fixed deposit maturity and interest for all major Indian banks. Supports monthly, quarterly, and annual compounding with TDS deduction.',
    url: 'https://cost-smart-five.vercel.app/in/fd-calculator',
    type: 'website',
  },
  alternates: {
        canonical: 'https://cost-smart-five.vercel.app/in/fd-calculator',
    }
};

export default function FDCalculatorPage() {
    const jsonLd = getCalculatorSchema(
        'CostSmart FD Calculator India',
        'Calculate fixed deposit returns with compounding options for Indian banks.',
        '/in/fd-calculator'
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <Breadcrumbs items={[
                { label: 'India Calculators', href: '/in' },
                { label: 'FD Calculator' },
            ]} />
            <div className="text-center mb-10 space-y-4">
                 <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <Archive size={12} /> Guaranteed Returns
                    </Badge>
                     <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
                        <IndianRupee size={12} /> India Edition
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Fixed Deposit <span className="text-emerald-600">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    The safest investment for your hard-earned money. Calculate precise returns with quarterly compounding logic used by Indian banks.
                </p>
            </div>

            <FDCalculator currency="INR" locale="en-IN" compoundingFrequency="quarterly" defaultPrincipal={100000} />

            <AfterResultAd slotId="1475703853" />

            {/* Share row */}
            <div className="flex items-center gap-3 flex-wrap mt-2 mb-2">
                <ShareResultButton title="FD Calculator Result" text="See my Fixed Deposit maturity calculation on CostSmart" />
            </div>

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Understanding FD Compounding</h2>
                    <p>
                        Most Indian banks (SBI, HDFC, ICICI) compound interest <strong>quarterly</strong>. This means you earn interest on your interest every 3 months.
                    </p>
                    <h3 className="font-bold text-slate-900">Taxation (TDS)</h3>
                    <p>
                        Interest earned on FDs is fully taxable as per your income tax slab. Banks deduct 10% TDS if interest exceeds ₹40,000/year (₹50,000 for seniors).
                    </p>
                </div>
                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                    <RelatedCalculators category="investment" currentHref="/in/fd-calculator" />
                </div>
            </div>
        </div>
    );
}
