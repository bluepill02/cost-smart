import { Metadata } from 'next';
import { FileText, CheckCircle, PiggyBank, Target, ClipboardList, CreditCard } from 'lucide-react';
import BudgetTemplateForm from './BudgetTemplateForm';

export const metadata: Metadata = {
  title: 'Free Monthly Budget Template Download | CostSmart',
  description:
    'Download our free monthly budget template with income tracking, expense categories (50/30/20 rule), savings goals, and a monthly review checklist. Start taking control of your finances today.',
  openGraph: {
    title: 'Free Monthly Budget Template Download | CostSmart',
    description:
      'Download our free monthly budget template with income tracking, expense categories, savings goals, and monthly review checklist.',
    type: 'website',
  },
};

const TEMPLATE_FEATURES = [
  {
    icon: CreditCard,
    title: 'Income Tracking Worksheet',
    description: 'Track all income sources including salary, freelance, investments, and side hustles.',
  },
  {
    icon: PiggyBank,
    title: 'Expense Categories (50/30/20 Rule)',
    description: 'Pre-built categories following the proven 50/30/20 budgeting framework for needs, wants, and savings.',
  },
  {
    icon: Target,
    title: 'Savings Goals Tracker',
    description: 'Set and monitor progress toward your financial goals with visual progress indicators.',
  },
  {
    icon: ClipboardList,
    title: 'Monthly Review Checklist',
    description: 'A structured checklist to review your spending, adjust categories, and plan for the month ahead.',
  },
  {
    icon: FileText,
    title: 'Debt Payoff Planner',
    description: 'Organize your debts, track minimum payments, and plan your path to becoming debt-free.',
  },
];

export default function BudgetTemplatePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-[#0A0F1E] py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Free Resource</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Free Monthly Budget Template
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Take control of your finances with our comprehensive budget template.
            Track income, manage expenses using the 50/30/20 rule, and hit your savings goals every month.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Left - What is included */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              What&apos;s Included in the Template
            </h2>

            <div className="space-y-5">
              {TEMPLATE_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-5"
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits */}
            <div className="mt-10 bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">Why Use a Budget Template?</h3>
              <ul className="space-y-3">
                {[
                  'Gain clarity on where every rupee goes',
                  'Reduce financial stress with a clear plan',
                  'Build savings consistently month over month',
                  'Identify and eliminate wasteful spending',
                  'Achieve financial goals faster with structure',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Email Gate Form */}
          <div className="lg:sticky lg:top-8 self-start">
            <BudgetTemplateForm />
          </div>
        </div>
      </section>
    </div>
  );
}
