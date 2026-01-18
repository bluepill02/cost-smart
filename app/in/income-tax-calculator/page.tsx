import { Metadata } from 'next';
import IndiaTaxCalculator from '@/components/calculators/tax/IndiaTaxCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { IndianRupee } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Income Tax Calculator FY 2024-25 (AY 25-26) | Old vs New Regime',
    description: 'Calculate your Income Tax for FY 2024-25. Compare New Regime (default) vs Old Regime to find where you save more tax.',
    alternates: {
        canonical: 'https://costsmart.app/in/income-tax-calculator',
    }
};

export default function TaxCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CostSmart Income Tax Calculator India",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Calculate India Income Tax FY 2024-25."
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
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
                </div>
            </div>
        </div>
    );
}
