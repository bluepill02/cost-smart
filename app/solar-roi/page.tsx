
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, MapPin, Globe } from 'lucide-react';
import { CitySearch } from '@/components/features/CitySearch';
import { INDIAN_CITIES } from '@/lib/pseo-data/cities';
import { US_CITIES } from '@/lib/pseo-data/us-cities';
import AdContainer from '@/components/ads/AdContainer';

export const metadata: Metadata = {
    title: 'Select Your City - Solar ROI Calculator',
    description: 'Find your city to calculate accurate solar savings. Calculate payback periods, tax credits, and 20-year savings.',
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

                {/* International / Other Regions (Collapsed or Secondary) */}
                <section className="opacity-70 hover:opacity-100 transition-opacity">
                    <h2 className="text-xl font-bold text-slate-600 mb-6 border-b border-slate-200 pb-2 flex items-center gap-2">
                        <MapPin className="text-slate-400" /> International Locations
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {tier1.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/solar-roi/${city.slug}`}
                                className="bg-slate-50 hover:bg-white border border-slate-100 hover:border-emerald-200 rounded-md p-3 text-center transition-colors text-sm"
                            >
                                <div className="font-medium text-slate-700">{city.name}</div>
                                <div className="text-xs text-slate-400">{city.state}, India</div>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
