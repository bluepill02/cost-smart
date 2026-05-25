"use client";

import { useState, useEffect } from 'react';
import { useAdBlockDetected } from '@/lib/hooks/useAdBlockDetector';
import { useProStatus } from '@/lib/hooks/useProStatus';
import Link from 'next/link';
import { Shield, Sparkles, ExternalLink } from 'lucide-react';

interface AdBlockRecoveryProps {
  calculatorSlug?: string;
  size?: 'banner' | 'rectangle' | 'inline';
}

export default function AdBlockRecovery({ calculatorSlug, size = 'rectangle' }: AdBlockRecoveryProps) {
  const adBlocked = useAdBlockDetected();
  const { isPro } = useProStatus();
  const [variant, setVariant] = useState<'pro' | 'affiliate'>('pro');

  useEffect(() => {
    setVariant(Date.now() % 2 === 0 ? 'pro' : 'affiliate');
  }, []);

  // Don't show anything if ads aren't blocked or user is Pro
  if (!adBlocked || isPro) return null;

  if (variant === 'pro') {
    return (
      <div className={`rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-slate-50 p-5 text-center ${size === 'banner' ? 'py-4' : 'py-6'}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-semibold text-slate-900">Go Ad-Free with Pro</span>
        </div>
        <p className="text-xs text-slate-600 mb-3">
          Get PDF exports, advanced AI insights, and a clean ad-free experience for just $4.99/month.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Upgrade to Pro
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    );
  }

  // Show contextual affiliate recommendation
  return (
    <div className="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-slate-50 p-5 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Shield className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-semibold text-slate-900">Recommended for You</span>
      </div>
      <p className="text-xs text-slate-600 mb-3">
        We noticed you&apos;re using an ad blocker. We rely on ads to keep this tool free.
        Consider supporting us by checking out these recommended resources:
      </p>
      <Link
        href="/recommended-tools"
        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
      >
        View Recommended Tools
        <ExternalLink className="w-3 h-3" />
      </Link>
    </div>
  );
}
