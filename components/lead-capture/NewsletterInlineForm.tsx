'use client';

import { useState, FormEvent } from 'react';
import { Mail, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function NewsletterInlineForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log('[CostSmart Newsletter]', { name, email });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="relative bg-[#0A0F1E] rounded-2xl p-10 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,170,0.3) 0%, transparent 70%)' }} />
            <div className="relative">
              <div className="w-14 h-14 bg-[#00D4AA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-[#00D4AA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">You&apos;re In!</h3>
              <p className="text-white/60 text-sm">Check your inbox for a welcome email with your first set of smart money tips.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <div
          className="relative bg-[#0A0F1E] rounded-2xl p-8 md:p-10 overflow-hidden"
          style={{
            boxShadow: '0 0 60px rgba(0,212,170,0.08)',
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 70% 50% at 80% 20%, rgba(0,212,170,0.1) 0%, transparent 60%),
                radial-gradient(ellipse 50% 40% at 10% 80%, rgba(59,130,246,0.06) 0%, transparent 50%)
              `,
            }}
          />

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#00D4AA]/10 border border-[#00D4AA]/25 rounded-full px-3 py-1 text-[#00D4AA] text-xs font-bold uppercase tracking-widest mb-5">
              <Sparkles className="w-3 h-3" />
              Free Weekly Newsletter
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
              Get{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #00D4AA 0%, #3B82F6 100%)' }}
              >
                Smart Money Tips
              </span>
            </h2>
            <p className="text-white/50 text-sm mb-6 max-w-md">
              Join thousands of readers getting actionable financial insights, calculator tips, and market updates every week. No spam, ever.
            </p>

            <form name="costsmart-newsletter-form" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                id="costsmart-newsletter-name"
                name="costsmart-newsletter-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/50 focus:border-[#00D4AA]/50 transition-all sm:w-40"
              />
              <input
                id="costsmart-newsletter-email"
                name="costsmart-newsletter-email"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/50 focus:border-[#00D4AA]/50 transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#00D4AA] text-[#0A0F1E] px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20 flex-shrink-0"
              >
                <Mail className="w-4 h-4" />
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="text-white/25 text-xs mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
