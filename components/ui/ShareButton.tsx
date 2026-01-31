'use client';

import React, { useState } from 'react';
import { Share2, Link2, Check, Facebook, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShareableURLManager from '@/lib/shareable-url';

export interface ShareButtonProps {
  calculator: string;
  inputs: Record<string, any>;
  results?: Record<string, any>;
  title?: string;
  message?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function ShareButton({
  calculator,
  inputs,
  results,
  title = 'Share Calculation',
  message,
  variant = 'default',
  size = 'default',
  className = ''
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [shareURL, setShareURL] = useState<string>('');

  React.useEffect(() => {
    // Generate shareable URL when component mounts or data changes
    const url = ShareableURLManager.generateShareableURL(
      calculator,
      inputs,
      results
    );
    setShareURL(url);
  }, [calculator, inputs, results]);

  const handleCopyLink = async () => {
    const success = await ShareableURLManager.copyToClipboard(shareURL);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const url = ShareableURLManager.generateWhatsAppURL(shareURL, message);
    window.open(url, '_blank');
    setShowMenu(false);
  };

  const handleTwitterShare = () => {
    const url = ShareableURLManager.generateTwitterURL(shareURL, message);
    window.open(url, '_blank');
    setShowMenu(false);
  };

  const handleFacebookShare = () => {
    const url = ShareableURLManager.generateFacebookURL(shareURL);
    window.open(url, '_blank');
    setShowMenu(false);
  };

  const handleLinkedInShare = () => {
    const url = ShareableURLManager.generateLinkedInURL(shareURL);
    window.open(url, '_blank');
    setShowMenu(false);
  };

  const handleEmailShare = () => {
    const url = ShareableURLManager.generateEmailURL(
      shareURL,
      `Check out this ${calculator} calculation`,
      message
    );
    window.location.href = url;
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <Button 
        variant={variant} 
        size={size} 
        className={className}
        onClick={() => setShowMenu(!showMenu)}
      >
        <Share2 className="w-4 h-4 mr-2" />
        {title}
      </Button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
          <button
            onClick={handleCopyLink}
            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <div className="border-t border-slate-200 my-1" />

          <button
            onClick={handleWhatsAppShare}
            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>

          <button
            onClick={handleFacebookShare}
            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-2"
          >
            <Facebook className="w-4 h-4" />
            <span>Share on Facebook</span>
          </button>

          <button
            onClick={handleTwitterShare}
            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Share on X (Twitter)</span>
          </button>

          <button
            onClick={handleLinkedInShare}
            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4" />
            <span>Share on LinkedIn</span>
          </button>

          <button
            onClick={handleEmailShare}
            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Share via Email</span>
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Compact share button with just the icon
 */
export function ShareButtonCompact({
  calculator,
  inputs,
  results,
  message,
  className = ''
}: Omit<ShareButtonProps, 'title' | 'variant' | 'size'>) {
  return (
    <ShareButton
      calculator={calculator}
      inputs={inputs}
      results={results}
      message={message}
      title=""
      variant="ghost"
      size="sm"
      className={`px-2 ${className}`}
    />
  );
}

/**
 * Share banner component to display when viewing shared calculations
 */
export interface SharedCalculationBannerProps {
  calculator: string;
  dataAge?: string;
  isFresh?: boolean;
  onRecalculate?: () => void;
  className?: string;
}

export function SharedCalculationBanner({
  calculator,
  dataAge,
  isFresh = true,
  onRecalculate,
  className = ''
}: SharedCalculationBannerProps) {
  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 ${className}`}>
      <div className="flex items-start gap-3">
        <Share2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-blue-900 mb-1">
            You're viewing a shared calculation
          </p>
          <p className="text-sm text-blue-700">
            {dataAge && `This calculation was shared ${dataAge}. `}
            {!isFresh && (
              <span className="text-amber-700">
                The data may be outdated. Consider recalculating with current rates.
              </span>
            )}
          </p>
        </div>
        {onRecalculate && (
          <Button
            onClick={onRecalculate}
            size="sm"
            variant="outline"
            className="flex-shrink-0"
          >
            Recalculate
          </Button>
        )}
      </div>
    </div>
  );
}

export default ShareButton;
