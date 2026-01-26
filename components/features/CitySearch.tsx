'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface City {
    city_name: string;
    country: string;
}

interface CitySearchProps {
    cities: City[];
}

export function CitySearch({ cities }: CitySearchProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const processedCities = useMemo(() => {
        return cities.map(city => ({
            ...city,
            lower_city_name: city.city_name.toLowerCase(),
            lower_country: city.country.toLowerCase(),
        }));
    }, [cities]);

    const filteredCities = useMemo(() => {
        if (!searchQuery) return processedCities;
        const lowerQuery = searchQuery.toLowerCase();
        return processedCities.filter(city =>
            city.lower_city_name.includes(lowerQuery) ||
            city.lower_country.includes(lowerQuery)
        );
    }, [processedCities, searchQuery]);

    return (
        <div>
            <div className="max-w-md mx-auto mb-10 relative">
                <Label htmlFor="city-search" className="sr-only">Search City</Label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <Input
                        id="city-search"
                        type="search"
                        placeholder="Search for your city..."
                        className="pl-10 h-12 text-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {filteredCities.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-500 text-lg">No cities found matching &quot;{searchQuery}&quot;</p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="mt-4 text-emerald-600 font-medium hover:underline"
                    >
                        Clear Search
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCities.map((city) => (
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
            )}
        </div>
    );
}
