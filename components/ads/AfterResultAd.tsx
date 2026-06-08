"use client";

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface AfterResultAdProps {
  slotId?: string;
  className?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any[];
  }
}

/**
 * AfterResultAd — renders a rectangle ad unit after the calculator results.
 * This placement has the highest viewability because users just received
 * their answer and are paused reading the result.
 */
export default function AfterResultAd({ slotId = '1475703853', className = '' }: AfterResultAdProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '100px' });
  const initialized = useRef(false);

  useEffect(() => {
    if (inView && !initialized.current) {
      initialized.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // adsbygoogle may not be loaded yet — silent fail
      }
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`w-full min-h-[100px] my-6 ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-center text-[10px] text-slate-400 uppercase tracking-widest mb-1">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4280161410958958"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
