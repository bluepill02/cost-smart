"use client";

import { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { useAdBlockDetected } from '@/lib/hooks/useAdBlockDetector';
import { useProStatus } from '@/lib/hooks/useProStatus';

export default function SoftAdBlockMessage() {
  const adBlocked = useAdBlockDetected();
  const { isPro } = useProStatus();
  const [dismissed, setDismissed] = useState(true); // Start hidden

  useEffect(() => {
    if (!adBlocked || isPro) return;
    // Only show once per session
    const shown = sessionStorage.getItem('costsmart_adblock_notice');
    if (!shown) {
      setDismissed(false);
      sessionStorage.setItem('costsmart_adblock_notice', '1');
    }
  }, [adBlocked, isPro]);

  if (dismissed || !adBlocked || isPro) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-4 fade-in">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 mb-1">
              We noticed you&apos;re using an ad blocker
            </p>
            <p className="text-xs text-slate-600">
              Our calculators are free thanks to ads. Consider disabling your ad blocker or{' '}
              <a href="/pricing" className="text-emerald-600 font-medium hover:underline">
                upgrading to Pro
              </a>{' '}
              for an ad-free experience.
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-600 flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
