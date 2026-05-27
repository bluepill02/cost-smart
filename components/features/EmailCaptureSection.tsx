"use client";

import React, { useState } from 'react';

export default function EmailCaptureSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-emerald-600 py-16 px-4">
      <div className="container mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-black text-white mb-2">Get Your Report Emailed</h2>
        <p className="text-emerald-100 text-sm mb-8">
          Enter your email to receive a detailed landed cost breakdown
        </p>
        {submitted ? (
          <p className="text-white font-semibold bg-emerald-700/50 inline-block px-6 py-3 rounded-full text-sm">
            Report emailing coming soon! We will notify you when this feature is available.
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 rounded-full text-sm bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              Send Report
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
