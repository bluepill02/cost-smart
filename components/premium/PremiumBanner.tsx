"use client";

import Link from 'next/link';
import { FileText, ShieldOff, BrainCircuit, Sparkles, ScanLine } from 'lucide-react';

export default function PremiumBanner() {
  return (
    <section className="mt-12 rounded-2xl overflow-hidden border border-emerald-900/20 shadow-lg">
      <div
        className="px-6 py-8 md:px-10 md:py-10"
        style={{
          background: 'linear-gradient(135deg, #0A0F1E 0%, #0d1a2d 50%, #0A0F1E 100%)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                CostSmart Pro
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Unlock Premium Financial Insights
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                Export PDF Reports
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldOff className="w-4 h-4 text-emerald-400" />
                Ad-Free
              </span>
              <span className="flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-emerald-400" />
                Advanced AI Advice
              </span>
              <span className="flex items-center gap-1.5">
                <ScanLine className="w-4 h-4 text-emerald-400" />
                AI Document Intelligence
              </span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00D4AA 0%, #0891B2 100%)',
              }}
            >
              <Sparkles className="w-4 h-4" />
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
