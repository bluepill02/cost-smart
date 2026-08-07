import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BlogLayout from '@/components/blog/BlogLayout';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

const ARTICLE_SLUG = 'emergency-fund-rule-2026';
const HERO_IMAGE = '/images/blog/emergency-fund-2026-runway.svg';

const marketBars = [
  { label: 'CPI inflation', value: 3.93, note: 'MoSPI, May 2026', accent: 'bg-rose-500' },
  { label: 'Food inflation', value: 4.78, note: 'MoSPI, May 2026', accent: 'bg-orange-500' },
  { label: 'Savings deposit', value: 4.0, note: 'DEA small-savings table', accent: 'bg-emerald-500' },
  { label: '1-year TD', value: 6.9, note: 'DEA small-savings table', accent: 'bg-teal-500' },
  { label: 'PPF', value: 7.1, note: 'DEA small-savings table', accent: 'bg-cyan-500' },
  { label: 'NSC', value: 7.7, note: 'DEA small-savings table', accent: 'bg-blue-500' },
  { label: 'SCSS', value: 8.2, note: 'DEA small-savings table', accent: 'bg-indigo-500' },
  { label: 'SSY', value: 8.2, note: 'DEA small-savings table', accent: 'bg-violet-500' },
];

const profileRows = [
  {
    profile: 'Stable salaried, no dependents',
    runway: '3 to 4 months',
    reason: 'Your income is predictable and your replacement cost is usually lower.',
  },
  {
    profile: 'Salaried with dependents',
    runway: '6 months',
    reason: 'One surprise should not force a fire sale of investments or a painful loan.',
  },
  {
    profile: 'Dual-income household',
    runway: '4 to 6 months',
    reason: 'Two paychecks help, but both may still be exposed to the same market cycle.',
  },
  {
    profile: 'Freelancer or commission-heavy',
    runway: '9 to 12 months',
    reason: 'Income replacement lags. Billing gaps are not a hypothetical; they are Tuesday.',
  },
  {
    profile: 'Single-income family with EMIs',
    runway: '9 months',
    reason: 'Fixed obligations reduce your room for error faster than optimism does.',
  },
];

const buildSteps = [
  {
    title: 'Calculate essentials first',
    body: 'Use rent, utilities, food, transport, insurance, and minimum debt payments. Your aspirational budget is not the emergency fund target.',
  },
  {
    title: 'Separate the money',
    body: 'Move the first month of cash into a distinct account so spending and safety stop sharing the same address.',
  },
  {
    title: 'Automate the transfer',
    body: 'Treat the buffer like a bill. The easiest savings plan is the one that does not rely on weekly motivation.',
  },
  {
    title: 'Use windfalls to accelerate',
    body: 'Bonuses, tax refunds, and side-income spikes can finish the fund faster than a heroic one-off sacrifice.',
  },
  {
    title: 'Re-check the runway',
    body: 'If rent, dependents, or job risk changes, the target changes too. Emergency funds are not museum pieces.',
  },
];

export const metadata: Metadata = {
  title: 'The 2026 Emergency Fund Rule: How Many Months of Expenses You Really Need | CostSmart',
  description:
    'A current emergency-fund guide using May 2026 inflation, May 2026 labour-market data, and the latest Q2 FY 2026-27 small-savings rates to size the right cash buffer.',
  alternates: {
    canonical: `/blog/${ARTICLE_SLUG}`,
  },
  openGraph: {
    title: 'The 2026 Emergency Fund Rule: How Many Months of Expenses You Really Need',
    description:
      'A witty, data-backed guide to emergency fund sizing in 2026 using current inflation, unemployment, and small-savings rates.',
    url: `${CANONICAL_DOMAIN}/blog/${ARTICLE_SLUG}`,
    type: 'article',
    images: [
      {
        url: `${CANONICAL_DOMAIN}${HERO_IMAGE}`,
        width: 1200,
        height: 630,
        alt: 'Emergency fund runway graphic showing 3, 6, and 9 month cash buffers alongside inflation and savings rates',
      },
    ],
  },
};

export default function Post() {
  return (
    <BlogLayout
      title="The 2026 Emergency Fund Rule: How Many Months of Expenses You Really Need"
      date="2026-07-02"
      readingTime="10 min read"
      author="CostSmart Team"
      category="Savings"
      slug={ARTICLE_SLUG}
      description="A current emergency-fund guide using May 2026 inflation, labour-market data, and the latest Q2 FY 2026-27 small-savings rates to size the right cash buffer."
      relatedPosts={[
        {
          title: 'The Cash Buffer That Still Wins',
          href: '/blog/cash-buffer-that-still-wins',
          tag: 'Savings',
        },
        {
          title: 'Why You Need an Emergency Fund First',
          href: '/blog/emergency-fund-importance',
          tag: 'Planning',
        },
        {
          title: 'How to Use the Emergency Fund Calculator',
          href: '/blog/how-to-use-emergency-fund-calculator',
          tag: 'Calculator',
        },
        {
          title: 'FD vs Mutual Funds: Where to Invest?',
          href: '/blog/fd-vs-mutual-funds',
          tag: 'Investing',
        },
      ]}
    >
      <p>
        For most households in 2026, the right emergency fund is <strong>six months</strong> of essential expenses, with <strong>three months</strong> as the floor for stable salaried income and <strong>nine months</strong> for variable income or a single salary supporting the home.
      </p>

      <figure className="not-prose my-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-xl">
        <Image
          src={HERO_IMAGE}
          alt="Emergency fund runway graphic showing 3, 6, and 9 month cash buffers alongside inflation and savings rates"
          width={1200}
          height={630}
          className="h-auto w-full"
          priority
        />
        <figcaption className="px-5 py-4 text-sm text-slate-300">
          The goal is not to maximize yield. The goal is to keep your life from having to negotiate with a broken laptop or a lost paycheck.
        </figcaption>
      </figure>

      <div className="not-prose my-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Bottom line</p>
        <p className="mt-2 text-slate-700">
          If your money might be needed this month, keep it liquid. If it is unlikely to be touched for a year, it is no longer emergency money and can be evaluated on a different set of rules.
        </p>
      </div>

      <h2>Why six months still wins in 2026</h2>
      <p>
        Emergency funds exist to buy time. Time to replace income, time to avoid bad debt, and time to stop making financial decisions while annoyed, tired, or panicked.
      </p>
      <p>
        The current data does not change that logic. MoSPI&apos;s May 2026 CPI release shows retail inflation at <strong>3.93%</strong> and food inflation at <strong>4.78%</strong>, while the May 2026 PLFS bulletin shows an overall unemployment rate of <strong>5.5%</strong> with urban unemployment at <strong>6.4%</strong> and rural unemployment at <strong>5.1%</strong>.
      </p>
      <p>
        That is not crisis territory. It is also not a signal to keep pretending that cash replacement will happen instantly. A six-month buffer remains the most sensible default because it gives you room to breathe without turning cash into a lifestyle.
      </p>

      <div className="not-prose my-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Formula</p>
        <p className="mt-2 text-slate-800">
          <strong>Emergency fund target</strong> = essential monthly spend × chosen runway in months.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Start with essentials only: rent, utilities, food, transport, insurance, and minimum debt payments. Your wish list does not count unless the lender accepts it.
        </p>
      </div>

      <h2>What the current rates say about cash</h2>
      <p>
        Official small-savings data still makes a useful point: safe cash alternatives pay more than a basic savings account, but they are still not a substitute for liquidity.
      </p>
      <p>
        The Department of Economic Affairs&apos; current Q2 FY 2026-27 memo keeps <strong>savings deposits at 4%</strong>, <strong>1-year time deposits at 6.9%</strong>, <strong>PPF at 7.1%</strong>, <strong>NSC at 7.7%</strong>, and both <strong>SCSS</strong> and <strong>SSY</strong> at <strong>8.2%</strong>.
      </p>

      <figure className="not-prose my-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">Visualization 1</p>
            <h3 className="mt-1 text-xl font-black text-slate-900">Inflation versus the safe-yield ladder</h3>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Percent</span>
        </div>
        <div className="mt-6 space-y-4">
          {marketBars.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${item.accent}`}
                  style={{ width: `${Math.min((item.value / 8.5) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs leading-5 text-slate-500">{item.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500">
          The spread is the point: emergency cash should stay safe and accessible, not try to win a beauty pageant against fixed-income products.
        </p>
      </figure>

      <div className="overflow-x-auto not-prose my-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Instrument</th>
              <th className="px-4 py-3 font-semibold">Current rate</th>
              <th className="px-4 py-3 font-semibold">Best use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-3"><strong>Savings deposit</strong></td>
              <td className="px-4 py-3"><strong>4%</strong></td>
              <td className="px-4 py-3">Money needed this week.</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><strong>1-year TD</strong></td>
              <td className="px-4 py-3"><strong>6.9%</strong></td>
              <td className="px-4 py-3">Only for cash you can leave alone.</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><strong>PPF</strong></td>
              <td className="px-4 py-3"><strong>7.1%</strong></td>
              <td className="px-4 py-3">Long-term tax-aware parking, not emergency cash.</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><strong>NSC</strong></td>
              <td className="px-4 py-3"><strong>7.7%</strong></td>
              <td className="px-4 py-3">Useful for money that is still liquid enough to wait.</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><strong>SCSS</strong></td>
              <td className="px-4 py-3"><strong>8.2%</strong></td>
              <td className="px-4 py-3">Great yield, but only for eligible senior citizens.</td>
            </tr>
            <tr>
              <td className="px-4 py-3"><strong>SSY</strong></td>
              <td className="px-4 py-3"><strong>8.2%</strong></td>
              <td className="px-4 py-3">Great yield, but only for the right account and time horizon.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="not-prose my-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Warning</p>
        <p className="mt-2 text-slate-700">
          If your emergency fund lives in a product with a lock-up, penalty, or paperwork tax, it is not truly an emergency fund. It is just future annoyance with a slightly better coupon.
        </p>
      </div>

      <h2>Match the buffer to your income pattern</h2>
      <p>
        The right runway depends less on your personality and more on how quickly you can replace income. A stable salary deserves one answer. A variable paycheck deserves another.
      </p>

      <div className="overflow-x-auto not-prose my-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Household profile</th>
              <th className="px-4 py-3 font-semibold">Suggested runway</th>
              <th className="px-4 py-3 font-semibold">Why</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {profileRows.map((row) => (
              <tr key={row.profile}>
                <td className="px-4 py-3"><strong>{row.profile}</strong></td>
                <td className="px-4 py-3"><strong>{row.runway}</strong></td>
                <td className="px-4 py-3">{row.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figure className="not-prose my-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600">Visualization 2</p>
        <h3 className="mt-1 text-xl font-black text-slate-900">Runway by income risk</h3>
        <div className="mt-6 space-y-4">
          {profileRows.map((row) => {
            const months = Number(row.runway.split(' ')[0]);
            const width = Math.min((months / 12) * 100, 100);

            return (
              <div key={row.profile} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{row.profile}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{row.runway}</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">Higher risk, longer runway</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{row.reason}</p>
              </div>
            );
          })}
        </div>
      </figure>

      <h2>How to build it without wrecking your month</h2>
      <p>
        The fastest way to fail is to treat the emergency fund like a heroic one-time project. That makes it expensive, miserable, and easy to abandon.
      </p>
      <ol>
        {buildSteps.map((step) => (
          <li key={step.title}>
            <strong>{step.title}:</strong> {step.body}
          </li>
        ))}
      </ol>
      <p>
        If your current emergency fund is zero, aim for one month first. Then stop pretending that all progress must arrive in a spreadsheet-shaped thunderstorm.
      </p>

      <div className="not-prose my-8 rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Rule of thumb</p>
        <p className="mt-2 text-slate-700">
          Use the <strong>Emergency Fund Calculator</strong> for the target, the <strong>FD Calculator</strong> for overflow cash, and the <strong>Debt Payoff Calculator</strong> if expensive borrowing is the real leak.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/emergency-fund-calculator" className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700">
            Open Emergency Fund Calculator
          </Link>
          <Link href="/fd-calculator" className="inline-flex items-center rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-700 ring-1 ring-blue-200 transition-colors hover:bg-blue-50">
            Open FD Calculator
          </Link>
          <Link href="/debt-payoff-calculator" className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800">
            Open Debt Payoff Calculator
          </Link>
        </div>
      </div>

      <h2>When the rule should change</h2>
      <p>
        The six-month answer is a default, not a religion. If your industry is shaky, your income is commission-heavy, or your household depends on one paycheck, stretch the runway.
      </p>
      <p>
        If you have expensive debt and only a tiny buffer, split the difference carefully. Keep a starter emergency fund so one hiccup does not send you straight back to borrowing, then redirect the surplus toward the highest-cost debt that is clearly more expensive than safe cash.
      </p>
      <p>
        The point is not to worship cash. The point is to keep cash useful. A good emergency fund should let the rest of your money work without constantly interrupting the meeting.
      </p>

      <div className="not-prose mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Review date</p>
        <p className="mt-2 text-sm text-slate-600">
          Reviewed on <strong>July 2, 2026</strong>. This article uses current official sources available on that date and is for general information only, not personal financial advice.
        </p>
      </div>

      <p className="text-sm text-slate-500">
        Source note: current CPI and food inflation come from MoSPI&apos;s <a href="https://www.mospi.gov.in/themes/product/9-consumer-price-index-cpi" target="_blank" rel="noreferrer" className="font-medium text-emerald-700 hover:underline">CPI dashboard</a>; labour-market data comes from MoSPI&apos;s <a href="https://www.mospi.gov.in/themes/product/69-periodic-labour-force-survey-plfs" target="_blank" rel="noreferrer" className="font-medium text-emerald-700 hover:underline">PLFS page</a>; and the safe-rate ladder comes from the Department of Economic Affairs&apos; <a href="https://dea.gov.in/files/budget_division_documents/Q2ROI.pdf" target="_blank" rel="noreferrer" className="font-medium text-emerald-700 hover:underline">Q2 FY 2026-27 small-savings memo</a>.
      </p>
    </BlogLayout>
  );
}
