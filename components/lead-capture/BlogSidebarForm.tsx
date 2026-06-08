'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Mail, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { isLeadAlreadyCaptured, markLeadCaptured } from './lead-capture-utils';
import { submitLeadCapture } from '@/lib/lead-capture-api';

export default function BlogSidebarForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadyCaptured, setAlreadyCaptured] = useState(false);

  useEffect(() => {
    if (isLeadAlreadyCaptured()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAlreadyCaptured(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log('[CostSmart Blog Sidebar]', { email });
    markLeadCaptured();
    submitLeadCapture({ email, formSource: 'costsmart-blog-sidebar-form', pageUrl: window.location.href });
    setSubmitted(true);
  };

  if (alreadyCaptured) return null;

  if (submitted) {
    return (
      <div className="sticky top-24 bg-white border border-emerald-200 rounded-2xl p-5 text-center">
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
        </div>
        <h4 className="font-bold text-slate-900 text-sm mb-1">Subscribed!</h4>
        <p className="text-slate-500 text-xs">You will receive our weekly digest every Monday.</p>
      </div>
    );
  }

  return (
    <div
      className="sticky top-24 rounded-2xl p-5 bg-white overflow-hidden"
      style={{
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
        boxShadow: '0 0 0 2px rgba(0,212,170,0.2), 0 4px 20px rgba(0,0,0,0.04)',
      }}
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00D4AA] to-teal-500 rounded-t-2xl" />

      <div className="flex items-center gap-2 mb-3 mt-1">
        <div className="w-7 h-7 bg-[#00D4AA]/15 rounded-lg flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-[#00D4AA]" />
        </div>
        <h4 className="font-bold text-slate-900 text-sm">Smart Money Insights</h4>
      </div>

      <p className="text-slate-500 text-xs mb-4 leading-relaxed">
        Get a weekly digest of financial tips, calculator guides, and money-saving strategies delivered to your inbox.
      </p>

      <form name="costsmart-blog-sidebar-form" onSubmit={handleSubmit} className="space-y-2.5">
        <input
          id="costsmart-sidebar-email"
          name="costsmart-sidebar-email"
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/50 focus:border-[#00D4AA] transition-all"
        />
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#00D4AA] text-[#0A0F1E] px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-400 transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          Subscribe Free
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      <p className="text-slate-400 text-[10px] mt-2.5 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
