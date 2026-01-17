import { Metadata } from 'next';
import FDCalculator from '@/components/calculators/savings/FDCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { Archive, IndianRupee } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Fixed Deposit Calculator | FD Interest Rates India',
    description: 'Calculate maturity amount and interest earned on Fixed Deposits (FD) in India. Supports quarterly, monthly, and annual compounding.',
    alternates: {
        canonical: 'https://costsmart.app/in/fd-calculator',
    }
};

export default function FDCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CostSmart FD Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Calculate Fixed Deposit returns with quarterly compounding."
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
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
                </div>
            </div>
        </div>
    );
}
