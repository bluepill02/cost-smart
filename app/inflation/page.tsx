import { Metadata } from 'next';
import InflationCalculator from '@/components/calculators/inflation/InflationCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Inflation Calculator (CPI) | US Dollar Value 1913-2024',
    description: 'Calculate the value of the US Dollar over time. See how much purchasing power has changed using official BLS CPI data.',
    alternates: {
        canonical: 'https://costsmart.app/inflation',
    }
};

export default function InflationPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="text-center mb-10 space-y-4">
                 <div className="flex justify-center">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                        <TrendingUp size={12} /> Economic Education
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Inflation <span className="text-emerald-600">Time Machine</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    What was $100 worth the year you were born? Use official CPI data to calculate purchasing power changes over the last century.
                </p>
            </div>

            <InflationCalculator />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">How Inflation Works</h2>
                    <p>
                        Inflation represents the rate at which the general level of prices for goods and services is rising.
                        As inflation rises, every dollar you own buys a smaller percentage of a good or service.
                    </p>
                    <h3 className="font-bold text-slate-900">About the Data</h3>
                    <p>
                        This calculator uses the <strong>Consumer Price Index for All Urban Consumers (CPI-U)</strong>, provided by the U.S. Bureau of Labor Statistics (BLS).
                        It is the most widely used measure of inflation in the United States.
                    </p>
                </div>

                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>
        </div>
    );
}
