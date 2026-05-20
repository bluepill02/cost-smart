"use client";

import React, { useState, useEffect } from 'react';
import { Shield, X, Check, Settings } from 'lucide-react';
import { Button } from './button';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('costsmart-cookie-consent');
    if (!consent) {
      // Small delay for natural premium feel
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('costsmart-cookie-consent', 'accepted');
    // Set Google Consent Mode v2 if defined
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('costsmart-cookie-consent', 'rejected');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-10 duration-500 print:hidden">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-2xl p-6 relative overflow-hidden transition-all duration-300">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-100 dark:bg-emerald-950/30 rounded-full blur-3xl opacity-60"></div>
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Your Privacy Preferences</h4>
              <button 
                onClick={() => setShowBanner(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-slate-600 dark:text-slate-350 text-xs leading-relaxed mt-2">
              We use cookies to analyze site traffic, personalize content, and serve relevant financial advertisements (via Google AdSense) to keep this tool free.
            </p>

            {showDetails && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5 animate-in fade-in duration-300">
                <div className="flex justify-between items-center text-xs">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">Necessary Cookies</div>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-medium">Required</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">Analytics (Google Analytics)</div>
                  <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">Standard</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">Ad Personalization (Google AdSense)</div>
                  <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">Standard</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-5">
              <div className="flex gap-2">
                <Button 
                  onClick={handleAcceptAll}
                  className="flex-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 h-9 rounded-xl shadow-sm border-0"
                >
                  <Check className="w-3.5 h-3.5 mr-1" /> Accept All
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleRejectAll}
                  className="flex-1 text-xs font-semibold py-2 h-9 border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl"
                >
                  Reject All
                </Button>
              </div>
              
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors flex items-center justify-center gap-1 mt-1 font-medium"
              >
                <Settings className="w-3 h-3" />
                {showDetails ? "Hide Cookie Settings" : "Configure Cookie Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
