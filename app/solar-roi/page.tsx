
import Link from 'next/link';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Select Your City - Solar ROI Calculator',
    description: 'Find your city to calculate accurate solar savings. Calculate payback periods, tax credits, and 20-year savings.'
};

interface SolarData {
    city_name: string;
    country: string;
}

function getCities(): SolarData[] {
    try {
        const filePath = path.join(process.cwd(), 'code_block.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        // Return top 60 cities (mixed USA/India)
        const allData = JSON.parse(fileContents);
        // Simple filter for variety or just first 60?
        // Let's take all of them if not too huge? 300 is fine for a page.
        // Actually showing all 300 is good for SEO internal linking.
        return allData;
    } catch {
        return [];
    }
}

export default function SolarLandingPage() {
    const cities = getCities();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Select Your City</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    We've modeled solar potential for {cities.length} cities.
                    Select yours to see your personalized savings report.
                </p>
            </div>

            {/* Quick Link to Top City if user is lazy */}
            <div className="flex justify-center mb-12">
                <Link
                    href="/solar-roi/New-York"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-emerald-700 transition"
                >
                    View Example: New York <ArrowRight size={18} />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities.map((city) => (
                    <Link
                        key={city.city_name}
                        href={`/solar-roi/${city.city_name}`}
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
