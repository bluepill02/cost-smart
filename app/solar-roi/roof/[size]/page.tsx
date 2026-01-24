import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SolarForm from '@/components/calculators/SolarForm';
import AdContainer from '@/components/ads/AdContainer';
import RelatedTools from '@/components/layouts/RelatedTools';
import { getCityData } from '@/lib/solar-data';

// --- Static Params for Common Roof Sizes ---
export async function generateStaticParams() {
    const sizes = ['500', '1000', '1500', '2000', '3000', '5000'];
    return sizes.map((size) => ({
        size: size,
    }));
}

// --- Dynamic Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ size: string }> }): Promise<Metadata> {
    const { size } = await params;
    return {
        title: `Solar ROI for ${size} sq ft Roof - Calculation & Cost`,
        description: `How much solar power can a ${size} sq ft roof generate? Calculate installation cost, number of panels, and savings.`,
        alternates: {
            canonical: `https://costsmart.app/solar-roi/roof/${size}`,
        }
    };
}

export default async function RoofSizePage({ params }: { params: Promise<{ size: string }> }) {
    const { size } = await params;
    const roofArea = parseInt(size);

    if (isNaN(roofArea)) notFound();

    // Default to National Average Data for generic roof page
    const cityData = await getCityData('delhi'); // Using Delhi as proxy for "Average" stats or we could make a 'national' profile
    if (!cityData) notFound();

    // Estimate capacity: 1kW ~ 100 sq ft shadow-free area
    const potentialCapacity = Math.floor(roofArea / 100);

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Solar Potential for <span className="text-emerald-600">{size} sq ft</span> Roof
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        A {size} sq ft roof can typically accommodate a <strong>{potentialCapacity} kW</strong> solar system.
                        See the numbers below.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                            {/* Pre-fill the form with estimated capacity if possible, otherwise just render */}
                            <SolarForm cityData={cityData} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Quick Stats for {size} sq ft</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-slate-500">Max System Size</span>
                                    <span className="font-bold">~{potentialCapacity} kW</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-slate-500">Panel Count (400W)</span>
                                    <span className="font-bold">~{Math.ceil(potentialCapacity * 1000 / 400)} Panels</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-slate-500">Est. Generation</span>
                                    <span className="font-bold">~{potentialCapacity * 4} Units/Day</span>
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
