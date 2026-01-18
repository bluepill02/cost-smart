import { Metadata } from 'next';
import PPFCalculator from '@/components/calculators/savings/PPFCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { Landmark, IndianRupee } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'PPF Calculator | Public Provident Fund Interest & Maturity',
    description: 'Calculate your Public Provident Fund (PPF) maturity amount and interest earned. Tax-free returns with government security.',
    alternates: {
        canonical: 'https://costsmart.app/in/ppf-calculator',
    }
};

export default function PPFCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CostSmart PPF Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Calculate PPF returns and maturity value."
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <Landmark size={12} /> Govt Scheme
                    </Badge>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
                        <IndianRupee size={12} /> India Edition
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    PPF <span className="text-emerald-600">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Public Provident Fund is India&apos;s favorite tax-saving investment. Secure, tax-free returns backed by the Government of India.
                </p>
            </div>

            <PPFCalculator />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Key Features of PPF</h2>
                    <ul className="list-disc pl-5">
                        <li><strong>EEE Status:</strong> Exempt-Exempt-Exempt. Investment, Interest, and Maturity are all tax-free.</li>
                        <li><strong>Lock-in Period:</strong> 15 Years. Partial withdrawals allowed after 7th year.</li>
                        <li><strong>Min/Max:</strong> Min ₹500, Max ₹1.5 Lakh per financial year.</li>
                        <li><strong>Interest Rate:</strong> Revised quarterly by Govt (Current: 7.1%).</li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>
        </div>
    );
}
