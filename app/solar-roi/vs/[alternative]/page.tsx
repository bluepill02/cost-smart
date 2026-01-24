import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SolarForm from '@/components/calculators/SolarForm';
import AdContainer from '@/components/ads/AdContainer';
import RelatedTools from '@/components/layouts/RelatedTools';
import { getCityData } from '@/lib/solar-data';

// --- Static Params for Alternatives ---
export async function generateStaticParams() {
    const alternatives = ['grid', 'diesel-generator', 'coal', 'wind', 'hydro'];
    return alternatives.map((alt) => ({
        alternative: alt,
    }));
}

// --- Dynamic Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ alternative: string }> }): Promise<Metadata> {
    const { alternative } = await params;
    const altName = alternative.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
        title: `Solar vs ${altName} - Which is Cheaper? | Cost Comparison`,
        description: `Compare Solar Energy against ${altName}. Analysis of ROI, initial cost, environmental impact, and long-term savings.`,
        alternates: {
            canonical: `https://costsmart.app/solar-roi/vs/${alternative}`,
        }
    };
}

export default async function SolarComparisonPage({ params }: { params: Promise<{ alternative: string }> }) {
    const { alternative } = await params;
    const altName = alternative.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    // Default context
    const cityData = await getCityData('delhi');
    if (!cityData) notFound();

    // Specific content logic
    const comparisonContent = {
        'grid': "Grid electricity prices are rising by 5-8% annually. While the grid offers convenience, Solar locks in your energy cost near zero for 25 years.",
        'diesel-generator': "Diesel generators cost ₹16-20 per unit compared to Solar's effective cost of ₹2-3 per unit. Solar is the clear winner for daytime loads.",
        'coal': "Coal power is the biggest polluter. Switching to solar reduces your carbon footprint significantly while saving money.",
        'wind': "Wind energy is great for utility scale, but for residential rooftops, Solar PV is far more practical, consistent, and easier to maintain.",
        'hydro': "Hydro power is clean but location-dependent. Solar can be installed right on your roof, making it the ultimate decentralized energy solution."
    }[alternative] || "Compare Solar vs alternative energy sources.";

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                        Head to Head
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Solar vs <span className="text-red-500">{altName}</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        The ultimate cost breakdown. Does it make financial sense to switch?
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
                            <h2 className="text-2xl font-bold mb-4">The Verdict</h2>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                {comparisonContent}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                            <h3 className="font-bold text-lg mb-4 border-b pb-2">Calculate Your Solar Advantage</h3>
                            <SolarForm cityData={cityData} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Why Solar Wins</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2 text-emerald-700">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 25-Year Warranty
                                </li>
                                <li className="flex items-center gap-2 text-emerald-700">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Inflation Proof
                                </li>
                                <li className="flex items-center gap-2 text-emerald-700">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Tax Benefits
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
