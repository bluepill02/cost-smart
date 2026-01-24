import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SolarForm from '@/components/calculators/SolarForm';
import AdContainer from '@/components/ads/AdContainer';
import RelatedTools from '@/components/layouts/RelatedTools';
import { getCityData } from '@/lib/solar-data';

// --- Static Params for Budgets ---
export async function generateStaticParams() {
    const budgets = ['100000', '200000', '300000', '500000', '1000000']; // INR values
    return budgets.map((amount) => ({
        amount: amount,
    }));
}

// --- Dynamic Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ amount: string }> }): Promise<Metadata> {
    const { amount } = await params;
    return {
        title: `Solar System for ₹${parseInt(amount).toLocaleString()} Budget - ROI & Capacity`,
        description: `What kind of solar system can you get for ₹${parseInt(amount).toLocaleString()}? Check capacity, generation, and savings.`,
        alternates: {
            canonical: `https://costsmart.app/solar-roi/budget/${amount}`,
        }
    };
}

export default async function SolarBudgetPage({ params }: { params: Promise<{ amount: string }> }) {
    const { amount } = await params;
    const budget = parseInt(amount);

    if (isNaN(budget)) notFound();

    const cityData = await getCityData('delhi'); // Default context
    if (!cityData) notFound();

    // Estimate capacity: Cost approx ₹50,000 per kW (Subsidized) to ₹70,000 (Non-subsidized)
    // Using conservative 60k/kW
    const estimatedCapacity = (budget / 60000).toFixed(1);

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Solar Plan for <span className="text-emerald-600">₹{budget.toLocaleString()}</span> Budget
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        With a budget of ₹{budget.toLocaleString()}, you can install approximately <strong>{estimatedCapacity} kW</strong> of solar power.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                            <SolarForm cityData={cityData} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Budget Breakdown</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-slate-500">Your Budget</span>
                                    <span className="font-bold">₹{budget.toLocaleString()}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-slate-500">Est. Capacity</span>
                                    <span className="font-bold">{estimatedCapacity} kW</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-slate-500">Subsidy Eligibility</span>
                                    <span className="font-bold text-emerald-600">Likely Yes</span>
                                </li>
                            </ul>
                        </div>
                        <AdContainer size="rectangle" slotId="1475703853" />
                    </div>
                </div>
            </div>

            <RelatedTools currentTool="solar" />
        </div>
    );
}
