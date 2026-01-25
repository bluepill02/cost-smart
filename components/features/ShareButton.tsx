"use client";

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Explicitly defining className to satisfy TypeScript if ButtonProps is ambiguous in this context
interface ShareButtonProps extends ButtonProps {
    title: string;
    text?: string;
    url?: string;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function ShareButton({ title, text = "Check out this calculation!", url, className, variant, ...props }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

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
            variant={variant}
            onClick={handleShare}
            className={cn("flex items-center gap-2", className)}
            {...props}
        >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            {copied ? 'Copied!' : props.children || 'Share Result'}
        </Button>
    );
}
