import { Metadata } from 'next';
import FDCalculator from '@/components/calculators/savings/FDCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { Archive } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'CD Calculator | Certificate of Deposit Interest',
    description: 'Calculate returns on Certificates of Deposit (CD) and Term Deposits. Compare annual yields and see your money grow.',
    alternates: {
        canonical: 'https://costsmart.app/fd-calculator',
    }
};

export default function GlobalFDCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CostSmart CD Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Calculate Certificate of Deposit returns."
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <div className="text-center mb-10 space-y-4">
                 <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <Archive size={12} /> Safe Savings
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    CD / Term Deposit <span className="text-emerald-600">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Certificates of Deposit (CDs) offer guaranteed returns. Use this tool to estimate your maturity value.
                </p>
            </div>

            <FDCalculator currency="USD" locale="en-US" compoundingFrequency="monthly" defaultPrincipal={5000} />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Why Choose CDs?</h2>
                    <p>
                        CDs are ideal for money you do not need immediately. They typically offer higher interest rates than standard savings accounts in exchange for locking your money for a set term.
                    </p>
                </div>
                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>
        </div>
    );
}
