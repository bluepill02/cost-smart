"use client";

import React, { ReactNode } from 'react';
import AdContainer from './AdContainer';

interface ResultsWithAdsProps {
  children: ReactNode;
  adSlotId: string;
  calculatorName?: string;
}

/**
 * Wrapper component that places calculator results with an integrated native ad.
 * The ad is positioned after the chart/results for peak engagement (5-10 sec user attention).
 * Prevents CLS with fixed ad heights matching AdContainer standards.
 */
export default function ResultsWithAds({
  children,
  adSlotId,
}: ResultsWithAdsProps) {
  return (
    <div className="w-full space-y-6">
      {/* Main Results/Chart Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        {children}
      </div>

      {/* Native Ad Slot - High Engagement Zone */}
      <div className="bg-gradient-to-b from-slate-50 to-white rounded-lg border border-slate-200 p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
          Sponsored Content
        </p>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <AdContainer slotId={adSlotId} size="square" />
          </div>
        </div>
      </div>
    </div>
  );
}
