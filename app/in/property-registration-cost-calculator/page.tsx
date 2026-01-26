import React from 'react';
import { Metadata } from 'next';
import PropertyRegistrationCalculator from '@/components/calculators/real-estate/PropertyRegistrationCalculator';
import RelatedTools from '@/components/calculators/RelatedTools';
import AdContainer from '@/components/ads/AdContainer';

export const metadata: Metadata = {
  title: 'Property Registration Charges Calculator India | State-wise Fees 2025',
  description: 'Calculate property registration charges and stamp duty for Maharashtra, Karnataka, Tamil Nadu, UP, and other Indian states. Accurate 2025 fee structure.',
  alternates: {
    canonical: 'https://costsmart.app/in/property-registration-cost-calculator',
  },
};

export default function PropertyRegistrationPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 text-center">
          Property Registration Charges Calculator
        </h1>
        <p className="text-lg text-slate-600 mb-8 text-center max-w-2xl mx-auto">
          Buying a new home? Calculate the exact government registration fees and stamp duty for your state.
        </p>

        <AdContainer slotId="1475703853" className="mb-8 h-[90px]" />

        <div className="max-w-4xl mx-auto">
          <PropertyRegistrationCalculator />
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <RelatedTools currentTool="loan" />
        </div>
      </div>
    </div>
  );
}
