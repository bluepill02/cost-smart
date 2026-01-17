import { Metadata } from 'next';
import LoanCalculator from '@/components/calculators/loan/LoanCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, IndianRupee } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'EMI Calculator India | Home, Car & Personal Loan EMI',
    description: 'Calculate your monthly EMI for Home Loans, Car Loans, and Personal Loans in India. Accurate results with principal vs interest breakdown.',
    alternates: {
        canonical: 'https://costsmart.app/in/emi-calculator',
    }
};

export default function IndianEMICalculatorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CostSmart EMI Calculator India",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": "Calculate Equated Monthly Installment (EMI) for Indian loans."
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <ShieldCheck size={12} /> Financial Literacy
                    </Badge>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
                        <IndianRupee size={12} /> India Edition
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Smart <span className="text-emerald-600">EMI Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Plan your Home, Car, or Personal loan. See exactly how much interest you will pay to the bank.
                </p>
            </div>

            <LoanCalculator
                currency="INR"
                locale="en-IN"
                defaultPrincipal={5000000}
                defaultRate={8.5}
                maxPrincipal={50000000}
            />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">How EMI Works in India</h2>
                    <p>
                        Your Equated Monthly Installment (EMI) consists of a principal component and an interest component.
                        In the early years of a home loan, a large portion of your EMI goes towards interest.
                    </p>
                    <h3 className="font-bold text-slate-900">Pre-payment is Key</h3>
                    <p>
                        Indian banks allow you to make part-payments towards your home loan.
                        Even small extra payments can reduce your tenure significantly because they get adjusted directly against the principal outstanding.
                    </p>
                    <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500 not-prose">
                        <p className="text-emerald-800 text-sm font-medium">
                            <strong>Did you know?</strong> RBI mandates no foreclosure charges on floating rate home loans for individuals. You can pay off your loan early without penalties!
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>
        </div>
    );
}
