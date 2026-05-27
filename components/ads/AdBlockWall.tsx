"use client";

import { ShieldAlert, RefreshCw, Crown } from 'lucide-react';
import { useAdBlockDetected } from '@/lib/hooks/useAdBlockDetector';
import { useProStatus } from '@/lib/hooks/useProStatus';
import Link from 'next/link';

export default function AdBlockWall() {
  const adBlocked = useAdBlockDetected();
  const { isPro, isLoading } = useProStatus();

  // Don't show for Pro users or while loading
  if (!adBlocked || isPro || isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      style={{ pointerEvents: 'all' }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="adblock-wall-heading"
      aria-describedby="adblock-wall-description"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 my-8">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7 text-amber-600" />
          </div>
        </div>

        {/* Heading */}
        <h2
          id="adblock-wall-heading"
          className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-3"
        >
          Please Support Us by Disabling Your Ad Blocker
        </h2>

        {/* Description */}
        <p
          id="adblock-wall-description"
          className="text-sm sm:text-base text-slate-600 text-center mb-6 leading-relaxed"
        >
          We keep all 30+ financial calculators completely free. Ads are how we pay for servers,
          data, and development. We promise our ads are non-intrusive and never slow down your
          experience.
        </p>

        {/* Instructions */}
        <div className="bg-slate-50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-sm font-semibold text-slate-800 mb-3">
            How to disable your ad blocker:
          </p>
          <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
            <li>Click the ad blocker icon in your browser toolbar</li>
            <li>Select &quot;Pause&quot; or &quot;Disable on this site&quot;</li>
            <li>Refresh the page</li>
          </ol>
        </div>

        {/* Check Again button */}
        <button
          onClick={() => window.location.reload()}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm sm:text-base"
        >
          <RefreshCw className="w-4 h-4" />
          I&apos;ve Disabled It - Check Again
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium uppercase">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Pro alternative */}
        <Link
          href="/pricing"
          className="w-full flex items-center justify-center gap-2 border-2 border-amber-400 hover:bg-amber-50 text-amber-700 font-semibold py-3 px-6 rounded-xl transition-colors text-sm sm:text-base"
        >
          <Crown className="w-4 h-4" />
          Go Pro for an Ad-Free Experience
        </Link>
      </div>
    </div>
  );
}
