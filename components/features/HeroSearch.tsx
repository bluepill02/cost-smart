"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const ALL_TOOLS = [
  { name: 'SIP Calculator', href: '/in/sip-calculator', keywords: 'sip mutual fund monthly investment corpus' },
  { name: 'EMI Calculator', href: '/in/emi-calculator', keywords: 'emi loan monthly payment interest' },
  { name: 'Income Tax Calculator', href: '/in/income-tax-calculator', keywords: 'income tax new old regime itr' },
  { name: 'Home Loan Calculator', href: '/home-loan-calculator', keywords: 'home loan mortgage emi interest' },
  { name: 'FD Calculator', href: '/in/fd-calculator', keywords: 'fixed deposit fd returns maturity interest' },
  { name: 'PPF Calculator', href: '/in/ppf-calculator', keywords: 'ppf public provident fund tax free' },
  { name: 'GST Calculator', href: '/in/gst-calculator', keywords: 'gst tax inclusive exclusive input' },
  { name: 'Salary Calculator', href: '/in/salary-calculator', keywords: 'salary ctc in hand take home pf' },
  { name: 'Retirement Calculator', href: '/retirement-calculator', keywords: 'retirement corpus planning savings' },
  { name: 'Solar ROI Calculator', href: '/solar-roi', keywords: 'solar panels roi payback savings' },
  { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator', keywords: 'debt snowball avalanche payoff free' },
  { name: 'Rent vs Buy Calculator', href: '/rent-vs-buy-calculator', keywords: 'rent buy house property comparison' },
  { name: 'Currency Converter', href: '/currency', keywords: 'currency exchange rate usd inr eur' },
  { name: 'Profit Margin Calculator', href: '/profit-margin-calculator', keywords: 'profit margin gross net business' },
  { name: 'Invoice Generator', href: '/invoice-generator', keywords: 'invoice bill gst professional' },
  { name: 'Break-Even Calculator', href: '/break-even-calculator', keywords: 'break even point fixed variable cost' },
  { name: 'Stamp Duty Calculator', href: '/in/stamp-duty-calculator', keywords: 'stamp duty registration property' },
  { name: 'Inflation Calculator', href: '/inflation', keywords: 'inflation real value purchasing power' },
  { name: 'Emergency Fund Calculator', href: '/emergency-fund-calculator', keywords: 'emergency fund savings months' },
  { name: 'Business Loan Calculator', href: '/business-loan-calculator', keywords: 'business loan emi working capital' },
  { name: 'TDS Calculator', href: '/in/tds-calculator', keywords: 'tds tax deducted source' },
  { name: 'Freelance Rate Calculator', href: '/freelance-rate-calculator', keywords: 'freelance hourly rate project pricing' },
  { name: 'Moving Cost Calculator', href: '/moving-cost-calculator', keywords: 'moving relocation packers movers cost' },
];

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 1
    ? ALL_TOOLS.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.keywords.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSelect = (href: string) => {
    router.push(href);
    setQuery('');
    setFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter') { e.preventDefault(); handleSelect(results[activeIdx]?.href || results[0].href); }
    if (e.key === 'Escape') { setQuery(''); setFocused(false); }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" role="search">
      <div className={`flex items-center gap-3 bg-white/10 backdrop-blur-md border transition-all duration-200 rounded-2xl px-5 py-4 ${
        focused ? 'border-teal-400/70 shadow-[0_0_0_3px_rgba(0,212,170,0.15)]' : 'border-white/20 hover:border-white/30'
      }`}>
        <Search className="w-5 h-5 text-[#00D4AA] flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search: SIP, home loan, income tax, GST..."
          className="flex-1 bg-transparent text-white placeholder-white/35 text-[15px] outline-none"
          aria-label="Search calculators"
          aria-autocomplete="list"
          aria-expanded={focused && results.length > 0}
        />
        {query && (
          <button onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ✕
          </button>
        )}
        <div className="hidden sm:flex items-center gap-1 text-white/20 text-xs border border-white/10 rounded-lg px-2 py-1 flex-shrink-0">
          <span>↵</span>
        </div>
      </div>

      {focused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0D1426]/98 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50" role="listbox">
          {results.map((tool, i) => (
            <button
              key={tool.href}
              role="option"
              aria-selected={i === activeIdx}
              onMouseDown={() => handleSelect(tool.href)}
              onMouseEnter={() => setActiveIdx(i)}
              className={`w-full text-left px-5 py-3.5 flex items-center gap-4 transition-colors border-b border-white/5 last:border-0 ${
                i === activeIdx ? 'bg-white/8' : 'hover:bg-white/5'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-[#00D4AA]/60 flex-shrink-0" />
              <span className="text-white/90 text-sm font-medium">{tool.name}</span>
              <span className="ml-auto text-white/25 text-xs">→</span>
            </button>
          ))}
          <div className="px-5 py-2.5 border-t border-white/5 flex justify-between items-center">
            <span className="text-white/30 text-xs">↑↓ to navigate · ↵ to open</span>
            <a href="/calculators" className="text-[#00D4AA] text-xs hover:text-teal-300 transition-colors">See all 35+ →</a>
          </div>
        </div>
      )}
    </div>
  );
}
