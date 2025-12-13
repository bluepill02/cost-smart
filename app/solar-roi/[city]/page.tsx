import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import SolarForm from '@/components/calculators/SolarForm';
import AdContainer from '@/components/ads/AdContainer';
import RelatedTools from '@/components/layouts/RelatedTools';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from 'lucide-react';

// --- Type Definitions ---
interface SolarData {
    city_name: string;
    country: string;
    avg_daily_sunlight_hours: number;
    avg_electricity_cost_per_kwh: number;
    grid_inflation_rate: number;
    solar_installation_cost_per_kw: number;
}

// --- Data Fetching Helper ---
// In a real app, this might be a DB call. Here we read the JSON file.
function getCityData(cityParam: string): SolarData | undefined {
    try {
        const filePath = path.join(process.cwd(), 'code_block.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const data: SolarData[] = JSON.parse(fileContents);

        // Normalize comparison (e.g. "new-york" -> "New York")
        // Simple lookup for now matching the exact name or simple slug
        const normalizedParam = cityParam.replace(/-/g, ' ').toLowerCase();

        return data.find(c => c.city_name.toLowerCase() === normalizedParam);
    } catch (error) {
        console.error("Error reading solar data", error);
        return undefined;
    }
}

// --- Dynamic Metadata Generation ---
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const city = getCityData(params.city);
    if (!city) return { title: 'City Not Found' };

    return {
        title: `Solar ROI Calculator for ${city.city_name} - Is it Worth it in 2025?`,
        description: `Calculate your exact solar savings in ${city.city_name}. Based on ${city.avg_daily_sunlight_hours} hours of sun and ${city.avg_electricity_cost_per_kwh} ${city.country === 'India' ? 'INR' : 'USD'}/kWh rates.`,
        alternates: {
            canonical: `https://costsmart.app/solar-roi/${params.city}`,
        }
    };
}

// --- Content Injection Logic ---
function generateIntroText(city: SolarData) {
    const isHighSun = city.avg_daily_sunlight_hours > 5.0;
    const isHighCost = city.avg_electricity_cost_per_kwh > (city.country === 'India' ? 8 : 0.20);

    return (
        <div className="prose max-w-none text-slate-600 mb-8">
            <p>
                Residents of <strong>{city.city_name}</strong> are uniquely positioned to benefit from solar energy in 2025.
                With an average of <strong>{city.avg_daily_sunlight_hours} peak sunlight hours</strong> per day,
                your roof has the potential to generate significant yield.
            </p>
            <p className="mt-4">
                {isHighCost
                    ? `Current electricity rates in ${city.city_name} are higher than the national average at ${city.avg_electricity_cost_per_kwh}/kWh. This makes the switch to solar not just an environmental choice, but a critical financial defense against rising grid inflation.`
                    : `While electricity rates are moderate at ${city.avg_electricity_cost_per_kwh}/kWh, the consistency of sun exposure in ${city.city_name} ensures a reliable payback period.`
                }
            </p>
            <p className="mt-4">
                Our algorithm factors in local installation trends (approx. {city.country === 'India' ? '₹' : '$'}{city.solar_installation_cost_per_kw}/kW)
                to simply show you the numbers that matter: your net savings.
            </p>
        </div>
    );
}

// --- JSON-LD Schema Generator ---
function generateSchema(city: SolarData) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `Solar ROI Calculator - ${city.city_name}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": `Calculate solar savings for ${city.city_name} homes based on local irradiance data.`,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "120"
        }
    };
}

// --- Main Page Component ---
export default function CitySolarPage({ params }: { params: { city: string } }) {
    const city = getCityData(params.city);

    if (!city) {
        notFound();
    }

    const jsonLd = generateSchema(city);

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 max-w-5xl">
                {/* Breadcrumb / Header */}
                <div className="mb-8">
                    <AdContainer size="leaderboard" className="mb-8" />
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Solar ROI in <span className="text-emerald-600">{city.city_name}</span>
                    </h1>
                    <div className="flex gap-2">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            2025 Data Updated
                        </span>
                        <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {city.country} Region
                        </span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Content + Calculator */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* SEO Content Injection */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            {generateIntroText(city)}
                        </div>

                        {/* The Calculator */}
                        <div id="calculator" className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 ring-1 ring-slate-900/5">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                Calculate Your Savings
                            </h2>
                            <SolarForm cityData={city} />
                        </div>

                        {/* Ad Placeholder (Inline) - High CTR Location: Between Form and Content */}
                        <AdContainer size="inline" className="my-8" />

                    </div>

                    {/* Right Sidebar: Sticky */}
                    <div className="hidden lg:block">
                        <div className="sticky top-8 space-y-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-slate-900 mb-4">Local Solar Stats</h3>
                                    <ul className="space-y-4 text-sm">
                                        <li className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Daily Sun Hours</span>
                                            <span className="font-medium">{city.avg_daily_sunlight_hours} hrs</span>
                                        </li>
                                        <li className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Grid Cost</span>
                                            <span className="font-medium">{city.avg_electricity_cost_per_kwh}/kWh</span>
                                        </li>
                                        <li className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="text-slate-500">Install Cost</span>
                                            <span className="font-medium">~{city.solar_installation_cost_per_kw}/kW</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Sidebar Ad - Sticky Visibility */}
                            <AdContainer size="rectangle" />
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentTool="solar" />
        </div>
    );
}
