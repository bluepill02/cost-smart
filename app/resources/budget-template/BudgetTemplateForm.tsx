'use client';

import { useState, FormEvent } from 'react';
import { Mail, CheckCircle, Download, ArrowRight } from 'lucide-react';
import { submitLeadCapture } from '@/lib/lead-capture-api';
import { markLeadCaptured } from '@/components/lead-capture/lead-capture-utils';

export default function BudgetTemplateForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    submitLeadCapture({
      email,
      name,
      formSource: 'costsmart-budget-template',
      pageUrl: window.location.href,
    });
    markLeadCaptured();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Your template is ready!</h3>
        <p className="text-slate-600 text-sm mb-6">
          Click below to download your free Monthly Budget Template.
        </p>
        <a
          href="/budget-template.pdf"
          download
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Budget Template
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Get Your Free Template</h3>
      <p className="text-slate-500 text-sm mb-6">
        Enter your email to instantly download the budget template. We will also send you helpful
        financial tips (unsubscribe anytime).
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="budget-template-name" className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            id="budget-template-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>

        <div>
          <label htmlFor="budget-template-email" className="block text-sm font-medium text-slate-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="budget-template-email"
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Get Free Template
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <p className="text-xs text-slate-400 mt-4 text-center">
        No spam, ever. Unsubscribe with one click.
      </p>
    </div>
  );
}
