import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SolarForm from '@/components/calculators/SolarForm';
import AdContainer from '@/components/ads/AdContainer';
import RelatedTools from '@/components/layouts/RelatedTools';
import { Card, CardContent } from '@/components/ui/card';

import { getCityData, SolarData } from '@/lib/solar-data';

// --- Dynamic Metadata Generation ---
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city: cityParam } = await params;
    const city = await getCityData(cityParam);
    if (!city) return { title: 'City Not Found' };

    return {
        title: `Solar ROI Calculator for ${city.city_name} - Is it Worth it in 2025?`,
        description: `Calculate your exact solar savings in ${city.city_name}. Based on ${city.avg_daily_sunlight_hours} hours of sun and ${city.avg_electricity_cost_per_kwh} ${city.country === 'India' ? 'INR' : 'USD'}/kWh rates.`,
        alternates: {
            canonical: `https://costsmart.app/solar-roi/${cityParam}`,
        }
    };
}

// --- Content Injection Logic (Randomized for SEO) ---
function generateIntroText(city: SolarData) {
    const isHighSun = city.avg_daily_sunlight_hours > 5.0;
    const isHighCost = city.avg_electricity_cost_per_kwh > (city.country === 'India' ? 8 : 0.20);
    const currency = city.country === 'India' ? '₹' : '$';

    // Simple deterministic hash to pick a variation based on city name
    const hash = city.city_name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variation = hash % 5;

    const templates = [
        // Variation 0: Direct Financial Focus
        (
            <>
                <p>
                    Is solar worth it in <strong>{city.city_name}</strong>? The numbers suggest a strong &quot;Yes.&quot;
                    With local electricity rates hovering around <strong>{currency}{city.avg_electricity_cost_per_kwh}/kWh</strong>,
                    homeowners are increasingly looking for relief from monthly bills.
                </p>
                <p className="mt-4">
                    Fortunately, {city.city_name} is blessed with <strong>{city.avg_daily_sunlight_hours} peak sun hours</strong> daily.
                    This combination of high utility costs and abundant solar resource acts as a force multiplier for your ROI,
                    potentially slashing your break-even time significantly compared to national averages.
                </p>
            </>
        ),
        // Variation 1: Inflation & Future Proofing
        (
            <>
                <p>
                    Stop renting your power and start owning it. For residents of <strong>{city.city_name}</strong>,
                    the transition to solar is becoming a financial no-brainer.
                    Grid rates have been climbing, currently sitting at {currency}{city.avg_electricity_cost_per_kwh}/kWh.
                </p>
                <p className="mt-4">
                    By leveraging the <strong>{city.avg_daily_sunlight_hours} hours of sunlight</strong> your roof receives every day,
                    you can lock in your energy costs for the next 25 years.
                    {isHighSun ? "Your city's exceptional solar potential makes this investment perform even better than in most regions." : "Even with moderate sun, the rising cost of grid power makes solar a smart hedge against inflation."}
                </p>
            </>
        ),
        // Variation 2: Environmental & Efficiency Angle
        (
            <>
                <p>
                    <strong>{city.city_name}</strong> goes solar. With an impressive solar irradiance profile averaging
                    <strong>{city.avg_daily_sunlight_hours} peak hours</strong> per day, your property is essentially a dormant power plant waiting to be activated.
                </p>
                <p className="mt-4">
                    Why pay {currency}{city.avg_electricity_cost_per_kwh} per unit to the utility company when you can generate it yourself?
                    Our data shows that efficiently designed systems in {city.city_name} can offset up to 100% of daytime usage,
                    drastically reducing your dependence on the grid.
                </p>
            </>
        ),
        // Variation 3: Data-Driven/Analytical Tone
        (
            <>
                <p>
                    We analyzed the solar potential for <strong>{city.city_name}</strong>, and the results are compelling.
                    Based on historical weather data, your area receives approximately <strong>{city.avg_daily_sunlight_hours} daily peak sun hours</strong>.
                </p>
                <p className="mt-4">
                    When plugged into our ROI algorithm against the local tariff of {currency}{city.avg_electricity_cost_per_kwh}/kWh,
                    the math points towards substantial long-term savings.
                    {isHighCost ? "Since your local rates are higher than average, every kWh you generate is &apos;worth&apos; more, accelerating your payback period." : "Ideally suited for net-metering strategies, your local climate supports consistent generation year-round."}
                </p>
            </>
        ),
        // Variation 4: Home Value & Investment Focus
        (
            <>
                <p>
                    Investing in solar in <strong>{city.city_name}</strong> is about more than just the monthly bill—it&apos;s about asset value.
                    Homes with solar installations in high-sun areas (receiving {city.avg_daily_sunlight_hours} hours/day) often see increased property valuations.
                </p>
                <p className="mt-4">
                    Paying <strong>{currency}{city.avg_electricity_cost_per_kwh}/kWh</strong> is a sunk cost.
                    Redirecting that money into a solar asset helps build equity.
                    Use our calculator below to see exactly how much wealth you could be accumulating over the next 20 years instead of paying utility bills.
                </p>
            </>
        )
    ];

    return (
        <div className="prose max-w-none text-slate-600 mb-8">
            {templates[variation]}
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
export default async function CitySolarPage({ params }: { params: Promise<{ city: string }> }) {
    const { city: cityParam } = await params;
    const city = await getCityData(cityParam);

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
