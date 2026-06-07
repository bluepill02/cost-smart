'use client';

import { useState, FormEvent } from 'react';
import { Mail, CheckCircle, FileText, ArrowRight } from 'lucide-react';

export default function CalculatorResultGate() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log('[CostSmart Calculator Gate]', { name, email });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="my-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
        </div>
        <h3 className="font-bold text-slate-900 mb-1">Report Sent!</h3>
        <p className="text-slate-600 text-sm">Check your inbox for your detailed calculation report with charts and insights.</p>
      </div>
    );
  }

  return (
    <div className="my-6 border-2 border-emerald-200 rounded-2xl p-6 bg-gradient-to-br from-emerald-50/50 to-white overflow-hidden relative">
      {/* Subtle accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 text-base mb-1">Get Full Report via Email</h3>
          <p className="text-slate-500 text-sm mb-4">
            Receive a detailed PDF with year-by-year breakdowns, comparison charts, and personalized investment insights.
          </p>

          <form name="costsmart-calculator-gate-form" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              id="costsmart-calcgate-name"
              name="costsmart-calcgate-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all sm:w-36"
            />
            <input
              id="costsmart-calcgate-email"
              name="costsmart-calcgate-email"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors flex-shrink-0"
            >
              <Mail className="w-4 h-4" />
              Email Report
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
