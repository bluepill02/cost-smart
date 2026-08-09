import React from 'react';
// import MarketTicker from '@/components/features/MarketTicker';
import DashboardHistory from '@/components/features/DashboardHistory';
import ProAnalyticsPreview from '@/components/premium/ProAnalyticsPreview';
import ProInsightTeaser from '@/components/premium/ProInsightTeaser';
import { LayoutDashboard } from 'lucide-react';


export const metadata = {
  title: 'My Finance Hub - Track & Compare Financial Scenarios | CostSmart',
  description: 'Track saved calculation scenarios, compare financial options, and access real-time market data. Your personal finance dashboard for EMI, SIP, tax, and loan calculations.',
  alternates: { canonical: '/dashboard' },
  openGraph: {
    title: 'My Finance Hub - Track & Compare Financial Scenarios | CostSmart',
    description: 'Track saved calculation scenarios, compare financial options, and access real-time market data. Your personal finance dashboard for EMI, SIP, tax, and loan calculations.',
  },
};

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            {/* JSON-LD WebPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'My Finance Hub',
                    description: 'Track saved calculation scenarios, compare financial options, and access real-time market data.',
                    url: 'https://cost-smart-five.vercel.app/dashboard',
                }) }}
            />
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

                {/* Temporarily disabled until yahoo-finance2 package is installed
                <Suspense fallback={<div className="h-24 bg-slate-100 rounded-lg animate-pulse mb-8" />}>
                    <MarketTicker />
                </Suspense>
                */}

                <DashboardHistory />

                {/* Pro Analytics Section */}
                <div className="mt-12 border-t border-slate-200 pt-10">
                    <ProInsightTeaser />

                    <div className="mt-10">
                        <ProAnalyticsPreview />
                    </div>
                </div>
            </div>
        </div>
    );
}
