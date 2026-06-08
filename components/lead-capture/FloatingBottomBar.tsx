'use client';

import { useState, useEffect, FormEvent } from 'react';
import { X, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useLeadCaptureContext } from './LeadCaptureContext';
import { isLeadAlreadyCaptured, markLeadCaptured } from './lead-capture-utils';
import { submitLeadCapture } from '@/lib/lead-capture-api';

export default function FloatingBottomBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadyCaptured, setAlreadyCaptured] = useState(false);
  const { exitPopupVisible } = useLeadCaptureContext();

  useEffect(() => {
    if (isLeadAlreadyCaptured()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAlreadyCaptured(true);
      return;
    }

    try {
      const wasDismissed = sessionStorage.getItem('costsmart-bottombar-dismissed');
      if (wasDismissed) {
        setDismissed(true);
        return;
      }
    } catch {}

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.6) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('costsmart-bottombar-dismissed', '1');
    } catch {}
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log('[CostSmart Bottom Bar]', { email });
    markLeadCaptured();
    submitLeadCapture({ email, formSource: 'costsmart-bottombar-form', pageUrl: window.location.href });
    setSubmitted(true);
    setTimeout(() => {
      handleDismiss();
    }, 2500);
  };

  if (alreadyCaptured || dismissed || !visible || exitPopupVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] animate-in slide-in-from-bottom duration-300"
    >
      <div className="bg-[#0A0F1E]/90 backdrop-blur-lg border-t border-white/10 px-4 py-3">
        <div className="container mx-auto max-w-4xl flex items-center justify-between gap-4">
          {submitted ? (
            <div className="flex items-center gap-2 text-[#00D4AA] text-sm font-semibold mx-auto">
              <CheckCircle className="w-4 h-4" />
              Subscribed! Welcome aboard.
            </div>
          ) : (
            <>
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 bg-[#00D4AA]/15 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#00D4AA]" />
                </div>
                <span className="text-white text-sm font-semibold">Weekly Financial Tips</span>
              </div>

              <form name="costsmart-bottombar-form" onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 max-w-md">
                <input
                  id="costsmart-bottombar-email"
                  name="costsmart-bottombar-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/50 transition-all"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-[#00D4AA] text-[#0A0F1E] px-4 py-2 rounded-lg font-bold text-sm hover:bg-teal-400 transition-colors flex-shrink-0"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              <button
                onClick={handleDismiss}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all flex-shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
