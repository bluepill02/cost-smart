import Link from 'next/link';
import { ArrowRight, Calculator, TrendingUp, Home, Receipt, PiggyBank, Sun, Briefcase, Droplets } from 'lucide-react';

interface RelatedTool {
  name: string;
  href: string;
  desc: string;
  icon: React.ElementType;
  color: string;
}

const CATEGORY_TOOLS: Record<string, RelatedTool[]> = {
  'india-finance': [
    { name: 'SIP Calculator', href: '/in/sip-calculator', desc: 'Mutual fund returns', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Income Tax Calculator', href: '/in/income-tax-calculator', desc: 'New vs old regime', icon: Receipt, color: 'text-blue-600 bg-blue-50' },
    { name: 'FD Calculator', href: '/in/fd-calculator', desc: 'Fixed deposit returns', icon: PiggyBank, color: 'text-violet-600 bg-violet-50' },
    { name: 'PPF Calculator', href: '/in/ppf-calculator', desc: '15-year PPF growth', icon: PiggyBank, color: 'text-teal-600 bg-teal-50' },
    { name: 'GST Calculator', href: '/in/gst-calculator', desc: 'Inclusive & exclusive', icon: Receipt, color: 'text-orange-600 bg-orange-50' },
    { name: 'Salary Calculator', href: '/in/salary-calculator', desc: 'CTC to in-hand', icon: Calculator, color: 'text-indigo-600 bg-indigo-50' },
  ],
  'loan': [
    { name: 'EMI Calculator', href: '/in/emi-calculator', desc: 'Loan EMI breakdown', icon: Calculator, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Home Loan Calculator', href: '/home-loan-calculator', desc: 'EMI & amortization', icon: Home, color: 'text-blue-600 bg-blue-50' },
    { name: 'Debt Payoff', href: '/debt-payoff-calculator', desc: 'Snowball vs avalanche', icon: Calculator, color: 'text-red-600 bg-red-50' },
    { name: 'Business Loan', href: '/business-loan-calculator', desc: 'EMI & total cost', icon: Briefcase, color: 'text-slate-600 bg-slate-50' },
    { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator', desc: '20-year comparison', icon: Home, color: 'text-orange-600 bg-orange-50' },
    { name: 'Stamp Duty', href: '/in/stamp-duty-calculator', desc: 'State-wise rates', icon: Receipt, color: 'text-violet-600 bg-violet-50' },
  ],
  'investment': [
    { name: 'SIP Calculator', href: '/in/sip-calculator', desc: 'Monthly SIP returns', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'FD Calculator', href: '/in/fd-calculator', desc: 'Fixed deposit maturity', icon: PiggyBank, color: 'text-violet-600 bg-violet-50' },
    { name: 'PPF Calculator', href: '/in/ppf-calculator', desc: 'PPF tax-free growth', icon: PiggyBank, color: 'text-teal-600 bg-teal-50' },
    { name: 'Investment Calculator', href: '/investment-calculator', desc: 'Compound returns', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
    { name: 'Inflation Calculator', href: '/inflation', desc: 'Real value of money', icon: Calculator, color: 'text-orange-600 bg-orange-50' },
    { name: 'Retirement Calculator', href: '/retirement-calculator', desc: 'Nest egg planner', icon: PiggyBank, color: 'text-rose-600 bg-rose-50' },
  ],
  'property': [
    { name: 'Home Loan Calculator', href: '/home-loan-calculator', desc: 'EMI & amortization', icon: Home, color: 'text-blue-600 bg-blue-50' },
    { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator', desc: '20-year comparison', icon: Home, color: 'text-orange-600 bg-orange-50' },
    { name: 'Stamp Duty', href: '/in/stamp-duty-calculator', desc: 'State-wise rates', icon: Receipt, color: 'text-violet-600 bg-violet-50' },
    { name: 'Renovation Cost', href: '/home-renovation-cost-estimator', desc: 'Room-by-room estimate', icon: Home, color: 'text-amber-600 bg-amber-50' },
    { name: 'EMI Calculator', href: '/in/emi-calculator', desc: 'Loan EMI breakdown', icon: Calculator, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Property Tax', href: '/in/property-tax-calculator', desc: 'Annual property tax', icon: Receipt, color: 'text-rose-600 bg-rose-50' },
  ],
  'business': [
    { name: 'Profit Margin', href: '/profit-margin-calculator', desc: 'Gross & net margins', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Break-Even', href: '/break-even-calculator', desc: 'When do you profit?', icon: Calculator, color: 'text-blue-600 bg-blue-50' },
    { name: 'Business Loan', href: '/business-loan-calculator', desc: 'EMI & total cost', icon: Briefcase, color: 'text-slate-600 bg-slate-50' },
    { name: 'Invoice Generator', href: '/invoice-generator', desc: 'Professional invoices', icon: Receipt, color: 'text-violet-600 bg-violet-50' },
    { name: 'GST Calculator', href: '/in/gst-calculator', desc: 'Tax inclusive/exclusive', icon: Receipt, color: 'text-orange-600 bg-orange-50' },
    { name: 'Freelance Rate', href: '/freelance-rate-calculator', desc: 'Pricing calculator', icon: Calculator, color: 'text-teal-600 bg-teal-50' },
  ],
  'solar': [
    { name: 'Solar ROI Calculator', href: '/solar-roi', desc: 'Payback period', icon: Sun, color: 'text-amber-600 bg-amber-50' },
    { name: 'Electricity Bill', href: '/in/electricity-bill-calculator', desc: 'Monthly bill estimate', icon: Calculator, color: 'text-yellow-600 bg-yellow-50' },
    { name: 'Investment Calculator', href: '/investment-calculator', desc: 'Long-term returns', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Import Duty', href: '/import-duty', desc: 'Panel import costs', icon: Receipt, color: 'text-blue-600 bg-blue-50' },
  ],
  'utility': [
    { name: 'Electricity Bill', href: '/in/electricity-bill-calculator', desc: 'State-wise slab rates', icon: Calculator, color: 'text-yellow-600 bg-yellow-50' },
    { name: 'Water Bill', href: '/in/water-bill-calculator', desc: 'Monthly water charges', icon: Droplets, color: 'text-blue-600 bg-blue-50' },
    { name: 'LPG Subsidy', href: '/in/lpg-subsidy-calculator', desc: 'Annual LPG savings', icon: PiggyBank, color: 'text-orange-600 bg-orange-50' },
    { name: 'Property Tax', href: '/in/property-tax-calculator', desc: 'Municipal tax estimate', icon: Receipt, color: 'text-violet-600 bg-violet-50' },
    { name: 'Solar ROI', href: '/solar-roi', desc: 'Solar panel savings', icon: Sun, color: 'text-amber-600 bg-amber-50' },
    { name: 'Home Renovation', href: '/home-renovation-cost-estimator', desc: 'Room-by-room costs', icon: Home, color: 'text-teal-600 bg-teal-50' },
  ],
};

interface RelatedCalculatorsProps {
  category: keyof typeof CATEGORY_TOOLS;
  currentHref?: string;
  title?: string;
}

export default function RelatedCalculators({
  category,
  currentHref,
  title = 'Related Calculators',
}: RelatedCalculatorsProps) {
  const tools = (CATEGORY_TOOLS[category] || CATEGORY_TOOLS['india-finance'])
    .filter(t => t.href !== currentHref)
    .slice(0, 4);

  if (!tools.length) return null;

  return (
    <div className="mt-10 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-slate-900 text-base">{title}</h2>
        <Link href="/calculators" className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-0.5 transition-colors">
          See all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {tools.map(tool => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tool.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-emerald-700 transition-colors truncate">{tool.name}</div>
                <div className="text-xs text-slate-500 truncate">{tool.desc}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
