import React, { Suspense } from 'react';
import MarketTicker from '@/components/features/MarketTicker';
import DashboardHistory from '@/components/features/DashboardHistory';
import { LayoutDashboard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
    title: 'My Finance Hub - CostSmart',
    description: 'Track your saved scenarios and view real-time market data.',
};

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            <LayoutDashboard className="w-8 h-8 text-emerald-600" />
                            My Finance Hub
                        </h1>
                        <p className="text-slate-500 mt-1">Your saved scenarios and recent calculations.</p>
                    </div>
                </div>

                <Suspense fallback={<div className="h-24 bg-slate-100 rounded-lg animate-pulse mb-8" />}>
                    <MarketTicker />
                </Suspense>

                <DashboardHistory />
            </div>
        </div>
    );
}
