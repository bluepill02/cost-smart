import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SolarForm from '@/components/calculators/SolarForm';
import AdContainer from '@/components/ads/AdContainer';
import RelatedTools from '@/components/layouts/RelatedTools';
import { getCityData } from '@/lib/solar-data';
import { INDIAN_CITIES } from '@/lib/pseo-data/cities';

// --- Static Params Generation (Combinatorial) ---
// 50 cities * 6 sizes = 300 pages
export async function generateStaticParams() {
    const sizes = ['500', '1000', '1500', '2000', '3000', '5000'];
    const params = [];

    for (const city of INDIAN_CITIES) {
        for (const size of sizes) {
            params.push({
                city: city.slug,
                'roof-size': size
            });
        }
    }

    return params;
}

// --- Dynamic Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ city: string, 'roof-size': string }> }): Promise<Metadata> {
    const { city: cityParam, 'roof-size': size } = await params;
    const city = await getCityData(cityParam);
    if (!city) return { title: 'Page Not Found' };

    return {
        title: `Solar ROI for ${size} sq ft Roof in ${city.city_name} - Detailed Report`,
        description: `How much can you save with a ${size} sq ft solar installation in ${city.city_name}? Calculate generation, cost, and subsidies in ${city.state}.`,
        alternates: {
            canonical: `https://costsmart.app/solar-roi/${cityParam}/${size}`,
        }
    };
}

export default async function CombinatorialPage({ params }: { params: Promise<{ city: string, 'roof-size': string }> }) {
    const { city: cityParam, 'roof-size': size } = await params;
    const city = await getCityData(cityParam);
    const roofArea = parseInt(size);

    if (!city || isNaN(roofArea)) {
        notFound();
    }

    const potentialCapacity = Math.floor(roofArea / 100);
    const estimatedCost = potentialCapacity * city.solar_installation_cost_per_kw * 1000;

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                        Solar Potential for <span className="text-emerald-600">{size} sq ft</span> Roof in {city.city_name}
                    </h1>
                    <p className="text-lg text-slate-600">
                        A {size} sq ft roof in {city.city_name} receives {city.avg_daily_sunlight_hours} hours of peak sun daily.
                        This is a prime candidate for a <strong>{potentialCapacity} kW</strong> system.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                            <SolarForm cityData={city} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Location Analysis</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500">City</span>
                                    <span className="font-medium">{city.city_name}</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500">Available Area</span>
                                    <span className="font-medium">{size} sq ft</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500">Max Capacity</span>
                                    <span className="font-bold text-emerald-600">{potentialCapacity} kW</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500">Est. Cost</span>
                                    <span className="font-medium">~₹{(estimatedCost/100000).toFixed(1)} Lakhs</span>
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
