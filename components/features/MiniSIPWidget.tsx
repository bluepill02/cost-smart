"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, IndianRupee } from 'lucide-react';

export default function MiniSIPWidget() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const rate = 12;

  const { corpus, invested, gains } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const corpus = Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = monthly * years * 12;
    return { corpus, invested, gains: corpus - invested };
  }, [monthly, years]);

  const fmt = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    return `₹${n.toLocaleString('en-IN')}`;
  };

  const gainsPercent = Math.round((gains / invested) * 100);

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 bg-teal-500/20 border border-teal-500/30 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#00D4AA]" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">SIP Calculator</div>
            <div className="text-white/40 text-xs">Adjust sliders to see your corpus</div>
          </div>
        </div>

        <div className="space-y-4 mb-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-white/50 text-xs">Monthly Investment</label>
              <span className="text-[#00D4AA] text-sm font-bold">{fmt(monthly)}</span>
            </div>
            <input
              type="range" min={1000} max={50000} step={500}
              value={monthly}
              onChange={e => setMonthly(+e.target.value)}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-teal-400"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-white/50 text-xs">Duration</label>
              <span className="text-[#00D4AA] text-sm font-bold">{years} years</span>
            </div>
            <input
              type="range" min={1} max={30} step={1}
              value={years}
              onChange={e => setYears(+e.target.value)}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-teal-400"
            />
          </div>
        </div>

        {/* Result card */}
        <div className="bg-gradient-to-br from-white/8 to-white/4 rounded-2xl p-4 mb-4 border border-white/10">
          <div className="text-white/50 text-xs mb-1 flex items-center gap-1">
            <IndianRupee className="w-3 h-3" /> Estimated Corpus
          </div>
          <div className="text-3xl font-black text-white tracking-tight mb-3">
            {fmt(corpus)}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/5 rounded-xl p-2">
              <div className="text-white/40 text-[10px] mb-0.5">Invested</div>
              <div className="text-white/80 text-xs font-bold">{fmt(invested)}</div>
            </div>
            <div className="bg-teal-500/10 rounded-xl p-2 border border-teal-500/20">
              <div className="text-teal-400/70 text-[10px] mb-0.5">Returns</div>
              <div className="text-teal-400 text-xs font-bold">+{fmt(gains)}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <div className="text-white/40 text-[10px] mb-0.5">Growth</div>
              <div className="text-white/80 text-xs font-bold">{gainsPercent}%</div>
            </div>
          </div>
        </div>

        <Link
          href={`/in/sip-calculator`}
          className="flex items-center justify-center gap-2 w-full bg-[#00D4AA] hover:bg-teal-400 text-[#0A0F1E] font-bold text-sm py-2.5 rounded-xl transition-colors"
        >
          Open Full Calculator <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
