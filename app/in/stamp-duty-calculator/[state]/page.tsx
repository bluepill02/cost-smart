import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import StampDutyCalculator from '@/components/calculators/real-estate/StampDutyCalculator';
import AdContainer from '@/components/ads/AdContainer';
import RelatedTools from '@/components/layouts/RelatedTools';
import { INDIAN_STATES_STAMP_DUTY } from '@/lib/pseo-data/stamp-duty';

// --- Static Params Generation ---
export async function generateStaticParams() {
    return INDIAN_STATES_STAMP_DUTY.map((s) => ({
        state: s.slug,
    }));
}

// --- Dynamic Metadata Generation ---
export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
    const { state: stateParam } = await params;
    const stateData = INDIAN_STATES_STAMP_DUTY.find(s => s.slug === stateParam);
    if (!stateData) return { title: 'State Not Found' };

    return {
        title: `Stamp Duty Calculator ${stateData.state} (2025) - Calculate Registration Charges`,
        description: `Calculate stamp duty and registration charges for property in ${stateData.state}. Current Rate: ${stateData.stampDutyRate}%. ${stateData.description}`,
        alternates: {
            canonical: `https://costsmart.app/in/stamp-duty-calculator/${stateParam}`,
        }
    };
}

export default async function StateStampDutyPage({ params }: { params: Promise<{ state: string }> }) {
    const { state: stateParam } = await params;
    const stateData = INDIAN_STATES_STAMP_DUTY.find(s => s.slug === stateParam);

    if (!stateData) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Stamp Duty in <span className="text-emerald-600">{stateData.state}</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Buying a property in {stateData.state}? Calculate the exact government fees you need to pay over and above the property cost.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
                            <StampDutyCalculator
                                defaultStampRate={stateData.stampDutyRate}
                                defaultRegRate={stateData.registrationRate}
                                stateName={stateData.state}
                            />
                        </div>

                        <div className="mt-12 prose max-w-none text-slate-600">
                            <h2>Property Registration in {stateData.state}</h2>
                            <p>
                                The current stamp duty rate in {stateData.state} is approximately <strong>{stateData.stampDutyRate}%</strong> of the property's market value.
                                {stateData.description}
                            </p>

                            <h3>Key Facts for {stateData.state} Homebuyers</h3>
                            <ul>
                                <li><strong>Stamp Duty:</strong> {stateData.stampDutyRate}%</li>
                                <li><strong>Registration Fee:</strong> {stateData.registrationRate}%</li>
                                {stateData.femaleConcession > 0 && (
                                    <li><strong>Women's Concession:</strong> {stateData.femaleConcession}% rebate available.</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <AdContainer size="rectangle" slotId="1475703853" />
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-2">Did you know?</h3>
                            <p className="text-sm text-blue-800">
                                Stamp duty charges are eligible for tax deduction under Section 80C of the Income Tax Act (up to ₹1.5 Lakhs).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentTool="loan" />
        </div>
    );
}
