"use client";

import { useState } from 'react';
import { FileDown, Lock, Loader2 } from 'lucide-react';
import { useProStatus } from '@/lib/hooks/useProStatus';
import UpgradeGateModal from './UpgradeGateModal';

export default function PDFExportButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isPro, isLoading } = useProStatus();

  if (isLoading) {
    return (
      <div className="relative inline-block">
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-400 bg-white shadow-sm cursor-not-allowed"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          Download PDF Report
        </button>
      </div>
    );
  }

  if (isPro) {
    return (
      <div className="relative inline-block">
        <a
          href="/api/export"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 text-sm font-medium text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors bg-white shadow-sm"
        >
          <FileDown className="w-4 h-4" />
          Download PDF Report
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="relative inline-block">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors bg-white shadow-sm"
        >
          <FileDown className="w-4 h-4" />
          Download PDF Report
          <Lock className="w-3.5 h-3.5 text-amber-500" />
        </button>
      </div>

      <UpgradeGateModal
        featureName="pdf-export"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
