
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getAllCities } from '@/lib/solar-data';

export const metadata: Metadata = {
    title: 'Select Your City - Solar ROI Calculator',
    description: 'Find your city to calculate accurate solar savings. Calculate payback periods, tax credits, and 20-year savings.'
};

export default async function SolarLandingPage() {
    const cities = await getAllCities();
    const featuredCity = cities.length > 0 ? cities[0] : null;

    return (
        <div className="container mx-auto px-4 py-12 bg-slate-50 min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Select Your City</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    We&apos;ve modeled solar potential for {cities.length} cities across the US and India.
                    Select yours to see your personalized savings report.
                </p>
            </div>

            {/* Quick Link to Top City if user is lazy */}
            {featuredCity && (
                <div className="flex justify-center mb-12">
                    <Link
                        href={`/solar-roi/${featuredCity.city_name.replace(/ /g, '-')}`}
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                    >
                        View Example: {featuredCity.city_name} <ArrowRight size={20} />
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities.map((city) => (
                    <Link
                        key={city.city_name}
                        href={`/solar-roi/${city.city_name.replace(/ /g, '-')}`}
                        className="p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md hover:bg-emerald-50/30 transition-all text-center group"
                    >
                        <span className="font-medium text-slate-700 group-hover:text-emerald-700 block truncate">
                            {city.city_name}
                        </span>
                        <span className="text-xs text-slate-400 uppercase tracking-wide">
                            {city.country}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
