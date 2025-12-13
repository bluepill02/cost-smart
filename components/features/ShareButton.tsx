"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
    title: string;
    text: string;
    url?: string;
    variant?: 'default' | 'outline' | 'ghost' | 'secondary';
    className?: string;
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function ShareButton({
    title,
    text,
    url,
    variant = "outline",
    className,
    size = "default"
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: title,
            text: text,
            url: url || window.location.href,
        };

        // Try Native Share API first (Mobile)
        if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }

        // Fallback to Clipboard (Desktop)
        try {
            await navigator.clipboard.writeText(`${text} ${shareData.url}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={cn("gap-2 transition-all", className)}
            onClick={handleShare}
        >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            {size !== 'icon' && (copied ? "Copied!" : "Share Result")}
        </Button>
    );
}
