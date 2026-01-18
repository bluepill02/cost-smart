import { Metadata } from 'next';
import EmergencyFundCalculator from '@/components/calculators/savings/EmergencyFundCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'Emergency Fund Calculator | Financial Safety Net',
    description: 'Calculate the right size for your emergency fund. Protect yourself from job loss, medical emergencies, or unexpected expenses.',
    alternates: {
        canonical: 'https://costsmart.app/emergency-fund-calculator',
    }
};

export default function EmergencyFundCalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CostSmart Emergency Fund Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Calculate emergency fund requirements."
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <div className="text-center mb-10 space-y-4">
                 <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <ShieldAlert size={12} /> First Step of Investing
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Emergency Fund <span className="text-emerald-600">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Before you invest, you must insure. Build a safety net that lets you sleep peacefully at night.
                </p>
            </div>

            <EmergencyFundCalculator currency="USD" locale="en-US" />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">How much is enough?</h2>
                    <p>
                        Financial experts recommend keeping <strong>3 to 6 months</strong> of essential living expenses in a liquid fund.
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Salaried (Secure Job):</strong> 3-4 months</li>
                        <li><strong>Freelancer / Business:</strong> 6-12 months</li>
                        <li><strong>Single Income Family:</strong> 9-12 months</li>
                    </ul>
                    <h3 className="font-bold text-slate-900">Where to park it?</h3>
                    <p>
                        Do not chase returns here. Liquidity is king. Keep it in a High Yield Savings Account or a Sweep-in FD where you can access it instantly.
                    </p>
                </div>
                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>
        </div>
    );
}
