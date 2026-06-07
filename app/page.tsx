import Link from 'next/link';
import { Metadata } from 'next';
import {
  Calculator, TrendingUp, Home, Briefcase, Sun, DollarSign,
  ArrowRight, Star, Shield, Zap, Users, BarChart3, Receipt,
  CreditCard, PiggyBank, Building, Globe, FileText, CheckCircle,
  Ship, ShieldOff, MapPin,
} from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import HeroSearch from '@/components/features/HeroSearch';
import MiniSIPWidget from '@/components/features/MiniSIPWidget';
import NewsletterInlineForm from '@/components/lead-capture/NewsletterInlineForm';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'CostSmart | Free Financial Calculators — EMI, SIP, Tax & More',
  description:
    'Free online financial calculators for loans, EMI, SIP, taxes, solar ROI, salary, and 35+ more tools. India-focused. No signup. Make smarter money decisions.',
  alternates: { canonical: CANONICAL_DOMAIN },
  keywords: ['financial calculator', 'EMI calculator', 'SIP calculator', 'income tax calculator', 'loan calculator', 'free calculators online'],
};

const CALCULATOR_CATEGORIES = [
  {
    title: 'Personal Finance',
    icon: PiggyBank,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-200',
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
    border: 'border-blue-200',
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
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    border: 'border-violet-200',
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
    gradient: 'from-orange-500 to-red-500',
    border: 'border-orange-200',
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
    border: 'border-slate-200',
    calculators: [
      { name: 'Profit Margin', href: '/profit-margin-calculator', desc: 'Gross & net margins' },
      { name: 'Break-Even', href: '/break-even-calculator', desc: 'When do you profit?' },
      { name: 'Business Loan', href: '/business-loan-calculator', desc: 'EMI & total cost' },
      { name: 'Invoice Generator', href: '/invoice-generator', desc: 'Professional invoices' },
      { name: 'Landed Cost Report', href: '/for/logistics', desc: 'Total import cost to USA' },
    ],
  },
  {
    title: 'Green Energy & More',
    icon: Sun,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    border: 'border-amber-200',
    calculators: [
      { name: 'Solar ROI', href: '/solar-roi', desc: 'Payback period & savings' },
      { name: 'Shipping Cost', href: '/shipping-cost-calculator', desc: 'Freight & volumetric' },
      { name: 'Import Duty', href: '/import-duty', desc: 'Customs & taxes' },
      { name: 'Currency', href: '/currency', desc: 'Live exchange rates' },
    ],
  },
];

const TOP_TOOLS = [
  { name: 'SIP Calculator', href: '/in/sip-calculator', icon: TrendingUp, color: 'text-teal-600 bg-teal-50' },
  { name: 'EMI Calculator', href: '/in/emi-calculator', icon: Calculator, color: 'text-blue-600 bg-blue-50' },
  { name: 'Income Tax', href: '/in/income-tax-calculator', icon: Receipt, color: 'text-orange-600 bg-orange-50' },
  { name: 'Home Loan', href: '/home-loan-calculator', icon: Building, color: 'text-red-600 bg-red-50' },
  { name: 'FD Calculator', href: '/in/fd-calculator', icon: PiggyBank, color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Salary Calc', href: '/in/salary-calculator', icon: DollarSign, color: 'text-violet-600 bg-violet-50' },
  { name: 'Solar ROI', href: '/solar-roi', icon: Sun, color: 'text-amber-600 bg-amber-50' },
  { name: 'Currency', href: '/currency', icon: Globe, color: 'text-indigo-600 bg-indigo-50' },
];

const COMPARE_TOOLS = [
  { title: 'FD vs Mutual Fund', href: '/compare/fd-vs-mutual-fund', emoji: '📊', desc: 'Returns, risk & liquidity' },
  { title: 'PPF vs FD', href: '/compare/ppf-vs-fd', emoji: '🏦', desc: 'Tax savings comparison' },
  { title: 'Solar vs Wind', href: '/compare/solar-vs-wind', emoji: '⚡', desc: 'Energy ROI analysis' },
  { title: 'Rent vs Buy vs Invest', href: '/compare/rent-vs-buy-vs-invest', emoji: '🏠', desc: '20-year wealth outcome' },
];

const BLOG_POSTS = [
  { title: 'SIP vs Lump Sum: Which is Better?', href: '/blog/sip-vs-lumpsum', tag: 'Investing', tagColor: 'text-emerald-700 bg-emerald-50' },
  { title: 'New vs Old Tax Regime Explained', href: '/blog/new-vs-old-tax-regime', tag: 'Tax', tagColor: 'text-blue-700 bg-blue-50' },
  { title: 'The Real Math of Rent vs Buy', href: '/blog/rent-vs-buy-math', tag: 'Property', tagColor: 'text-orange-700 bg-orange-50' },
  { title: 'Snowball vs Avalanche Debt Method', href: '/blog/snowball-vs-avalanche', tag: 'Debt', tagColor: 'text-violet-700 bg-violet-50' },
  { title: 'How to Build a Retirement Corpus', href: '/blog/retirement-corpus-guide', tag: 'Retirement', tagColor: 'text-rose-700 bg-rose-50' },
  { title: 'PPF: The Complete Investor Guide', href: '/blog/ppf-guide', tag: 'Savings', tagColor: 'text-teal-700 bg-teal-50' },
];

const PARTNER_OFFERS = [
  {
    category: 'Investing',
    title: 'Open Free Demat Account',
    partner: 'Zerodha / Groww / INDmoney',
    desc: 'Start investing in mutual funds & stocks with ₹0 commission. Takes 5 minutes.',
    cta: 'Open Account Free',
    icon: TrendingUp,
    color: 'from-teal-500/10 to-emerald-500/10',
    accent: 'text-teal-400 border-teal-500/30',
    href: 'https://groww.in/?ref=costsmart',
  },
  {
    category: 'Loans',
    title: 'Check Home Loan Eligibility',
    partner: 'HDFC / SBI / Bajaj',
    desc: 'Best rates starting at 8.5% p.a. Instant eligibility check in 2 minutes.',
    cta: 'Check Eligibility',
    icon: Building,
    color: 'from-blue-500/10 to-indigo-500/10',
    accent: 'text-blue-400 border-blue-500/30',
    href: 'https://www.bankbazaar.com/home-loan.html?utm_source=costsmart',
  },
  {
    category: 'Savings',
    title: 'Compare FD Rates',
    partner: 'Top 20 Banks & NBFCs',
    desc: 'Up to 7.5% interest on FDs. DICGC insured up to ₹5L. No lock-in NBFCs.',
    cta: 'Compare Rates',
    icon: PiggyBank,
    color: 'from-violet-500/10 to-purple-500/10',
    accent: 'text-violet-400 border-violet-500/30',
    href: 'https://www.paisabazaar.com/fixed-deposit/?utm_source=costsmart',
  },
  {
    category: 'Insurance',
    title: 'Get Health Insurance Quote',
    partner: 'Star Health / HDFC Ergo',
    desc: 'Coverage from ₹6/day. Tax benefit under Section 80D. Family floater plans.',
    cta: 'Get Free Quote',
    icon: Shield,
    color: 'from-orange-500/10 to-red-500/10',
    accent: 'text-orange-400 border-orange-500/30',
    href: 'https://www.policybazaar.com/health-insurance/?utm_source=costsmart',
  },
];

const colorMap: Record<string, { btn: string; badge: string }> = {
  emerald: { btn: 'text-emerald-600 hover:text-emerald-700', badge: 'bg-emerald-600' },
  blue: { btn: 'text-blue-600 hover:text-blue-700', badge: 'bg-blue-600' },
  violet: { btn: 'text-violet-600 hover:text-violet-700', badge: 'bg-violet-600' },
  orange: { btn: 'text-orange-600 hover:text-orange-700', badge: 'bg-orange-500' },
  slate: { btn: 'text-slate-600 hover:text-slate-700', badge: 'bg-slate-700' },
  amber: { btn: 'text-amber-600 hover:text-amber-700', badge: 'bg-amber-500' },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════════════ */}
      {/* HERO — Deep Navy, Glassmorphism, Live Widget  */}
      {/* ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[#0A0F1E] pt-16 pb-20 px-4"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 60% -10%, rgba(0,212,170,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)
          `,
        }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">

            {/* Left column */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#00D4AA]/10 border border-[#00D4AA]/25 rounded-full px-4 py-1.5 text-[#00D4AA] text-sm font-semibold mb-6">
                <Zap className="w-3.5 h-3.5" />
                35+ Free Financial Calculators · No Signup
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-5">
                Your Money,{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #00D4AA 0%, #3B82F6 100%)' }}
                >
                  Calculated
                </span>
                <br />Perfectly.
              </h1>

              <p className="text-lg text-white/55 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                EMI, SIP, income tax, home loan, solar ROI, salary — every financial calculation
                you need. Free, instant, and privacy-first.
              </p>

              {/* Hero Search */}
              <div className="mb-8">
                <HeroSearch />
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm">
                {[
                  { icon: Star, label: 'No signup needed', color: 'text-amber-400' },
                  { icon: Shield, label: 'Zero data stored', color: 'text-[#00D4AA]' },
                  { icon: Users, label: 'Trusted daily', color: 'text-blue-400' },
                  { icon: CheckCircle, label: 'RBI & SEBI data', color: 'text-violet-400' },
                ].map(({ icon: Icon, label, color }) => (
                  <span key={label} className={`flex items-center gap-1.5 text-white/50 ${color}`}>
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                    <span className="text-white/50">{label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right column — Live SIP Widget */}
            <div className="lg:block">
              <MiniSIPWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* Quick Tool Strip                              */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100 py-5 px-4 overflow-x-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 min-w-max mx-auto justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex-shrink-0">Popular:</span>
            {TOP_TOOLS.map(tool => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`flex items-center gap-2 ${tool.color} rounded-xl px-3 py-2 text-sm font-semibold hover:opacity-80 transition-opacity flex-shrink-0`}
                >
                  <Icon className="w-4 h-4" />
                  {tool.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* Top Ad                                       */}
      {/* ══════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <AdContainer slotId="1475703853" size="leaderboard" />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* Calculator Categories Grid                   */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Browse by <span className="text-emerald-600">Category</span>
            </h2>
            <p className="text-slate-500">Every calculator you need, organized for quick access</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CALCULATOR_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const colors = colorMap[cat.color];
              return (
                <div key={cat.title}>
                  {idx === 3 && (
                    <div className="md:col-span-2 lg:col-span-3 py-4">
                      <AdContainer slotId="1475703853" size="leaderboard" />
                    </div>
                  )}
                  <div className={`bg-white border-2 ${cat.border} rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group h-full`}>
                    <div className={`bg-gradient-to-r ${cat.gradient} p-5 flex items-center gap-3`}>
                      <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-base">{cat.title}</h3>
                    </div>
                    <div className="p-4 space-y-1">
                      {cat.calculators.map(calc => (
                        <Link
                          key={calc.href}
                          href={calc.href}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
                        >
                          <div>
                            <div className="font-semibold text-slate-800 text-sm">{calc.name}</div>
                            <div className="text-xs text-slate-500">{calc.desc}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover/item:text-emerald-500 group-hover/item:translate-x-1 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 pb-4">
                      <Link href="/calculators" className={`text-sm font-bold ${colors.btn} flex items-center gap-1 transition-colors`}>
                        See all tools <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PRO VALUE PROP SECTION                       */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Do More With Pro</h2>
          <p className="text-slate-500 text-sm mb-8">Upgrade for detailed reports, unlimited lookups, and premium features</p>

          <div className="border-2 border-emerald-200 rounded-2xl p-8 bg-gradient-to-br from-emerald-50/50 to-white">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: FileText, label: 'PDF Report Export' },
                { icon: Calculator, label: 'Unlimited Calculations' },
                { icon: Sun, label: 'Rooftop Solar Analysis', sublabel: '30 lookups/day' },
                { icon: MapPin, label: 'Neighborhood Score', sublabel: 'Full details' },
                { icon: Ship, label: 'Landed Cost Reports', sublabel: 'Unlimited' },
                { icon: ShieldOff, label: 'Ad-Free Experience' },
              ].map(({ icon: Icon, label, sublabel }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-sm font-semibold text-slate-800">{label}</div>
                  {sublabel && <div className="text-xs text-slate-500">{sublabel}</div>}
                </div>
              ))}
            </div>

            <div className="text-2xl font-black text-emerald-600 mb-4">$4.99/month</div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white rounded-full px-8 py-3 font-bold hover:bg-emerald-700 transition-colors"
            >
              Upgrade Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* AFFILIATE PARTNERS SECTION (Revenue Engine)  */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-[#0A0F1E] py-16 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,212,170,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#00D4AA]/10 border border-[#00D4AA]/20 rounded-full px-3 py-1 text-[#00D4AA] text-xs font-bold uppercase tracking-widest mb-4">
              Trusted Partners
            </div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Ready to Take Action?</h2>
            <p className="text-white/40 text-sm">Our vetted partners help you execute your financial plan</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTNER_OFFERS.map(offer => {
              const Icon = offer.icon;
              return (
                <div
                  key={offer.title}
                  className={`relative bg-gradient-to-br ${offer.color} border ${offer.accent} rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-200 overflow-hidden group`}
                >
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">{offer.partner}</div>
                  <div className={`w-8 h-8 bg-white/5 border ${offer.accent} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${offer.accent.split(' ')[0]}`} />
                  </div>
                  <div className="font-bold text-white text-sm mb-2 leading-snug">{offer.title}</div>
                  <p className="text-white/45 text-xs leading-relaxed mb-4">{offer.desc}</p>
                  <a
                    href={offer.href}
                    rel="noopener noreferrer sponsored"
                    className={`inline-flex items-center gap-1.5 text-xs font-bold ${offer.accent.split(' ')[0]} hover:opacity-80 transition-opacity`}
                  >
                    {offer.cta} <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
          <p className="text-center text-white/20 text-xs mt-6">
            * CostSmart may earn a referral commission. This does not influence our calculator results or editorial content.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* Compare Tools                                 */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-white border-y border-slate-100 py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              <span className="text-emerald-600">Compare</span> Financial Options
            </h2>
            <p className="text-slate-500 text-sm">Side-by-side analysis to make the right choice</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPARE_TOOLS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl p-5 text-center transition-all hover:shadow-md hover:-translate-y-0.5 group"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="font-bold text-slate-800 text-sm mb-1">{item.title}</div>
                <div className="text-xs text-slate-500 mb-3">{item.desc}</div>
                <div className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center justify-center gap-1">
                  Compare Now <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* Ad Break                                      */}
      {/* ══════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 max-w-4xl py-10">
        <AdContainer slotId="1475703853" size="rectangle" />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* Blog Highlights                              */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
              Financial <span className="text-emerald-600">Guides</span>
            </h2>
            <p className="text-slate-500 text-sm">In-depth articles to sharpen your money knowledge</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_POSTS.map(post => (
              <Link
                key={post.href}
                href={post.href}
                className="group bg-white border border-slate-200 hover:border-emerald-200 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${post.tagColor}`}>
                  {post.tag}
                </span>
                <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug text-[15px]">
                  {post.title}
                </h3>
                <div className="mt-4 text-xs text-slate-400 flex items-center gap-1 font-semibold group-hover:text-emerald-600 transition-colors">
                  <BarChart3 className="w-3 h-3" /> Read article <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full font-bold hover:bg-slate-700 transition-colors text-sm"
            >
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* Newsletter Inline Form                       */}
      {/* ══════════════════════════════════════════════ */}
      <NewsletterInlineForm />

      {/* ══════════════════════════════════════════════ */}
      {/* Trust Section — Stats-based                  */}
      {/* ══════════════════════════════════════════════ */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #059669 0%, #0D9488 50%, #0891B2 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="container mx-auto max-w-5xl text-center relative">
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Why CostSmart?</h2>
          <p className="text-emerald-100 mb-10 text-sm">
            Built for accuracy, designed for speed. All calculators use official RBI, SEBI, and government data.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { number: '35+', label: 'Free Calculators', icon: Calculator },
              { number: 'RBI', label: 'Verified Data', icon: Shield },
              { number: '100%', label: 'Privacy First', icon: FileText },
              { number: '₹ $', label: 'India & Global', icon: Globe },
            ].map(({ number, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-1">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-black text-white">{number}</div>
                <div className="text-emerald-100 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* Final CTA                                    */}
      {/* ══════════════════════════════════════════════ */}
      <section className="bg-[#0A0F1E] py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-black text-white mb-3 tracking-tight">
            All 35+ Calculators. Free. Forever.
          </h2>
          <p className="text-white/45 mb-8 text-sm">
            From salary breakdowns to solar payback — we have the right tool for every financial question.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center gap-2 bg-[#00D4AA] text-[#0A0F1E] px-8 py-3.5 rounded-full font-black hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20 text-sm"
            >
              <Calculator className="w-4 h-4" /> Browse All Tools
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-2 bg-white/8 text-white border border-white/15 px-8 py-3.5 rounded-full font-bold hover:bg-white/12 transition-colors text-sm"
            >
              <BarChart3 className="w-4 h-4" /> Compare Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
