'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { useProStatus } from '@/lib/hooks/useProStatus';

const SESSION_KEY = 'costsmart_nudge_dismissed';

export default function StickyUpgradeNudge() {
  const { isPro, isLoading } = useProStatus();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(SESSION_KEY) === 'true';
    setDismissed(wasDismissed);
  }, []);

  if (isLoading || isPro || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-emerald-100 shadow-lg px-4 py-3">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <p className="text-sm text-slate-700 font-medium">
          Get a PDF report of this calculation + unlimited usage
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors"
          >
            Upgrade to Pro <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
