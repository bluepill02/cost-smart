import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import HomeLoanCalculator from '@/components/calculators/loan/HomeLoanCalculator';
import AdContainer from '@/components/ads/AdContainer';
import RelatedTools from '@/components/layouts/RelatedTools';
import { INDIAN_CITIES } from '@/lib/pseo-data/cities';

// --- Static Params Generation ---
export async function generateStaticParams() {
    return INDIAN_CITIES.map((city) => ({
        city: city.slug,
    }));
}

// --- Dynamic Metadata Generation ---
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city: cityParam } = await params;
    const city = INDIAN_CITIES.find(c => c.slug === cityParam);
    if (!city) return { title: 'City Not Found' };

    return {
        title: `Home Loan EMI Calculator ${city.name} - Current Rates 2025`,
        description: `Calculate your Home Loan EMI for properties in ${city.name}. Check eligibility, interest rates, and total payment breakdown for ${city.name} real estate.`,
        alternates: {
            canonical: `https://costsmart.app/home-loan-calculator/${cityParam}`,
        }
    };
}

export default async function CityHomeLoanPage({ params }: { params: Promise<{ city: string }> }) {
    const { city: cityParam } = await params;
    const city = INDIAN_CITIES.find(c => c.slug === cityParam);

    if (!city) {
        notFound();
    }

    const defaultLoanAmount = city.tier === 1 ? 7500000 : 4000000; // 75L for Tier 1, 40L for others

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Home Loan EMI Calculator for <span className="text-emerald-600">{city.name}</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Planning to buy a home in {city.name}, {city.state}? Use our specialized calculator to estimate your monthly EMI based on local property trends.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                    <HomeLoanCalculator defaultAmount={defaultLoanAmount} />
                </div>

                <div className="mt-12 prose max-w-none text-slate-600">
                    <h2>Buying a Home in {city.name}?</h2>
                    <p>
                        Real estate in <strong>{city.name}</strong> is a significant investment. With property prices in {city.tier === 1 ? 'metropolitan' : 'growing'} areas on the rise,
                        calculating your exact EMI burden is crucial before applying for a loan.
                    </p>

                    <h3>Why {city.name} Homeowners need accurate planning</h3>
                    <p>
                        The cost of living in {city.name} (Tier {city.tier}) impacts your disposable income.
                        Banks usually recommend that your Home Loan EMI should not exceed 40% of your monthly income.
                        Use the slider above to adjust the loan amount (defaulted to ₹{(defaultLoanAmount/100000).toFixed(1)} Lakhs for {city.name} market standards)
                        and find a tenure that keeps your finances comfortable.
                    </p>
                </div>

                <div className="my-8">
                    <AdContainer size="leaderboard" slotId="1475703853" />
                </div>
            </div>

            <RelatedTools currentTool="loan" />
        </div>
    );
}
