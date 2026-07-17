"use client";

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-14 pb-6 border-t border-slate-800">
      <div className="container mx-auto px-4">

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-3">CostSmart</h3>
            <p className="text-sm leading-relaxed mb-4">
              Free financial calculators for loans, taxes, investments & more.
              Trusted data, instant results.
            </p>
            <div className="flex flex-col gap-1 text-xs">
              <a href="mailto:hello@costsmart.co" className="hover:text-emerald-400 transition-colors">
                📧 Contact Us
              </a>
            </div>
          </div>

          {/* Personal Finance */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Personal Finance</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/loan-calculator" className="hover:text-emerald-400 transition-colors">Loan Calculator</Link></li>
              <li><Link href="/emergency-fund-calculator" className="hover:text-emerald-400 transition-colors">Emergency Fund</Link></li>
              <li><Link href="/debt-payoff-calculator" className="hover:text-emerald-400 transition-colors">Debt Payoff</Link></li>
              <li><Link href="/retirement-calculator" className="hover:text-emerald-400 transition-colors">Retirement</Link></li>
              <li><Link href="/investment-calculator" className="hover:text-emerald-400 transition-colors">Investment</Link></li>
              <li><Link href="/inflation" className="hover:text-emerald-400 transition-colors">Inflation</Link></li>
            </ul>
          </div>

          {/* India Calculators */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">India Calculators</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/in/emi-calculator" className="hover:text-emerald-400 transition-colors">EMI Calculator</Link></li>
              <li><Link href="/in/sip-calculator" className="hover:text-emerald-400 transition-colors">SIP Calculator</Link></li>
              <li><Link href="/in/income-tax-calculator" className="hover:text-emerald-400 transition-colors">Income Tax</Link></li>
              <li><Link href="/in/fd-calculator" className="hover:text-emerald-400 transition-colors">FD Calculator</Link></li>
              <li><Link href="/in/ppf-calculator" className="hover:text-emerald-400 transition-colors">PPF Calculator</Link></li>
              <li><Link href="/in/gst-calculator" className="hover:text-emerald-400 transition-colors">GST Calculator</Link></li>
              <li><Link href="/in/salary-calculator" className="hover:text-emerald-400 transition-colors">Salary Calculator</Link></li>
            </ul>
          </div>

          {/* Property & Business */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Property & Business</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/home-loan-calculator" className="hover:text-emerald-400 transition-colors">Home Loan EMI</Link></li>
              <li><Link href="/rent-vs-buy-calculator" className="hover:text-emerald-400 transition-colors">Rent vs Buy</Link></li>
              <li><Link href="/solar-roi" className="hover:text-emerald-400 transition-colors">Solar ROI</Link></li>
              <li><Link href="/profit-margin-calculator" className="hover:text-emerald-400 transition-colors">Profit Margin</Link></li>
              <li><Link href="/break-even-calculator" className="hover:text-emerald-400 transition-colors">Break-Even</Link></li>
              <li><Link href="/import-duty" className="hover:text-emerald-400 transition-colors">Import Duty</Link></li>
              <li><Link href="/currency" className="hover:text-emerald-400 transition-colors">Currency</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Resources</h4>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/calculators" className="hover:text-emerald-400 transition-colors">All Calculators</Link></li>
              <li><Link href="/compare" className="hover:text-emerald-400 transition-colors">Compare Tools</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Financial Blog</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {currentYear} CostSmart. All rights reserved.</p>
          <p className="opacity-50 max-w-2xl text-center">
            <strong>Disclaimer:</strong> All calculators provide estimates for informational purposes only.
            Not financial advice. Consult a qualified professional before making financial decisions.
            Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
