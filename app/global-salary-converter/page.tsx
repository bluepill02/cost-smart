import React from 'react';
import { Metadata } from 'next';
import PPPCalculator from '@/components/calculators/PPPCalculator';
import AdContainer from '@/components/ads/AdContainer';
import RelatedTools from '@/components/layouts/RelatedTools';

export const metadata: Metadata = {
    title: 'Global Salary Converter - Purchasing Power Parity (PPP)',
    description: 'Calculate the true value of your salary in different countries based on Purchasing Power Parity (PPP). Compare cost of living adjusted income.',
};

export default function GlobalSalaryPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        True Salary Worth <span className="text-emerald-600">Calculator</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Don&apos;t just convert currency. Compare your purchasing power across the globe to see what your salary is really worth.
                    </p>
                </div>

                <div className="mb-12">
                     <PPPCalculator />
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="prose text-slate-600">
                        <h3>Why Exchange Rates Lie</h3>
                        <p>
                            A standard currency converter tells you how much money you get if you exchange cash at a bank.
                            But it doesn&apos;t tell you what that money can <em>buy</em>.
                            Prices for rent, food, and healthcare vary wildly between countries.
                        </p>
                        <p>
                            <strong>Purchasing Power Parity (PPP)</strong> solves this by comparing the cost of a standard "basket of goods"
                            in different countries. This tool uses World Bank PPP data to give you a realistic salary comparison.
                        </p>
                    </div>
                    <div>
                        <AdContainer size="rectangle" slotId="847562910" />
                    </div>
                </div>
            </div>

            <RelatedTools currentTool="currency" />
        </div>
    );
}
