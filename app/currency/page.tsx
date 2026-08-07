import { Metadata } from 'next';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import CurrencyConverter from '@/components/calculators/currency/CurrencyConverter';
import { getLatestRates } from '@/lib/currency-api';
import AdContainer from '@/components/ads/AdContainer';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import RelatedCalculators from '@/components/features/RelatedCalculators';

export const metadata: Metadata = {
    title: 'Live Currency Converter & Exchange Rates | CostSmart',
    description: 'Convert money instantly with real-time exchange rates. View 30-day trends for USD, EUR, GBP, INR, and 30+ global currencies.',
    alternates: {
        canonical: '/currency',
    },
    openGraph: {
        title: 'Live Currency Converter & Exchange Rates | CostSmart',
        description: 'Convert money instantly with real-time exchange rates. View 30-day trends for USD, EUR, GBP, INR, and 30+ global currencies.',
        url: `${CANONICAL_DOMAIN}/currency`,
        type: 'website',
    },
};

export default async function CurrencyPage() {
    const rates = await getLatestRates('USD');

    if (!rates) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-red-600">Service Temporarily Unavailable</h1>
                <p className="text-slate-600">We couldn&apos;t load the latest exchange rates. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <CalculatorSchemaInjector calculatorName="CostSmart Currency Converter" calculatorDescription="Live currency converter with 150+ currencies and real-time exchange rates." urlPath="/currency" calculatorType="general" />
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Currency <span className="text-emerald-600">Converter</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Check live foreign exchange rates and analyze trends with our official ECB-backed data.
                </p>
            </div>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
                <div>
                    <CurrencyConverter initialRates={rates} />
                </div>

                <div className="space-y-6">
                    {/* Sidebar Ad */}
                    <AdContainer size="rectangle" />

                    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                        <h3 className="font-bold text-emerald-800 mb-2">Why trust these rates?</h3>
                        <p className="text-sm text-emerald-700 leading-relaxed">
                            Our rates are sourced directly from the European Central Bank (ECB) via Frankfurter.
                            They represent the daily reference rates, updated every working day around 16:00 CET.
                        </p>
                    </div>
                </div>
            </div>

            <RelatedCalculators category="investment" currentHref="/currency" />
        </div>
    );
}
