'use client';

import { useState } from 'react';
import { useProStatus } from '@/lib/hooks/useProStatus';
import ProBadge from './ProBadge';
import UpgradeGateModal from './UpgradeGateModal';

interface ProFeatureWrapperProps {
  children: React.ReactNode;
  featureName: string;
}

export default function ProFeatureWrapper({
  children,
  featureName,
}: ProFeatureWrapperProps) {
  const { isPro, isLoading } = useProStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <div className="opacity-50">{children}</div>;
  }

  if (isPro) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        className="relative cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
      >
        {/* Blurred/greyed content */}
        <div className="pointer-events-none select-none blur-[2px] opacity-60 grayscale">
          {children}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 rounded-lg group-hover:bg-slate-900/20 transition-colors">
          <ProBadge featureName={featureName} size="md" />
        </div>
      </div>

      <UpgradeGateModal
        featureName={featureName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
