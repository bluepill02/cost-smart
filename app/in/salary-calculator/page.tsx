import { Metadata } from 'next';
import SalaryCalculator from '@/components/calculators/income/SalaryCalculator';
import AdContainer from '@/components/ads/AdContainer';
import { Badge } from '@/components/ui/badge';
import { IndianRupee } from 'lucide-react';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';
import RelatedCalculators from '@/components/features/RelatedCalculators';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
    title: 'Salary Calculator India | CostSmart',
    description: 'Convert your CTC to In-Hand (Net) Salary. Calculates PF, Professional Tax, and TDS deductions accurately for Indian employees.',
    openGraph: {
    title: 'Salary Calculator India | CTC to In-Hand (FY 2024-25)',
    description: 'Convert CTC to in-hand salary instantly. Calculates PF, professional tax, HRA exemption, income tax, and all deductions for FY 2024-25.',
    url: `${CANONICAL_DOMAIN}/in/salary-calculator`,
    type: 'website',
  },
  alternates: {
        canonical: '/in/salary-calculator',
    }
};

export default function IndianSalaryCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <CalculatorSchemaInjector calculatorName="CostSmart Salary Calculator India" calculatorDescription="Calculate in-hand salary from CTC with all deductions for FY 2024-25." urlPath="/in/salary-calculator" calculatorType="tax" />
            <div className="text-center mb-10 space-y-4">
                 <div className="flex justify-center gap-2">
                     <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
                        <IndianRupee size={12} /> India Edition
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Salary <span className="text-emerald-600">Calculator</span> India
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Don&apos;t get fooled by the CTC number. Calculate exactly how much money will hit your bank account every month.
                </p>
            </div>

            <SalaryCalculator currency="INR" locale="en-IN" mode="India" />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Components of Indian Salary</h2>
                    <ul className="list-disc pl-5">
                        <li><strong>Basic Salary:</strong> Usually 40-50% of CTC. Fully taxable.</li>
                        <li><strong>HRA:</strong> Tax exempt partially if you live in rented accommodation.</li>
                        <li><strong>PF (Provident Fund):</strong> 12% of Basic is deducted from your pay. Employer matches this (included in CTC).</li>
                        <li><strong>Professional Tax:</strong> ~₹200/month in most states.</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <AdContainer size="rectangle" />
                </div>
            </div>

            <RelatedCalculators category="india-finance" currentHref="/in/salary-calculator" />
        </div>
    );
}
