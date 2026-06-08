"use client";

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useProStatus } from '@/lib/hooks/useProStatus';
import AdBlockRecovery from '@/components/ads/AdBlockRecovery';

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
    const { isPro } = useProStatus();
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
        if (isPro) return;
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

            } catch {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setAdState('blocked');
            }
        }
    }, [inView, activeSlotId, adState, isPro]);

    // Hide ads for Pro users
    if (isPro) {
        return null;
    }

    const sizeMap: Record<string, 'banner' | 'rectangle' | 'inline'> = {
        'leaderboard': 'banner',
        'rectangle': 'rectangle',
        'inline': 'inline',
        'vertical': 'rectangle',
        'square': 'rectangle',
    };

    const recoverySize = sizeMap[size] || 'rectangle';

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
                <AdBlockRecovery size={recoverySize} forceVisible />
            )}
        </div>
    );
}
