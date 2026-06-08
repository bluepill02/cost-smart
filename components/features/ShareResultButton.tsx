"use client";

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareResultButtonProps {
  title: string;
  text: string;
  url?: string;
}

export default function ShareResultButton({ title, text, url }: ShareResultButtonProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleShare = async () => {
    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: currentUrl });
        return;
      } catch {
        // fallthrough to clipboard
      }
    }
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${text}\n\nCalculate yours: ${currentUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silent fail
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 border border-slate-200 hover:border-emerald-300 rounded-xl px-3 py-1.5 transition-all hover:bg-emerald-50 group"
      title="Share your result"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="text-emerald-600">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Share Result
        </>
      )}
    </button>
  );
}
