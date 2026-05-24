"use client";

import { useState } from 'react';
import { FileDown, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PDFExportButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors bg-white shadow-sm"
      >
        <FileDown className="w-4 h-4" />
        Download PDF Report
        <Lock className="w-3.5 h-3.5 text-amber-500" />
      </button>

      {showTooltip && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowTooltip(false)}
          />
          <div className="absolute top-full left-0 mt-2 z-50 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-4 animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-900">Pro Feature</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Upgrade to CostSmart Pro to unlock PDF exports with detailed breakdowns, charts, and personalized recommendations.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Upgrade to unlock
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
