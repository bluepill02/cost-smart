"use client";

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
    title: string;
    text?: string;
    url?: string;
    className?: string;
    // Allow any extra props (though we ignore them for logic, it stops TS from complaining about unknown props passed down)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export default function ShareButton({ title, text = "Check out this calculation!", url, className, ...props }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    // Remove 'variant' from props if it exists to prevent passing it to Button improperly if needed,
    // or just pass it through if Button handles it.
    // But Button does have a variant prop. The issue was ShareButton interface didn't declare it.
    // By using `...props`, we now accept `variant` and pass it to the underlying `Button`.

    const handleShare = async () => {
        const shareUrl = url || window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Error sharing', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                toast({
                    title: "Link Copied",
                    description: "Share this link with your friends!",
                });
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    };

    return (
        <Button
            size="sm"
            onClick={handleShare}
            className={cn("flex items-center gap-2", className)}
            {...props}
        >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            {copied ? 'Copied!' : props.children || 'Share Result'}
        </Button>
    );
}
