'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import UpgradeGateModal from './UpgradeGateModal';

interface ProBadgeProps {
  featureName: string;
  size?: 'sm' | 'md';
}

export default function ProBadge({ featureName, size = 'sm' }: ProBadgeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2 py-1 gap-1.5',
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={`inline-flex items-center rounded-full font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200 transition-colors cursor-pointer ${sizeClasses[size]}`}
      >
        <Lock className={iconSize[size]} />
        PRO
      </button>

      <UpgradeGateModal
        featureName={featureName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
