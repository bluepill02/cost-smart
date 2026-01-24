"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
    const [adLoaded, setAdLoaded] = useState(false);

    let heightClass = "h-[90px] md:h-[120px]"; // Default / Leaderboard
    if (size === 'rectangle') heightClass = "h-[250px]";
    if (size === 'inline') heightClass = "h-[250px] md:h-[100px]";

    useEffect(() => {
        if (inView && slotId && !adLoaded) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setAdLoaded(true);
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }
    }, [inView, slotId, adLoaded]);

    return (
        <div
            ref={ref}
            className={`w-full bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-400 overflow-hidden relative ${heightClass} ${className}`}
        >
            {!adLoaded && (
                <>
                    <span className="z-10 uppercase tracking-widest font-semibold text-slate-300">Advertisement</span>
                    {/* Pattern for visual interest without distracting */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </>
            )}

            {/* Only render the ins tag if we have a slotId. We rely on the script to fill it.
                However, AdSense expects the tag to exist when .push() happens.
                Wait, if we render it always, AdSense script (if loaded globally) might try to fill it automatically if configured to 'auto' ads?
                Manual push requires the tag to be present.
            */}
            {slotId && (
                 <ins className="adsbygoogle"
                 style={{ display: 'block', width: '100%', height: '100%' }}
                 data-ad-client="ca-pub-4280161410958958"
                 data-ad-slot={slotId}
                 data-ad-format="auto"
                 data-full-width-responsive="true"
                 ></ins>
            )}
        </div>
    );
}
