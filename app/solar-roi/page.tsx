
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getAllCities } from '@/lib/solar-data';
import { CitySearch } from '@/components/features/CitySearch';

export const metadata: Metadata = {
    title: 'Select Your City - Solar ROI Calculator',
    description: 'Find your city to calculate accurate solar savings. Calculate payback periods, tax credits, and 20-year savings.',
    alternates: {
        canonical: 'https://cost-smart-five.vercel.app/solar-roi',
    }
};

export default async function SolarLandingPage() {
    const cities = await getAllCities();
    const featuredCity = cities.length > 0 ? cities[0] : null;

    return (
        <div className="container mx-auto px-4 py-12 bg-slate-50 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Select Your City</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    We&apos;ve modeled solar potential for {cities.length} cities across the US and India.
                    Select yours to see your personalized savings report.
                </p>
            </div>

            {/* Quick Link to Top City if user is lazy */}
            {featuredCity && (
                <div className="flex justify-center mb-10">
                    <Link
                        href={`/solar-roi/${featuredCity.city_name.replace(/ /g, '-')}`}
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                    >
                        View Example: {featuredCity.city_name} <ArrowRight size={20} />
                    </Link>
                </div>
            )}

            <CitySearch cities={cities} />
        </div>
    );
}
