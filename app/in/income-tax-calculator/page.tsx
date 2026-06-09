import { Metadata } from 'next';
import IndiaTaxCalculator from '@/components/calculators/tax/IndiaTaxCalculator';
import AdContainer from '@/components/ads/AdContainer';
import AfterResultAd from '@/components/ads/AfterResultAd';
import { Badge } from '@/components/ui/badge';
import { IndianRupee } from 'lucide-react';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import ShareResultButton from '@/components/features/ShareResultButton';
import RelatedCalculators from '@/components/features/RelatedCalculators';
import StickyUpgradeNudge from '@/components/premium/StickyUpgradeNudge';

export const metadata: Metadata = {
    title: 'Income Tax Calculator FY 2024-25 | CostSmart',
    description: 'Calculate income tax for FY 2024-25 under New Regime vs Old Regime. Includes 80C, HRA, NPS deductions and the ₹7L tax-free rebate. Updated for Budget 2024.',
    alternates: {
        canonical: '/in/income-tax-calculator',
    },
    openGraph: {
        title: 'Income Tax Calculator FY 2024-25 | CostSmart',
        description: 'Calculate income tax for FY 2024-25 under New Regime vs Old Regime. Includes 80C, HRA, NPS deductions and the ₹7L tax-free rebate. Updated for Budget 2024.',
        url: `${CANONICAL_DOMAIN}/in/income-tax-calculator`,
        type: 'website',
    },
};

export default function TaxCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <CalculatorSchemaInjector calculatorName="CostSmart Income Tax Calculator India" calculatorDescription="Calculate India Income Tax FY 2024-25 — New Regime vs Old Regime." urlPath="/in/income-tax-calculator" calculatorType="tax" />
            <Breadcrumbs items={[
                { label: 'India Calculators', href: '/in' },
                { label: 'Income Tax Calculator' },
            ]} />
            <div className="text-center mb-10 space-y-4">
                 <div className="flex justify-center gap-2">
                     <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
                        <IndianRupee size={12} /> India Edition
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Income Tax <span className="text-emerald-600">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Updated for Budget 2024 (FY 2024-25). Check which tax regime saves you more money.
                </p>
            </div>

            <IndiaTaxCalculator />

            <AfterResultAd slotId="1475703853" />

            {/* Share row */}
            <div className="flex items-center gap-3 flex-wrap mt-2 mb-2">
                <ShareResultButton title="Income Tax Calculator Result" text="See my income tax calculation (New vs Old Regime) on CostSmart" />
            </div>

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">New vs Old Regime: Key Changes</h2>
                    <p>
                        The **New Regime** is now the default. It offers lower tax rates but fewer deductions.
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Standard Deduction:</strong> Increased to ₹75,000 in New Regime (from ₹50,000).</li>
                        <li><strong>Tax Free Limit:</strong> Income up to ₹7 Lakhs is tax-free in New Regime (u/s 87A rebate).</li>
                        <li><strong>Old Regime:</strong> Best if you have high deductions (HRA, Home Loan Interest, 80C &gt; 1.5L).</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                    <RelatedCalculators category="india-finance" currentHref="/in/income-tax-calculator" />
                </div>
            </div>
            <StickyUpgradeNudge />
        </div>
    );
}
