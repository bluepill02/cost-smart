import { Metadata } from 'next';
import { Suspense } from 'react';
import { getCalculatorSchema } from '@/lib/seo-utils';
import LoanCalculator from '@/components/calculators/loan/LoanCalculator';
import AdContainer from '@/components/ads/AdContainer';
import AfterResultAd from '@/components/ads/AfterResultAd';
import StickyAdSidebar from '@/components/ads/StickyAdSidebar';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, IndianRupee } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/features/Breadcrumbs';
import ShareResultButton from '@/components/features/ShareResultButton';
import RelatedCalculators from '@/components/features/RelatedCalculators';
import StickyUpgradeNudge from '@/components/premium/StickyUpgradeNudge';

export const metadata: Metadata = {
    title: 'EMI Calculator India | CostSmart',
    description: 'Calculate your monthly EMI for Home Loans, Car Loans, and Personal Loans in India. Accurate results with principal vs interest breakdown.',
    openGraph: {
    title: 'EMI Calculator India | CostSmart',
    description: 'Calculate EMI for home, car, and personal loans in India. Get amortization schedule, total interest, and compare different loan tenures instantly.',
    url: '/in/emi-calculator',
    type: 'website',
  },
  alternates: {
        canonical: '/in/emi-calculator',
    }
};

export default function IndianEMICalculatorPage() {
    const jsonLd = getCalculatorSchema(
        'CostSmart EMI Calculator India',
        'Calculate Equated Monthly Installment for home, car, and personal loans in India.',
        '/in/emi-calculator'
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <JsonLd data={jsonLd} />
            <Breadcrumbs items={[
                { label: 'India Calculators', href: '/in' },
                { label: 'EMI Calculator' },
            ]} />
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

            <Suspense fallback={null}>
            <LoanCalculator
                currency="INR"
                locale="en-IN"
                defaultPrincipal={5000000}
                defaultRate={8.5}
                maxPrincipal={50000000}
            />
            </Suspense>

            {/* High-viewability ad — shown right after user sees their EMI result */}
            <AfterResultAd slotId="1475703853" />

            {/* Share row */}
            <div className="flex items-center gap-3 flex-wrap mt-2 mb-2">
                <ShareResultButton title="EMI Calculator Result" text="See my loan EMI calculation on CostSmart" />
            </div>

            <div className="mt-8 grid md:grid-cols-[2fr_1fr] gap-8">
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
                    <div className="lg:hidden">
                        <AdContainer size="rectangle" slotId="1475703853" />
                    </div>
                    <StickyAdSidebar slotId="5821640937" />
                    <RelatedCalculators category="loan" currentHref="/in/emi-calculator" />
                </div>
            </div>
            <StickyUpgradeNudge />
        </div>
    );
}
