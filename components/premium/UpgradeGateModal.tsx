'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, Check } from 'lucide-react';
import { PRO_FEATURES } from '@/lib/pro-features';

interface UpgradeGateModalProps {
  featureName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeGateModal({
  featureName,
  isOpen,
  onClose,
}: UpgradeGateModalProps) {
  const feature = PRO_FEATURES[featureName];

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'upgrade_gate_shown', {
        feature_name: featureName,
      });
    }
  }, [isOpen, featureName]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const displayName = feature?.name ?? featureName;
  const description =
    feature?.description ??
    'Upgrade to CostSmart Pro to unlock this premium feature.';
  const benefits = feature?.benefits ?? [
    'Unlimited access to all Pro features',
    'Priority customer support',
    'Ad-free experience',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-emerald-900/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{
          background:
            'linear-gradient(135deg, #0A0F1E 0%, #0d1a2d 50%, #0A0F1E 100%)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
              CostSmart Pro
            </span>
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            Unlock {displayName}
          </h2>

          <p className="text-sm text-slate-300 mb-6">{description}</p>

          {/* Benefits */}
          <ul className="space-y-3 mb-6">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-200">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Pricing */}
          <div className="text-center mb-6">
            <span className="text-3xl font-bold text-white">$4.99</span>
            <span className="text-sm text-slate-400">/month</span>
          </div>

          {/* CTA */}
          <Link
            href="/pricing"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'upgrade_gate_cta_click', {
                  feature_name: featureName,
                });
              }
            }}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
            style={{
              background:
                'linear-gradient(135deg, #00D4AA 0%, #0891B2 100%)',
            }}
          >
            <Sparkles className="w-4 h-4" />
            Upgrade to Pro
          </Link>

          {/* Dismiss */}
          <button
            onClick={onClose}
            className="w-full mt-3 text-sm text-slate-400 hover:text-slate-200 transition-colors py-2"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
