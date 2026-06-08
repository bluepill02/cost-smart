import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator, TrendingUp, Home, Briefcase, Sun,
  Receipt, PiggyBank, ArrowRight, Zap,
  BarChart3, Shield,
} from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';


export const metadata: Metadata = {
  title: 'All Financial Calculators - Free Online Tools | CostSmart',
  description:
    'Browse all 30+ free financial calculators: EMI, SIP, income tax, salary, solar ROI, loan, FD, GST, profit margin, and more. No signup required.',
  openGraph: {
    title: 'All Free Financial Calculators | CostSmart',
    description: 'Browse all 35+ free financial calculators: EMI, SIP, income tax, salary, PPF, FD, GST, retirement, property, solar ROI, and more — all India-focused.',
    url: 'https://cost-smart-five.vercel.app/calculators',
    type: 'website',
  },
  alternates: { canonical: `https://cost-smart-five.vercel.app/calculators` },
  keywords: [
    'financial calculators india',
    'free calculator online',
    'EMI calculator',
    'SIP calculator',
    'income tax calculator',
    'loan calculator',
  ],
};

const ALL_CALCULATORS = [
  {
    category: 'Personal Finance',
    icon: PiggyBank,
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-600',
    headerBg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    tools: [
      { name: 'Loan Calculator', href: '/loan-calculator', desc: 'Monthly payments, total interest & extra payment impact', badge: 'Popular' },
      { name: 'Retirement Calculator', href: '/retirement-calculator', desc: 'Project corpus needed for comfortable retirement' },
      { name: 'Emergency Fund Calculator', href: '/emergency-fund-calculator', desc: '3-6 months expenses — how much do you need?' },
      { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator', desc: 'Snowball vs avalanche — find your debt-free date', badge: 'New' },
      { name: 'Investment Calculator', href: '/investment-calculator', desc: 'Compound growth over any time horizon' },
      { name: 'Inflation Calculator', href: '/inflation', desc: 'How purchasing power changes over time' },
    ],
  },
  {
    category: 'Indian Taxes & Finance',
    icon: Receipt,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    headerBg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    tools: [
      { name: 'EMI Calculator', href: '/in/emi-calculator', desc: 'Loan EMI, total interest & amortisation schedule', badge: 'Popular' },
      { name: 'Income Tax Calculator', href: '/in/income-tax-calculator', desc: 'New vs old regime comparison for FY 2024-25', badge: 'Popular' },
      { name: 'SIP Calculator', href: '/in/sip-calculator', desc: 'Mutual fund SIP returns with inflation adjustment', badge: 'Popular' },
      { name: 'Salary Calculator', href: '/in/salary-calculator', desc: 'CTC to in-hand salary with all deductions' },
      { name: 'GST Calculator', href: '/in/gst-calculator', desc: 'Inclusive/exclusive GST computation' },
      { name: 'GST Input Credit', href: '/in/gst-input-credit-calculator', desc: 'Net GST payable after input tax credit' },
      { name: 'TDS Calculator', href: '/in/tds-calculator', desc: 'TDS deducted at source on various incomes' },
    ],
  },
  {
    category: 'Savings & Investment',
    icon: TrendingUp,
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
    headerBg: 'bg-gradient-to-r from-purple-500 to-pink-600',
    tools: [
      { name: 'FD Calculator', href: '/in/fd-calculator', desc: 'Fixed deposit maturity with compounding options', badge: 'Popular' },
      { name: 'PPF Calculator', href: '/in/ppf-calculator', desc: '15-year PPF growth with partial withdrawal' },
      { name: 'FD vs Mutual Fund', href: '/compare/fd-vs-mutual-fund', desc: 'Returns, risk & tax — side-by-side comparison' },
      { name: 'PPF vs FD', href: '/compare/ppf-vs-fd', desc: 'Tax savings showdown — which wins?' },
    ],
  },
  {
    category: 'Property & Real Estate',
    icon: Home,
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-600',
    headerBg: 'bg-gradient-to-r from-orange-500 to-red-600',
    tools: [
      { name: 'Home Loan Calculator', href: '/home-loan-calculator', desc: 'EMI, total interest & prepayment savings', badge: 'Popular' },
      { name: 'Rent vs Buy Calculator', href: '/rent-vs-buy-calculator', desc: '20-year NPV comparison: rent, buy, or invest' },
      { name: 'Home Renovation Cost', href: '/home-renovation-cost-estimator', desc: 'Room-by-room renovation cost estimator' },
      { name: 'Stamp Duty Calculator', href: '/in/stamp-duty-calculator', desc: 'State-wise stamp duty rates on property' },
      { name: 'Property Registration', href: '/in/property-registration-cost-calculator', desc: 'Registration charges by state' },
      { name: 'Property Tax Calculator', href: '/in/property-tax-calculator', desc: 'Municipal property tax estimation' },
      { name: 'Rent vs Buy vs Invest', href: '/compare/rent-vs-buy-vs-invest', desc: '3-way: rent + invest vs buy outright', badge: 'New' },
    ],
  },
  {
    category: 'Business & Trade',
    icon: Briefcase,
    color: 'slate',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    iconColor: 'text-slate-700',
    headerBg: 'bg-gradient-to-r from-slate-600 to-slate-800',
    tools: [
      { name: 'Profit Margin Calculator', href: '/profit-margin-calculator', desc: 'Gross, operating & net profit margins' },
      { name: 'Break-Even Calculator', href: '/break-even-calculator', desc: 'Units needed to cover all costs' },
      { name: 'Business Loan Calculator', href: '/business-loan-calculator', desc: 'EMI & total cost for business financing' },
      { name: 'Invoice Generator', href: '/invoice-generator', desc: 'Professional GST invoices — ready to print' },
      { name: 'Freelance Rate Calculator', href: '/freelance-rate-calculator', desc: 'Hourly rate based on desired income' },
      { name: 'Shipping Cost Calculator', href: '/shipping-cost-calculator', desc: 'Volumetric weight & freight cost' },
    ],
  },
  {
    category: 'Green Energy & Currency',
    icon: Sun,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    headerBg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    tools: [
      { name: 'Solar ROI Calculator', href: '/solar-roi', desc: 'Payback period, savings & subsidies by city', badge: 'Popular' },
      { name: 'Solar vs Wind Energy', href: '/compare/solar-vs-wind', desc: 'Energy ROI & feasibility comparison' },
      { name: 'Import Duty Calculator', href: '/import-duty', desc: 'Customs duty + IGST on imports to India' },
      { name: 'Currency Converter', href: '/currency', desc: 'Live exchange rates for 150+ currencies' },
    ],
  },
  {
    category: 'Utility Bills',
    icon: Zap,
    color: 'cyan',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    iconColor: 'text-cyan-600',
    headerBg: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    tools: [
      { name: 'Electricity Bill Calculator', href: '/in/electricity-bill-calculator', desc: 'Monthly electricity bill by state & usage' },
      { name: 'Water Bill Calculator', href: '/in/water-bill-calculator', desc: 'Water usage and billing estimate' },
      { name: 'LPG Subsidy Calculator', href: '/in/lpg-subsidy-calculator', desc: 'Monthly LPG subsidy & refill cost' },
      { name: 'Moving Cost Calculator', href: '/moving-cost-calculator', desc: 'Home shifting cost by distance & volume' },
      { name: 'Global Salary Converter', href: '/global-salary-converter', desc: 'Compare salaries across countries' },
    ],
  },
];

const colorVariants: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
};

export default function AllCalculatorsPage() {
  const totalCount = ALL_CALCULATORS.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-900 text-white py-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-emerald-300 text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            {totalCount}+ Free Calculators
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            All Financial Calculators
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Every calculator you need to make smarter money decisions — completely free, no signup required.
          </p>
        </div>
      </section>

      {/* Top Ad */}
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <AdContainer slotId="1706594832" size="leaderboard" />
      </div>

      {/* Quick jump links */}
      <div className="container mx-auto px-4 max-w-5xl mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap gap-2">
          <span className="text-sm font-semibold text-slate-500 mr-2 self-center">Jump to:</span>
          {ALL_CALCULATORS.map((cat) => (
            <a
              key={cat.category}
              href={`#${cat.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors hover:opacity-80 ${colorVariants[cat.color]}`}
            >
              {cat.category}
            </a>
          ))}
        </div>
      </div>

      {/* Calculator Categories */}
      <div className="container mx-auto px-4 max-w-5xl space-y-10 pb-16">
        {ALL_CALCULATORS.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={cat.category}>
              {/* Mid-content ad every 3 categories */}
              {idx === 3 && (
                <div className="py-4">
                  <AdContainer slotId="1475703853" size="leaderboard" />
                </div>
              )}

              <section
                id={cat.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Category Header */}
                <div className={`${cat.headerBg} px-6 py-4 flex items-center gap-3`}>
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl">{cat.category}</h2>
                    <p className="text-white/70 text-xs">{cat.tools.length} calculators</p>
                  </div>
                </div>

                {/* Tools Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group p-5 hover:bg-slate-50 transition-colors flex flex-col gap-2 relative"
                    >
                      {tool.badge && (
                        <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full border ${colorVariants[cat.color]}`}>
                          {tool.badge}
                        </span>
                      )}
                      <div className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors pr-12">
                        {tool.name}
                      </div>
                      <div className="text-sm text-slate-500 leading-snug">{tool.desc}</div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all mt-auto">
                        Open calculator <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          );
        })}
      </div>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 max-w-5xl pb-8">
        <AdContainer slotId="1475703853" size="rectangle" />
      </div>

      {/* Trust Section */}
      <section className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why Use <span className="text-emerald-600">CostSmart</span> Calculators?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {[
              { icon: Shield, title: '100% Private', desc: 'All calculations happen in your browser. Zero data stored.' },
              { icon: BarChart3, title: 'Accurate Data', desc: 'Updated with RBI, SEBI & government sources regularly.' },
              { icon: Zap, title: 'Instant Results', desc: 'No loading, no signup. Just type and get answers.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="font-bold text-slate-800">{item.title}</div>
                  <div className="text-sm text-slate-500 text-center">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
