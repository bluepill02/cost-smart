"use client";

import { useEffect, useRef } from 'react';

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
    const adRef = useRef<HTMLModElement>(null);

    let heightClass = "h-[90px] md:h-[120px]"; // Default / Leaderboard
    if (size === 'rectangle') heightClass = "h-[250px]";
    if (size === 'inline') heightClass = "h-[250px] md:h-[100px]";

    useEffect(() => {
        if (slotId && adRef.current) {
            try {
                // Check if the ad has already been pushed to avoid duplicates/errors
                if (adRef.current.innerHTML === "") {
                     (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }
    }, [slotId]);

    return (
        <div className={`w-full bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-400 overflow-hidden relative ${heightClass} ${className}`}>
            <span className="z-10 uppercase tracking-widest font-semibold text-slate-300">Advertisement</span>
            {/* Pattern for visual interest without distracting */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* In a real app, this is where the Google AdSense code would inject the iframe */}
            {slotId && (
                 <ins className="adsbygoogle"
                 style={{ display: 'block', width: '100%', height: '100%' }}
                 data-ad-client="ca-pub-4280161410958958"
                 data-ad-slot={slotId}
                 data-ad-format="auto"
                 data-full-width-responsive="true"
                 ref={adRef}
                 ></ins>
            )}
        </div>
    );
}
