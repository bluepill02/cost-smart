"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Zap, Menu, X, ChevronDown } from 'lucide-react';

const CALC_GROUPS = [
  {
    label: 'Personal Finance',
    items: [
      { name: 'Loan Calculator', href: '/loan-calculator' },
      { name: 'Retirement', href: '/retirement-calculator' },
      { name: 'Emergency Fund', href: '/emergency-fund-calculator' },
      { name: 'Debt Payoff', href: '/debt-payoff-calculator' },
    ],
  },
  {
    label: 'India Calculators',
    items: [
      { name: 'EMI Calculator', href: '/in/emi-calculator' },
      { name: 'SIP Calculator', href: '/in/sip-calculator' },
      { name: 'Income Tax', href: '/in/income-tax-calculator' },
      { name: 'GST Calculator', href: '/in/gst-calculator' },
      { name: 'PPF Calculator', href: '/in/ppf-calculator' },
      { name: 'FD Calculator', href: '/in/fd-calculator' },
    ],
  },
  {
    label: 'Property & Energy',
    items: [
      { name: 'Home Loan', href: '/home-loan-calculator' },
      { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
      { name: 'Solar ROI', href: '/solar-roi' },
      { name: 'Renovation Cost', href: '/home-renovation-cost-estimator' },
    ],
  },
  {
    label: 'Business',
    items: [
      { name: 'Profit Margin', href: '/profit-margin-calculator' },
      { name: 'Break-Even', href: '/break-even-calculator' },
      { name: 'Business Loan', href: '/business-loan-calculator' },
      { name: 'Invoice Generator', href: '/invoice-generator' },
      { name: 'Import Duty', href: '/import-duty' },
      { name: 'Currency', href: '/currency' },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="bg-emerald-600 text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            Cost<span className="text-emerald-600">Smart</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">

          {/* Calculators Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50"
              aria-expanded={dropdownOpen}
            >
              Calculators <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[680px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6 z-50">
                {CALC_GROUPS.map((group) => (
                  <div key={group.label}>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      {group.label}
                    </div>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block text-sm text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-2 border-t border-slate-100 pt-3 flex justify-between items-center">
                  <span className="text-xs text-slate-400">30+ free calculators</span>
                  <Link
                    href="/calculators"
                    className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    View All →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/compare" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50">
            Compare
          </Link>
          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50">
            About
          </Link>
          <Link
            href="/calculators"
            className="ml-2 bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            All Tools
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 shadow-lg max-h-[80vh] overflow-y-auto">
          {CALC_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-1">
                {group.label}
              </div>
              <div className="grid grid-cols-2 gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-slate-700 hover:text-emerald-600 px-2 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-slate-100 pt-3 grid grid-cols-3 gap-2">
            <Link href="/compare" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-600 hover:text-emerald-600 text-center py-2">Compare</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-600 hover:text-emerald-600 text-center py-2">Blog</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-600 hover:text-emerald-600 text-center py-2">About</Link>
          </div>
          <Link
            href="/calculators"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center bg-emerald-600 text-white text-sm font-bold px-4 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Browse All 30+ Calculators
          </Link>
        </div>
      )}
    </nav>
  );
}
