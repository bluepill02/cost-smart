"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe } from 'lucide-react';
import { ExchangeRates } from '@/lib/currency-api';

interface RateTrackerProps {
    rates: ExchangeRates | null;
}

const TRACKED_PAIRS = [
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
];

export default function RateTracker({ rates }: RateTrackerProps) {
    if (!rates) return null;

    return (
        <div className="w-full bg-white border-y border-slate-100 py-6 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 md:mb-0">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Globe size={16} /> Market Watch (Base: USD)
                    </h3>
                    <Link href="/currency" className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1">
                        View All Rates <ArrowUpRight size={12} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {TRACKED_PAIRS.map(pair => {
                        const rate = rates.rates[pair.code];
                        return (
                            <Link href={`/currency?to=${pair.code}`} key={pair.code} className="group">
                                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 group-hover:border-emerald-200 transition-colors">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-slate-700">{pair.code}</span>
                                        <span className="text-xs text-slate-400">{pair.name}</span>
                                    </div>
                                    <div className="text-lg font-mono font-semibold text-slate-900">
                                        {rate?.toFixed(4)}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
