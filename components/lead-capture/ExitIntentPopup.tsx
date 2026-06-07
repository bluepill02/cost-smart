'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';
import { X, Gift, CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { useLeadCaptureContext } from './LeadCaptureContext';
import { isLeadAlreadyCaptured, markLeadCaptured } from './lead-capture-utils';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadyCaptured, setAlreadyCaptured] = useState(false);
  const { setExitPopupVisible } = useLeadCaptureContext();

  const dismiss = useCallback(() => {
    setVisible(false);
    setExitPopupVisible(false);
    try {
      localStorage.setItem('costsmart-exit-dismissed', String(Date.now()));
    } catch {}
  }, [setExitPopupVisible]);

  useEffect(() => {
    if (isLeadAlreadyCaptured()) {
      setAlreadyCaptured(true);
      return;
    }

    try {
      const dismissed = localStorage.getItem('costsmart-exit-dismissed');
      if (dismissed) {
        const elapsed = Date.now() - Number(dismissed);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (elapsed < sevenDays) return;
      }
    } catch {}

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !triggered) {
        triggered = true;
        setVisible(true);
        setExitPopupVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [setExitPopupVisible]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log('[CostSmart Exit Intent]', { name, email });
    markLeadCaptured();
    setSubmitted(true);
  };

  if (alreadyCaptured) return null;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div
          className="p-6 pb-4 text-center"
          style={{ background: 'linear-gradient(135deg, #059669 0%, #0D9488 50%, #00D4AA 100%)' }}
        >
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close popup"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Gift className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-black text-white mb-1">Wait! Free Gift Inside</h2>
          <p className="text-white/80 text-sm">
            Get our Financial Planning Toolkit - completely free
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Check Your Inbox!</h3>
              <p className="text-slate-500 text-sm">Your toolkit is on its way. Welcome to the CostSmart community.</p>
              <button
                onClick={dismiss}
                className="mt-4 text-sm text-emerald-600 font-semibold hover:text-emerald-700"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <h3 className="font-bold text-slate-900 text-sm mb-2">What you get:</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {[
                    'Monthly budget planner template',
                    'Investment allocation guide',
                    'Tax-saving checklist (80C, 80D, NPS)',
                    'Emergency fund calculator worksheet',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form name="costsmart-exit-intent-form" onSubmit={handleSubmit} className="space-y-3">
                <input
                  id="costsmart-exit-name"
                  name="costsmart-exit-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
                <input
                  id="costsmart-exit-email"
                  name="costsmart-exit-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send Me the Toolkit
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              <p className="text-center text-slate-400 text-xs mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
