"use client";

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface AdContainerProps {
    slotId?: string;
    className?: string;
    size?: 'leaderboard' | 'rectangle' | 'inline' | 'vertical' | 'square';
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
        rootMargin: '200px',
    });
    const [adState, setAdState] = useState<'loading' | 'loaded' | 'blocked'>('loading');
    const adRef = useRef<HTMLDivElement>(null);

    // Fixed heights to prevent CLS - CRITICAL for Core Web Vitals
    const heightClasses: Record<string, string> = {
        'leaderboard': 'h-[90px] md:h-[90px] lg:h-[90px]',
        'rectangle': 'h-[250px] md:h-[250px] lg:h-[250px]',
        'inline': 'h-[250px] md:h-[100px] lg:h-[100px]',
        'vertical': 'h-[600px] md:h-[600px] lg:h-[600px]',
        'square': 'h-[250px] md:h-[250px] lg:h-[250px]',
    };

    const heightClass = heightClasses[size] || heightClasses.leaderboard;

    // Fallback Slot IDs for robust monetisation
    const fallbackSlots: Record<string, string> = {
        'leaderboard': '1706594832',
        'rectangle': '1475703853',
        'inline': '1475703853',
        'vertical': '5821640937',
        'square': '4057982103',
    };

    const activeSlotId = slotId || fallbackSlots[size] || '1475703853';

    useEffect(() => {
        if (inView && activeSlotId && adState === 'loading') {
            try {
                const checkAdBlock = () => {
                   if (typeof window !== 'undefined' && !window.adsbygoogle) {
                       setAdState('blocked');
                       return;
                   }

                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        setAdState('loaded');
                    } catch (e) {
                        console.error("AdSense error:", e);
                        setAdState('blocked');
                    }
                };

                const timer = setTimeout(checkAdBlock, 500);
                return () => clearTimeout(timer);

            } catch (e) {
                setAdState('blocked');
            }
        }
    }, [inView, activeSlotId, adState]);

    const AdFallback = () => (
        <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group hover:border-emerald-400 transition-colors cursor-pointer">
             <Link href="/solar-roi" className="absolute inset-0 z-10">
               <span className="sr-only">Check Solar Savings</span>
             </Link>
             <div className="text-sm font-semibold text-emerald-700 mb-1">
                ☀️ Save Money with Solar
             </div>
             <div className="text-xs text-slate-600">
                Calculate your savings in seconds.
             </div>
             <div className="mt-2 text-xs font-bold text-white bg-emerald-600 border border-emerald-700 px-3 py-1 rounded-full group-hover:bg-emerald-700 transition-colors">
                Try Now
             </div>
             <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 bg-emerald-100 rounded-full blur-xl opacity-50"></div>
         </div>
    );

    return (
        <div
            ref={ref}
            className={`w-full ${heightClass} ${className} relative min-h-[90px]`}
        >
            <div ref={adRef} className={`w-full h-full ${adState === 'blocked' ? 'hidden' : 'block'}`}>
                 {!inView && (
                    <div className="w-full h-full bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-slate-300 uppercase tracking-widest">Ad Loading...</span>
                    </div>
                 )}
                 {inView && activeSlotId && (
                     <ins className="adsbygoogle"
                     style={{ display: 'block', width: '100%', height: '100%' }}
                     data-ad-client="ca-pub-4280161410958958"
                     data-ad-slot={activeSlotId}
                     data-ad-format="auto"
                     data-full-width-responsive="true"
                     ></ins>
                )}
            </div>

            {adState === 'blocked' && (
                <AdFallback />
            )}
        </div>
    );
}
