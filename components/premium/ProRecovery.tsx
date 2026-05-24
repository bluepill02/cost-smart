"use client";

import { useState } from 'react';
import { useProStatus } from '@/lib/hooks/useProStatus';

export default function ProRecovery() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'not_found' | 'error'>('idle');
  const { setProEmail, isPro } = useProStatus();

  if (isPro) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/pro/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (data.isPro) {
        setProEmail(trimmed);
        setStatus('success');
      } else {
        setStatus('not_found');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-2">Already a Pro?</h3>
      <p className="text-sm text-slate-600 mb-4">
        Enter your PayPal email to restore your Pro access on this device.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your PayPal email"
          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Checking...' : 'Restore'}
        </button>
      </form>
      {status === 'success' && (
        <p className="text-sm text-emerald-600 mt-3">
          Pro access restored successfully!
        </p>
      )}
      {status === 'not_found' && (
        <p className="text-sm text-red-600 mt-3">
          No active subscription found for this email.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 mt-3">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
