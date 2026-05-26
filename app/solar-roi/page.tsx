
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, MapPin, Globe, Sparkles } from 'lucide-react';
import { CitySearch } from '@/components/features/CitySearch';
import { INDIAN_CITIES } from '@/lib/pseo-data/cities';
import { US_CITIES } from '@/lib/pseo-data/us-cities';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
    title: 'Select Your City - Solar ROI Calculator',
    description: 'Find your city to calculate accurate solar savings. Get payback period, panel capacity, and 20-year savings based on local irradiance and electricity rates.',
    alternates: {
        canonical: 'https://cost-smart-five.vercel.app/solar-roi',
    }
};

export default async function SolarLandingPage() {
    // Sort cities by tier then name
    const cities = [...INDIAN_CITIES].sort((a, b) => {
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.name.localeCompare(b.name);
    });

    const tier1 = cities.filter(c => c.tier === 1);
    const tier2 = cities.filter(c => c.tier === 2);

    return (
        <div className="container mx-auto px-4 py-12 bg-slate-50 min-h-screen">
            <AdContainer className="mb-12" slotId="1475703853" />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Select Your City</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Calculate your exact solar ROI based on local irradiance, electricity rates, and subsidies.
                    We cover major cities in the USA and India.
                </p>
            </div>

            {/* Quick Link to Top City if user is lazy */}
            <div className="flex justify-center mb-16">
                <Link
                    href={`/solar-roi/los-angeles`}
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                    View Example: Los Angeles <ArrowRight size={20} />
                </Link>
            </div>

            {/* CTA: Analyze Your Exact Rooftop */}
            <div className="max-w-3xl mx-auto mb-16 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-8 text-center shadow-md">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="text-emerald-600" size={24} />
                    <h2 className="text-2xl font-bold text-slate-900">Want Data for YOUR Exact Roof?</h2>
                    <Badge className="bg-emerald-600 text-white">NEW</Badge>
                </div>
                <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                    Get personalized solar analysis for your exact rooftop using Google Solar API.
                    Enter any address and see panel layout, energy output, and savings tailored to your home.
                </p>
                <Link
                    href="/solar-roi/analyze"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                    Analyze Your Rooftop <ArrowRight size={20} />
                </Link>
            </div>

            <div className="max-w-6xl mx-auto space-y-12">

                {/* US Cities - Primary Display */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <Globe className="text-emerald-500" /> United States
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {US_CITIES.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/solar-roi/${city.slug}`}
                                className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-lg p-4 text-center transition-colors shadow-sm hover:shadow-md group"
                            >
                                <div className="font-bold text-slate-800 text-lg group-hover:text-emerald-700">{city.city_name}</div>
                                <div className="text-sm text-slate-500 mt-1 font-medium">{city.state}</div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* India Cities - All Tiers */}
                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <MapPin className="text-orange-500" /> India — Solar by City
                    </h2>

                    {tier1.length > 0 && (
                        <>
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Major Cities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
                                {tier1.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/solar-roi/${city.slug}`}
                                        className="bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-md p-3 text-center transition-colors text-sm shadow-sm"
                                    >
                                        <div className="font-medium text-slate-700">{city.name}</div>
                                        <div className="text-xs text-slate-400">{city.state}</div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {tier2.length > 0 && (
                        <>
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Other Cities</h3>
                            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2">
                                {tier2.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/solar-roi/${city.slug}`}
                                        className="bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 rounded px-2 py-1.5 text-center transition-colors"
                                    >
                                        <div className="text-xs font-medium text-slate-600">{city.name}</div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </section>

            </div>
        </div>
    );
}
