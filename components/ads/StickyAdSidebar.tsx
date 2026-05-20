"use client";

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AdContainer from './AdContainer';

interface StickyAdSidebarProps {
  slotId: string;
}

/**
 * Desktop-only sticky sidebar ad placement.
 * Hides on mobile/tablet to improve UX.
 * Lazy loads when within viewport to avoid performance impact.
 */
export default function StickyAdSidebar({ slotId }: StickyAdSidebarProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: '100px',
  });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if viewport is desktop size
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      ref={ref}
      className="hidden lg:block sticky top-20 w-80 h-fit flex-shrink-0"
    >
      {inView ? (
        <div className="bg-white rounded-lg border border-slate-200 p-2 shadow-lg">
          <AdContainer slotId={slotId} size="vertical" />
        </div>
      ) : (
        <div className="bg-slate-50 rounded-lg border border-slate-200 h-96 flex items-center justify-center">
          <span className="text-xs text-slate-300 uppercase tracking-widest">
            Ad Space
          </span>
        </div>
      )}
    </div>
  );
}
