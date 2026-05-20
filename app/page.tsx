import Link from 'next/link';
import { Metadata } from 'next';
import {
  Calculator, TrendingUp, Home, Briefcase, Sun, DollarSign,
  Shield, Zap, ArrowRight, Star, Users, BarChart3, Receipt,
  CreditCard, PiggyBank, Building, Truck, Globe, FileText,
} from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'CostSmart - Free Financial Calculators | Loans, Taxes, Investments & More',
  description:
    'Free online financial calculators for loans, EMI, SIP, taxes, solar ROI, salary, and 30+ more tools. Make smarter money decisions with CostSmart.',
  alternates: {
    canonical: CANONICAL_DOMAIN,
  },
  keywords: [
    'financial calculator',
    'EMI calculator',
    'loan calculator',
    'SIP calculator',
    'income tax calculator',
    'solar ROI calculator',
    'salary calculator India',
    'free calculators online',
  ],
};

const CALCULATOR_CATEGORIES = [
  {
    title: 'Personal Finance',
    icon: PiggyBank,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 border-emerald-200',
    calculators: [
      { name: 'Loan Calculator', href: '/loan-calculator', desc: 'Monthly payments & total cost' },
      { name: 'Emergency Fund', href: '/emergency-fund-calculator', desc: 'How much to save' },
      { name: 'Debt Payoff', href: '/debt-payoff-calculator', desc: 'Snowball vs avalanche' },
      { name: 'Retirement', href: '/retirement-calculator', desc: 'Plan your nest egg' },
    ],
  },
  {
    title: 'Indian Taxes & Finance',
    icon: Receipt,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 border-blue-200',
    calculators: [
      { name: 'EMI Calculator', href: '/in/emi-calculator', desc: 'Loan EMI calculator' },
      { name: 'Income Tax', href: '/in/income-tax-calculator', desc: 'New vs old tax regime' },
      { name: 'SIP Calculator', href: '/in/sip-calculator', desc: 'Mutual fund returns' },
      { name: 'GST Calculator', href: '/in/gst-calculator', desc: 'GST inclusive/exclusive' },
    ],
  },
  {
    title: 'Investment & Savings',
    icon: TrendingUp,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    bg: 'bg-purple-50 border-purple-200',
    calculators: [
      { name: 'FD Calculator', href: '/in/fd-calculator', desc: 'Fixed deposit returns' },
      { name: 'PPF Calculator', href: '/in/ppf-calculator', desc: '15-year PPF growth' },
      { name: 'Investment', href: '/investment-calculator', desc: 'Compound growth' },
      { name: 'Inflation', href: '/inflation', desc: 'Real value of money' },
    ],
  },
  {
    title: 'Property & Real Estate',
    icon: Home,
    color: 'orange',
    gradient: 'from-orange-500 to-red-600',
    bg: 'bg-orange-50 border-orange-200',
    calculators: [
      { name: 'Home Loan', href: '/home-loan-calculator', desc: 'EMI & total interest' },
      { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator', desc: '20-year comparison' },
      { name: 'Renovation Cost', href: '/home-renovation-cost-estimator', desc: 'Room-by-room estimate' },
      { name: 'Stamp Duty', href: '/in/stamp-duty-calculator', desc: 'State-wise rates' },
    ],
  },
  {
    title: 'Business & Trade',
    icon: Briefcase,
    color: 'slate',
    gradient: 'from-slate-600 to-slate-800',
    bg: 'bg-slate-50 border-slate-200',
    calculators: [
      { name: 'Profit Margin', href: '/profit-margin-calculator', desc: 'Gross & net margins' },
      { name: 'Break-Even', href: '/break-even-calculator', desc: 'When do you profit?' },
      { name: 'Business Loan', href: '/business-loan-calculator', desc: 'EMI & total cost' },
      { name: 'Invoice Generator', href: '/invoice-generator', desc: 'Professional invoices' },
    ],
  },
  {
    title: 'Green Energy & Travel',
    icon: Sun,
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-500',
    bg: 'bg-yellow-50 border-yellow-200',
    calculators: [
      { name: 'Solar ROI', href: '/solar-roi', desc: 'Payback period & savings' },
      { name: 'Shipping Cost', href: '/shipping-cost-calculator', desc: 'Freight & volumetric' },
      { name: 'Import Duty', href: '/import-duty', desc: 'Customs & taxes' },
      { name: 'Currency', href: '/currency', desc: 'Live exchange rates' },
    ],
  },
];

const FEATURED_TOOLS = [
  { name: 'SIP Calculator', href: '/in/sip-calculator', icon: TrendingUp, badge: 'Popular' },
  { name: 'EMI Calculator', href: '/in/emi-calculator', icon: Calculator, badge: 'Popular' },
  { name: 'Income Tax', href: '/in/income-tax-calculator', icon: Receipt, badge: 'India' },
  { name: 'Solar ROI', href: '/solar-roi', icon: Sun, badge: 'New' },
  { name: 'Loan Calculator', href: '/loan-calculator', icon: CreditCard, badge: 'Popular' },
  { name: 'FD Calculator', href: '/in/fd-calculator', icon: PiggyBank, badge: 'Popular' },
  { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator', icon: Building, badge: 'India' },
  { name: 'Freelance Rate', href: '/freelance-rate-calculator', icon: DollarSign, badge: 'New' },
];

const colorMap: Record<string, { icon: string; border: string; badge: string; btn: string }> = {
  emerald: {
    icon: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200',
    badge: 'bg-emerald-600',
    btn: 'text-emerald-700 hover:text-emerald-900',
  },
  blue: {
    icon: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200',
    badge: 'bg-blue-600',
    btn: 'text-blue-700 hover:text-blue-900',
  },
  purple: {
    icon: 'bg-purple-100 text-purple-700',
    border: 'border-purple-200',
    badge: 'bg-purple-600',
    btn: 'text-purple-700 hover:text-purple-900',
  },
  orange: {
    icon: 'bg-orange-100 text-orange-700',
    border: 'border-orange-200',
    badge: 'bg-orange-500',
    btn: 'text-orange-700 hover:text-orange-900',
  },
  slate: {
    icon: 'bg-slate-200 text-slate-700',
    border: 'border-slate-200',
    badge: 'bg-slate-700',
    btn: 'text-slate-700 hover:text-slate-900',
  },
  yellow: {
    icon: 'bg-yellow-100 text-yellow-700',
    border: 'border-yellow-200',
    badge: 'bg-yellow-500',
    btn: 'text-yellow-700 hover:text-yellow-900',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-emerald-300 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            30+ Free Financial Calculators
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Smart Financial{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Decisions Start Here
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Loans, EMI, SIP, taxes, solar ROI, salary — calculate everything you need
            to make confident money moves. Free. No signup required.
          </p>

          {/* Quick-access CTA strip */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {FEATURED_TOOLS.slice(0, 4).map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-all hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  {tool.name}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400" /> No signup needed</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-400" /> No data stored</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-blue-400" /> Trusted by thousands</span>
          </div>
        </div>
      </section>

      {/* ── Top Ad ── */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <AdContainer slotId="1475703853" size="leaderboard" />
      </div>

      {/* ── Featured Quick Tools ── */}
      <section className="container mx-auto px-4 max-w-6xl mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Most Used Calculators</h2>
          <p className="text-slate-500 mt-2">Jump straight to the tools our users love most</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {FEATURED_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 bg-emerald-50 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{tool.name}</div>
                  <span className="inline-block mt-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                    {tool.badge}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Calculator Categories ── */}
      <section className="container mx-auto px-4 max-w-6xl mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Browse by <span className="text-emerald-600">Category</span>
          </h2>
          <p className="text-slate-500 mt-2">Every calculator you need, organized for easy discovery</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CALCULATOR_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const colors = colorMap[cat.color];
            return (
              <div key={cat.title}>
                {/* Mid-content ad after 3rd category */}
                {idx === 3 && (
                  <div className="md:col-span-2 lg:col-span-3 py-4">
                    <AdContainer slotId="1475703853" size="leaderboard" />
                  </div>
                )}
                <div className={`bg-white border-2 ${colors.border} rounded-2xl overflow-hidden hover:shadow-xl transition-all group`}>
                  {/* Category header */}
                  <div className={`bg-gradient-to-r ${cat.gradient} p-5 flex items-center gap-3`}>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg">{cat.title}</h3>
                  </div>

                  {/* Calculator list */}
                  <div className="p-4 space-y-2">
                    {cat.calculators.map((calc) => (
                      <Link
                        key={calc.href}
                        href={calc.href}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
                      >
                        <div>
                          <div className="font-medium text-slate-800 text-sm">{calc.name}</div>
                          <div className="text-xs text-slate-500">{calc.desc}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover/item:text-emerald-600 group-hover/item:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>

                  {/* See all link */}
                  <div className={`px-4 pb-4`}>
                    <Link
                      href="/calculators"
                      className={`text-sm font-semibold ${colors.btn} flex items-center gap-1 transition-colors`}
                    >
                      See all tools <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Ad Break ── */}
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <AdContainer slotId="1475703853" size="rectangle" />
      </div>

      {/* ── Comparison Pages ── */}
      <section className="bg-white border-y border-slate-200 py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              <span className="text-emerald-600">Compare</span> Financial Options
            </h2>
            <p className="text-slate-500 mt-2">Side-by-side analysis to make the right choice</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'FD vs Mutual Fund', href: '/compare/fd-vs-mutual-fund', icon: '📊', desc: 'Returns, risk & liquidity' },
              { title: 'PPF vs FD', href: '/compare/ppf-vs-fd', icon: '🏦', desc: 'Tax savings comparison' },
              { title: 'Solar vs Wind', href: '/compare/solar-vs-wind', icon: '⚡', desc: 'Energy ROI analysis' },
              { title: 'Rent vs Buy vs Invest', href: '/compare/rent-vs-buy-vs-invest', icon: '🏠', desc: '20-year wealth outcome' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl p-5 text-center transition-all hover:shadow-md group"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-slate-800 text-sm mb-1">{item.title}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
                <div className="mt-3 text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                  Compare Now →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Highlights ── */}
      <section className="container mx-auto px-4 max-w-6xl py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Financial <span className="text-emerald-600">Guides</span>
          </h2>
          <p className="text-slate-500 mt-2">In-depth articles to sharpen your money knowledge</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'SIP vs Lump Sum: Which is Better?', href: '/blog/sip-vs-lumpsum', tag: 'Investment' },
            { title: 'New vs Old Tax Regime Explained', href: '/blog/new-vs-old-tax-regime', tag: 'Taxes' },
            { title: 'Rent vs Buy: The Real Math', href: '/blog/rent-vs-buy-math', tag: 'Property' },
            { title: 'Snowball vs Avalanche Debt Method', href: '/blog/snowball-vs-avalanche', tag: 'Debt' },
            { title: 'Ultimate Guide to Retirement Corpus', href: '/blog/retirement-corpus-guide', tag: 'Retirement' },
            { title: 'PPF: Complete Investor Guide', href: '/blog/ppf-guide', tag: 'Savings' },
          ].map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group bg-white border border-slate-200 hover:border-emerald-200 rounded-2xl p-6 transition-all hover:shadow-lg"
            >
              <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full mb-3">
                {post.tag}
              </span>
              <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug">
                {post.title}
              </h3>
              <div className="mt-3 text-xs text-slate-400 flex items-center gap-1">
                <BarChart3 className="w-3 h-3" /> Read article →
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-700 transition-colors"
          >
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-14 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why CostSmart?</h2>
          <p className="text-emerald-100 mb-10 max-w-xl mx-auto">
            Built for accuracy, designed for speed. All calculators use official RBI, SEBI, and government data.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Shield, label: 'Privacy First', desc: 'No data stored or sold. Ever.' },
              { icon: Calculator, label: '30+ Calculators', desc: 'Covering every money decision.' },
              { icon: Globe, label: 'India & Global', desc: 'INR, USD, EUR, and more.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-lg">{item.label}</div>
                  <div className="text-emerald-100 text-sm">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom Ad ── */}
      <div className="container mx-auto px-4 max-w-4xl py-8">
        <AdContainer slotId="1475703853" size="leaderboard" />
      </div>

      {/* ── All Tools CTA ── */}
      <section className="container mx-auto px-4 max-w-4xl pb-16 text-center">
        <div className="bg-white border-2 border-emerald-200 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">See All 30+ Calculators</h2>
          <p className="text-slate-500 mb-6">
            From salary breakdowns to solar payback — we have the tool for every financial question.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              <Calculator className="w-5 h-5" /> Browse All Tools
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors"
            >
              <BarChart3 className="w-5 h-5" /> Compare Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
