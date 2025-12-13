"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AdSize = 'leaderboard' | 'rectangle' | 'sticky-footer' | 'inline';

interface AdContainerProps {
    size: AdSize;
    className?: string;
    slotId?: string; // For real AdSense/GAM integration
}

export default function AdContainer({ size, className, slotId }: AdContainerProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate ad loading delay to demonstrate CLS protection
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Define dimensions based on standard IAB sizes to reserve space
    const sizeClasses = {
        'leaderboard': 'h-[90px] w-full max-w-[728px]', // 728x90
        'rectangle': 'h-[250px] w-[300px]',             // 300x250
        'sticky-footer': 'h-[50px] w-full fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-t border-slate-200', // 320x50 mobile anchor
        'inline': 'h-[250px] w-full max-w-[300px] md:max-w-full', // Native style
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden flex items-center justify-center mx-auto my-4 bg-slate-100",
                sizeClasses[size],
                !isLoaded && "animate-pulse",
                className
            )}
        >
            {/* Label for Demo / Debug */}
            <div className="absolute top-1 left-1 bg-slate-300 text-[10px] text-slate-600 px-1 rounded opacity-50">
                Ad: {size}
            </div>

            {/* CLS Placeholder (Visible when loading) */}
            {!isLoaded && (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-slate-300 text-sm font-medium">Loading Advertisement...</div>
                </div>
            )}

            {/* Actual Ad Content (Simulated) */}
            {isLoaded && (
                <div className="w-full h-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 text-xs">
                    {/* This is where the <ins> tag for AdSense would go */}
                    <span className="font-mono">[Google Ad {slotId || '123'}]</span>
                </div>
            )}
        </div>
    );
}
