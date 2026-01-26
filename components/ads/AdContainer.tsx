"use client";

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface AdContainerProps {
    slotId?: string;
    className?: string;
    size?: 'leaderboard' | 'rectangle' | 'inline';
}

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        adsbygoogle: any[];
    }
}

export default function AdContainer({ slotId, className = "", size = 'leaderboard' }: AdContainerProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px', // Load 200px before it comes into view
    });
    const [adState, setAdState] = useState<'loading' | 'loaded' | 'blocked'>('loading');
    const adRef = useRef<HTMLDivElement>(null);

    let heightClass = "h-[90px] md:h-[120px]"; // Default / Leaderboard
    if (size === 'rectangle') heightClass = "h-[250px]";
    if (size === 'inline') heightClass = "h-[250px] md:h-[100px]";

    useEffect(() => {
        if (inView && slotId && adState === 'loading') {
            try {
                // Check if AdSense script is loaded or blocked
                // We give it a small delay to allow script to initialize if it was lazy loaded
                const checkAdBlock = () => {
                   if (typeof window !== 'undefined' && !window.adsbygoogle) {
                       // Likely blocked if adsbygoogle is not defined after load
                       setAdState('blocked');
                       return;
                   }

                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        setAdState('loaded');

                        // Double check: AdSense modifies the ins tag. If it stays empty/hidden, it might be blocked by CSS.
                        // We can't easily detect CSS blocking via JS without complex checks, but this covers script blocking.
                    } catch (e) {
                        console.error("AdSense error:", e);
                        setAdState('blocked');
                    }
                };

                // Slight delay to ensure global script has time to define window.adsbygoogle
                const timer = setTimeout(checkAdBlock, 1000);
                return () => clearTimeout(timer);

            } catch (e) {
                setAdState('blocked');
            }
        }
    }, [inView, slotId, adState]);

    // Fallback Content Component
    const AdFallback = () => (
        <div className="w-full h-full bg-slate-100 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group hover:border-emerald-300 transition-colors cursor-pointer">
             <Link href="/solar-roi" className="absolute inset-0 z-10">
               <span className="sr-only">Check Solar Savings</span>
             </Link>
             <div className="text-sm font-semibold text-emerald-700 mb-1">
                ☀️ Save Money with Solar
             </div>
             <div className="text-xs text-slate-500">
                Calculate your savings in seconds. No signup required.
             </div>
             <div className="mt-2 text-xs font-bold text-emerald-600 border border-emerald-200 bg-emerald-50 px-3 py-1 rounded-full group-hover:bg-emerald-100 transition-colors">
                Try Calculator
             </div>

             {/* Decorative */}
             <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 bg-emerald-100 rounded-full blur-xl opacity-50"></div>
        </div>
    );

    return (
        <div
            ref={ref}
            className={`w-full relative ${heightClass} ${className}`}
        >
            <div ref={adRef} className={`w-full h-full ${adState === 'blocked' ? 'hidden' : 'block'}`}>
                 {!inView && (
                    <div className="w-full h-full bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-slate-300 uppercase tracking-widest">Advertisement</span>
                    </div>
                 )}
                 {inView && slotId && (
                     <ins className="adsbygoogle"
                     style={{ display: 'block', width: '100%', height: '100%' }}
                     data-ad-client="ca-pub-4280161410958958"
                     data-ad-slot={slotId}
                     data-ad-format="auto"
                     data-full-width-responsive="true"
                     ></ins>
                )}
            </div>

            {/* Render Fallback if blocked */}
            {adState === 'blocked' && (
                <AdFallback />
            )}
        </div>
    );
}
