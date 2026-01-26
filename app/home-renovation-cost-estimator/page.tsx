import React from 'react';
import { Metadata } from 'next';
import HomeRenovationCalculator from '@/components/calculators/real-estate/HomeRenovationCalculator';
import RelatedTools from '@/components/calculators/RelatedTools';
import AdContainer from '@/components/ads/AdContainer';

export const metadata: Metadata = {
  title: 'Home Renovation Cost Estimator India | Painting, Flooring, Plumbing Rates',
  description: 'Calculate the estimated cost of renovating your home in India. Get detailed pricing for painting, flooring, plumbing, electrical, and full home makeovers.',
  alternates: {
    canonical: 'https://costsmart.app/home-renovation-cost-estimator',
  },
};

export default function HomeRenovationPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 text-center">
          Home Renovation Cost Estimator
        </h1>
        <p className="text-lg text-slate-600 mb-8 text-center max-w-2xl mx-auto">
          Planning a makeover? Estimate the budget for your home renovation project, including painting, flooring, and civil work.
        </p>

        <AdContainer slotId="1475703853" className="mb-8 h-[90px]" />

        <div className="max-w-4xl mx-auto">
          <HomeRenovationCalculator />
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <RelatedTools currentTool="loan" />
        </div>
      </div>
    </div>
  );
}
