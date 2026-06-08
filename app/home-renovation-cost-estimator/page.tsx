import React from 'react';
import { Metadata } from 'next';
import HomeRenovationCalculator from '@/components/calculators/real-estate/HomeRenovationCalculator';
import RelatedTools from '@/components/calculators/RelatedTools';
import AdContainer from '@/components/ads/AdContainer';
import AmazonRecommendations from '@/components/affiliate/AmazonRecommendations';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'Home Renovation Cost Estimator India | CostSmart',
  description: 'Calculate the estimated cost of renovating your home in India. Get detailed pricing for painting, flooring, plumbing, electrical, and full home makeovers.',
  alternates: {
    canonical: '/home-renovation-cost-estimator',
  },
  openGraph: {
    title: 'Home Renovation Cost Estimator India | CostSmart',
    description: 'Calculate the estimated cost of renovating your home in India. Get detailed pricing for painting, flooring, plumbing, electrical, and full home makeovers.',
    url: `${CANONICAL_DOMAIN}/home-renovation-cost-estimator`,
    type: 'website',
  },
};

export default function HomeRenovationPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <CalculatorSchemaInjector calculatorName="Home Renovation Cost Estimator" calculatorDescription="Calculate the estimated cost of renovating your home in India." urlPath="/home-renovation-cost-estimator" calculatorType="property" />
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

        <div className="max-w-4xl mx-auto">
          <AmazonRecommendations calculatorSlug="home-renovation" />
        </div>
      </div>
    </div>
  );
}
