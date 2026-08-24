import { Metadata } from 'next';
import Link from 'next/link';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';
import { ArrowRight, BookOpen, TrendingUp, Home, Receipt, Briefcase, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial Blog | CostSmart — Money, Tax & Investment Guides',
  description:
    'Free guides on SIP vs Lumpsum, EMI, income tax, rent vs buy, debt payoff, and more. Written by financial experts to help you make smarter money decisions.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Financial Blog | CostSmart',
    description: 'Expert guides on investments, loans, taxes and savings.',
    url: `${CANONICAL_DOMAIN}/blog`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Financial Blog | CostSmart' }],
  },
};

const FEATURED = [
  {
    slug: 'sp500-vs-treasury-bills-2026',
    title: 'S&P 500 vs 3.7% T-Bills: Where to Invest Cash in 2026',
    desc: 'With 13-week Treasury Bills at 3.71% and the S&P 500 returning 18.67% over the last year, where should you park your cash in 2026? A data-driven guide.',
    tag: 'Investing',
    color: 'blue',
  },
  {
    slug: '2026-tax-strategies-guide',
    title: '2026 Tax Strategies Guide: Navigating New Brackets & Deductions',
    desc: 'Master the 2026 tax landscape with our expert guide. We break down the new $16,100 standard deduction, 37% top bracket, and updated retirement limits so you can keep more of your money.',
    tag: 'Tax',
    color: 'blue',
  },
  {
    slug: '2026-retirement-contribution-limits',
    title: '2026 Retirement Plan Contribution Limits: How to Maximize 401(k)s, IRAs, and HSAs',
    desc: 'The IRS has raised 401(k) and IRA contribution limits for 2026. Discover how to adapt your strategy for $24,500 401(k) limits, $7,500 IRAs, and updated HSA ceilings.',
    tag: 'Investing',
    color: 'emerald',
  },
  {
    slug: 'us-fed-interest-rates-2026',
    title: 'Fed Interest Rate Decision July 2026: 3.75% Rates Hold Steady',
    desc: 'The Federal Reserve kept interest rates at 3.50%-3.75% in July 2026. Discover how this affects your mortgage, credit cards, and high-yield savings.',
    tag: 'Market News',
    color: 'blue',
  },
  {
    slug: '2026-tax-and-inflation-guide',
    title: 'The 2026 Tax and Cost of Living Survival Guide',
    desc: 'Tax brackets are shifting, standard deductions are rising, and the OBBBA is rewriting the rules. Here is exactly how 2026 inflation and tax changes impact your bottom line.',
    tag: 'Tax',
    color: 'blue',
  },
  {
    slug: 'interest-rates-2026-strategy',
    title: 'Where to Park Cash With 3.75% Rates in 2026',
    desc: 'The Federal Reserve has paused the Fed Funds rate at 3.75% in July 2026. Here is exactly how to restructure your savings, investments, and debt.',
    tag: 'Investing',
    color: 'emerald',
  },
  {
    slug: 'mortgage-rates-2026-guide',
    title: '2026 Mortgage Rates Guide: Lock, Float, or Wait?',
    desc: 'Are 2026 mortgage rates dropping? Discover the real numbers, historical comparisons, and proven strategies to handle today\'s 6.5%+ housing market.',
    tag: 'Home & Property',
    color: 'emerald',
  },
  {
    slug: 'emergency-fund-rule-2026',
    title: 'The 2026 Emergency Fund Rule: How Many Months of Expenses You Really Need',
    desc: 'A current, source-backed guide to sizing your cash buffer against inflation, job-market frictions, and safe-yield reality.',
    tag: 'Savings',
    color: 'teal',
  },
  {
    slug: 'new-tax-regime-2026-salary-guide',
    title: 'New Tax Regime 2026: Where Salaried Savers Should Park Cash',
    desc: 'A current, source-backed guide to the 2026 salary-tax reset and the cash ladder that beats tax drag.',
    tag: 'Tax',
    color: 'emerald',
  },
  {
    slug: 'cash-buffer-that-still-wins',
    title: 'The Cash Buffer That Still Wins',
    desc: 'A witty, data-backed guide to building an emergency fund that survives inflation and bad timing.',
    tag: 'Savings',
    color: 'teal',
  },
  {
    slug: 'sip-vs-lumpsum',
    title: 'SIP vs Lumpsum: Which Strategy Wins?',
    desc: 'Compare Systematic Investment Plans vs one-time lumpsum investing for mutual funds.',
    tag: 'Investing',
    color: 'emerald',
  },
  {
    slug: '2026-mortgage-rates-real-estate-strategy',
    title: '2026 Mortgage Rates & Real Estate Strategy: Rent vs. Buy',
    desc: 'A data-driven breakdown of the 2026 housing market. Should you buy a home with 6.2% mortgage rates or keep renting?',
    tag: 'Home & Property',
    color: 'orange',
  },
  {
    slug: 'new-vs-old-tax-regime',
    title: 'New vs Old Tax Regime: Full Comparison',
    desc: 'Which income tax regime saves you more money in FY 2026-25?',
    tag: 'Tax',
    color: 'blue',
  },
  {
    slug: 'fd-vs-mutual-funds',
    title: 'FD vs Mutual Funds: Where to Invest?',
    desc: 'Fixed deposits vs equity mutual funds — returns, risk, liquidity compared.',
    tag: 'Investing',
    color: 'purple',
  },
  {
    slug: 'us-tcja-2026-sunset-tax-changes',
    title: '2026 Tax Brackets: The TCJA Sunset & OBBBA Reality Check',
    desc: 'The expected 2026 TCJA tax sunset was canceled by the One Big Beautiful Bill (OBBBA). See the new permanent tax brackets.',
    tag: 'Tax',
    color: 'blue',
  },
  {
    slug: 'snowball-vs-avalanche',
    title: 'Debt Snowball vs Avalanche: Best Method',
    desc: 'Two proven strategies to become debt-free faster.',
    tag: 'Debt',
    color: 'orange',
  },
  {
    slug: 'ctc-vs-in-hand',
    title: 'CTC vs In-Hand Salary: Why the Difference?',
    desc: "Decode your salary slip — what's CTC, gross, net, and take-home pay.",
    tag: 'Salary',
    color: 'cyan',
  },
  {
    slug: 'emergency-fund-importance',
    title: 'Why You Need an Emergency Fund First',
    desc: 'Build your financial safety net before you start investing.',
    tag: 'Planning',
    color: 'slate',
  },
];

const CATEGORIES = [
  {
    label: 'Investing',
    icon: TrendingUp,
    color: 'emerald',
    posts: [
      { slug: 'sp500-vs-treasury-bills-2026', title: 'S&P 500 vs 3.7% T-Bills: Where to Invest Cash in 2026' },
      { slug: '2026-retirement-contribution-limits', title: '2026 Retirement Plan Limits: 401(k), IRA, HSA' },
      { slug: 'us-fed-interest-rates-2026', title: 'Fed Interest Rate Decision July 2026: 3.75% Rates Hold Steady' },
      { slug: 'sip-vs-lumpsum', title: 'SIP vs Lumpsum: Which Strategy Wins?' },
      { slug: 'fd-vs-mutual-funds', title: 'FD vs Mutual Funds: Where to Invest?' },
      { slug: 'retirement-corpus-guide', title: 'How to Calculate Your Retirement Corpus' },
      { slug: 'ppf-guide', title: "PPF Guide: India's Best Tax-Free Investment" },
      { slug: 'ultimate-guide-sip-returns', title: 'Ultimate Guide to SIP Returns' },
      { slug: 'ultimate-guide-fixed-deposit-interest', title: 'Ultimate Guide to FD Interest' },
    ],
  },
  {
    label: 'Tax & Salary',
    icon: Receipt,
    color: 'blue',
    posts: [
      { slug: '2026-tax-strategies-guide', title: '2026 Tax Strategies Guide' },
      { slug: '2026-tax-and-inflation-guide', title: '2026 Cost of Living & Tax Guide' },
      { slug: 'us-tcja-2026-sunset-tax-changes', title: '2026 Tax Brackets: TCJA Sunset & OBBBA' },
      { slug: 'new-tax-regime-2026-salary-guide', title: 'New Tax Regime 2026: Where Salaried Savers Should Park Cash' },
      { slug: 'new-vs-old-tax-regime', title: 'New vs Old Tax Regime Explained' },
      { slug: 'ctc-vs-in-hand', title: 'CTC vs In-Hand Salary' },
      { slug: 'ultimate-guide-income-tax-liability', title: 'Ultimate Guide to Income Tax' },
      { slug: 'ultimate-guide-in-hand-salary', title: 'Ultimate Guide to In-Hand Salary' },
      { slug: 'ultimate-guide-tds-deduction', title: 'TDS: What Gets Deducted & Why' },
      { slug: 'ultimate-guide-net-gst-payable', title: 'Net GST Payable Guide' },
    ],
  },
  {
    label: 'Loans & Debt',
    icon: Briefcase,
    color: 'purple',
    posts: [
      { slug: 'snowball-vs-avalanche', title: 'Debt Snowball vs Avalanche' },
      { slug: 'ultimate-guide-loan-emi', title: 'Ultimate Guide to Loan EMI' },
      { slug: 'ultimate-guide-home-loan-emi', title: 'Home Loan EMI Explained' },
      { slug: 'ultimate-guide-business-loan-emi', title: 'Business Loan EMI Guide' },
      { slug: 'ultimate-guide-debt-free-date', title: 'Calculate Your Debt-Free Date' },
      { slug: 'home-loan-prepayment-benefits', title: 'Why Home Loan Prepayment Saves Lakhs' },
    ],
  },
  {
    label: 'Property & Real Estate',
    icon: Home,
    color: 'orange',
    posts: [
      { slug: '2026-mortgage-rates-real-estate-strategy', title: '2026 Mortgage Rates Strategy: Rent vs. Buy' },
      { slug: 'rent-vs-buy-math', title: 'Rent vs Buy: The Real Math' },
      { slug: 'ultimate-guide-rent-vs-buy-decision', title: 'Rent vs Buy Decision Guide' },
      { slug: 'ultimate-guide-property-tax', title: 'Property Tax Calculation Guide' },
      { slug: 'ultimate-guide-property-registration-cost', title: 'Property Registration Cost Guide' },
      { slug: 'ultimate-guide-home-renovation-cost', title: 'Home Renovation Cost Guide' },
    ],
  },
  {
    label: 'Calculator Guides',
    icon: Calculator,
    color: 'slate',
    posts: [
      { slug: 'how-to-use-emi-calculator', title: 'How to Use the EMI Calculator' },
      { slug: 'how-to-use-sip-calculator', title: 'How to Use the SIP Calculator' },
      { slug: 'how-to-use-income-tax-calculator', title: 'How to Use the Income Tax Calculator' },
      { slug: 'how-to-use-salary-calculator', title: 'How to Use the Salary Calculator' },
      { slug: 'how-to-use-fd-calculator', title: 'How to Use the FD Calculator' },
      { slug: 'how-to-use-ppf-calculator', title: 'How to Use the PPF Calculator' },
      { slug: 'how-to-use-gst-calculator', title: 'How to Use the GST Calculator' },
      { slug: 'how-to-use-home-loan-calculator', title: 'How to Use the Home Loan Calculator' },
      { slug: 'how-to-use-break-even-calculator', title: 'How to Use the Break-Even Calculator' },
      { slug: 'how-to-use-business-loan-calculator', title: 'How to Use the Business Loan Calculator' },
      { slug: 'how-to-use-currency-converter', title: 'How to Use the Currency Converter' },
      { slug: 'how-to-use-debt-payoff-calculator', title: 'How to Use the Debt Payoff Calculator' },
      { slug: 'how-to-use-electricity-bill-calculator', title: 'How to Use the Electricity Bill Calculator' },
      { slug: 'how-to-use-emergency-fund-calculator', title: 'How to Use the Emergency Fund Calculator' },
      { slug: 'how-to-use-freelance-rate-calculator', title: 'How to Use the Freelance Rate Calculator' },
      { slug: 'how-to-use-gst-input-credit-calculator', title: 'How to Use the GST Input Credit Calculator' },
      { slug: 'how-to-use-home-renovation-cost-estimator', title: 'How to Use the Home Renovation Estimator' },
      { slug: 'how-to-use-import-duty-calculator', title: 'How to Use the Import Duty Calculator' },
      { slug: 'how-to-use-invoice-generator', title: 'How to Use the Invoice Generator' },
      { slug: 'how-to-use-lpg-subsidy-calculator', title: 'How to Use the LPG Subsidy Calculator' },
      { slug: 'how-to-use-profit-margin-calculator', title: 'How to Use the Profit Margin Calculator' },
      { slug: 'how-to-use-property-registration-cost-calculator', title: 'How to Use the Property Registration Cost Calculator' },
      { slug: 'how-to-use-property-tax-calculator', title: 'How to Use the Property Tax Calculator' },
      { slug: 'how-to-use-rent-vs-buy-calculator', title: 'How to Use the Rent vs Buy Calculator' },
      { slug: 'how-to-use-retirement-calculator', title: 'How to Use the Retirement Calculator' },
      { slug: 'how-to-use-shipping-cost-calculator', title: 'How to Use the Shipping Cost Calculator' },
      { slug: 'how-to-use-solar-roi-calculator', title: 'How to Use the Solar ROI Calculator' },
      { slug: 'how-to-use-stamp-duty-calculator', title: 'How to Use the Stamp Duty Calculator' },
      { slug: 'how-to-use-tds-calculator', title: 'How to Use the TDS Calculator' },
      { slug: 'how-to-use-water-bill-calculator', title: 'How to Use the Water Bill Calculator' },
    ],
  },
  {
    label: 'Ultimate Guides',
    icon: BookOpen,
    color: 'emerald',
    posts: [
      { slug: 'ultimate-guide-break-even-point', title: 'Break-Even Point Guide' },
      { slug: 'ultimate-guide-currency-exchange', title: 'Currency Exchange Guide' },
      { slug: 'ultimate-guide-electricity-bill', title: 'Electricity Bill Guide' },
      { slug: 'ultimate-guide-emergency-fund', title: 'Emergency Fund Guide' },
      { slug: 'ultimate-guide-freelance-hourly-rate', title: 'Freelance Rate Guide' },
      { slug: 'ultimate-guide-gst-amount', title: 'GST Amount Guide' },
      { slug: 'ultimate-guide-import-duty', title: 'Import Duty Guide' },
      { slug: 'ultimate-guide-lpg-subsidy', title: 'LPG Subsidy Guide' },
      { slug: 'ultimate-guide-ppf-maturity', title: 'PPF Maturity Guide' },
      { slug: 'ultimate-guide-professional-invoice', title: 'Professional Invoice Guide' },
      { slug: 'ultimate-guide-profit-margin', title: 'Profit Margin Guide' },
      { slug: 'ultimate-guide-property-registration-charges', title: 'Property Registration Charges Guide' },
      { slug: 'ultimate-guide-retirement-corpus', title: 'Retirement Corpus Guide' },
      { slug: 'ultimate-guide-solar-savings', title: 'Solar Savings Guide' },
      { slug: 'ultimate-guide-volumetric-weight', title: 'Volumetric Weight Guide' },
      { slug: 'ultimate-guide-water-bill', title: 'Water Bill Guide' },
    ],
  },
  {
    label: 'Market & Strategy',
    icon: TrendingUp,
    color: 'emerald',
    posts: [
      { slug: 'beating-inflation-2026', title: 'How to Beat Inflation in 2026' },
      { slug: 'credit-card-debt-strategy-2026', title: 'Credit Card Debt Strategy 2026' },
      { slug: 'gst-inclusive-vs-exclusive', title: 'GST Inclusive vs Exclusive' },
    ],
  },
];

const tagColors: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  teal: 'bg-teal-100 text-teal-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  slate: 'bg-slate-100 text-slate-700',
};

const headerColors: Record<string, string> = {
  emerald: 'bg-gradient-to-r from-emerald-500 to-teal-600',
  blue: 'bg-gradient-to-r from-blue-500 to-indigo-600',
  purple: 'bg-gradient-to-r from-purple-500 to-pink-600',
  orange: 'bg-gradient-to-r from-orange-500 to-red-600',
  slate: 'bg-gradient-to-r from-slate-600 to-slate-800',
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-blue-300 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Financial Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Smart Money Guides
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Expert-written guides on investing, taxes, loans, and personal finance. No jargon — just clear answers.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <div className="container mx-auto px-4 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Articles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {FEATURED.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all group flex flex-col gap-3"
            >
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full w-fit ${tagColors[post.color]}`}>
                {post.tag}
              </span>
              <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{post.desc}</p>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all">
                Read article <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <section key={cat.label} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className={`${headerColors[cat.color]} px-6 py-4 flex items-center gap-3`}>
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-white font-bold text-lg">{cat.label}</h2>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {cat.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm text-slate-700 group-hover:text-emerald-700 font-medium transition-colors pr-2">
                        {post.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 group-hover:text-emerald-600 transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Try Our Free Calculators</h2>
          <p className="text-emerald-100 mb-6">Put the advice into practice — calculate your own numbers instantly.</p>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            Browse All 30+ Calculators <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
