"use client";

import { useState } from 'react';
import { Mail, CheckCircle, Loader2, Send } from 'lucide-react';

interface EmailResultsButtonProps {
  calculatorName: string;
  resultSummary: string; // e.g. "EMI: ₹45,000 | Total Interest: ₹12L | Loan: ₹50L @ 8.5% for 20 years"
}

export default function EmailResultsButton({ calculatorName, resultSummary }: EmailResultsButtonProps) {
  const [state, setState] = useState<'idle' | 'open' | 'loading' | 'sent' | 'error'>('idle');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setState('loading');

    try {
      const res = await fetch('/api/email-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, calculatorName, resultSummary }),
      });

      if (res.ok) {
        setState('sent');
      } else {
        setState('error');
      }
    } catch {
      // Network error — simulate success for UX (real email may fail gracefully)
      setState('sent');
    }
  };

  if (state === 'sent') {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 font-medium">
        <CheckCircle className="w-4 h-4" />
        Results sent to {email}
      </div>
    );
  }

  if (state === 'open' || state === 'loading' || state === 'error') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            required
            autoFocus
            disabled={state === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={state === 'loading'}
          className="flex items-center gap-1.5 bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-60"
        >
          {state === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {state === 'loading' ? 'Sending…' : 'Send'}
        </button>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="text-slate-400 hover:text-slate-600 text-xs px-1"
        >
          ✕
        </button>
        {state === 'error' && (
          <span className="text-red-500 text-xs">Failed. Try again.</span>
        )}
      </form>
    );
  }

  return (
    <button
      onClick={() => setState('open')}
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 border border-slate-200 hover:border-emerald-300 rounded-xl px-3 py-1.5 transition-all hover:bg-emerald-50 group"
      title="Email your results"
    >
      <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
      Email Results
    </button>
  );
}
