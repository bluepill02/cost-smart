import { Metadata } from 'next';
import SalaryCalculator from '@/components/calculators/income/SalaryCalculator';
import AdContainer from '@/components/ads/AdContainer';
import StickyAdSidebar from '@/components/ads/StickyAdSidebar';
import { Badge } from '@/components/ui/badge';
import { Wallet } from 'lucide-react';
import CalculatorSchemaInjector from '@/components/seo/CalculatorSchemaInjector';

export const metadata: Metadata = {
    title: 'Salary Calculator | Paycheck & Take Home Pay Estimator',
    description: 'Calculate your true take-home pay (net salary) after taxes and deductions. Plan your monthly budget with accuracy.',
    alternates: {
        canonical: 'https://cost-smart-five.vercel.app/salary-calculator',
    }
};

export default function SalaryCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <CalculatorSchemaInjector
                calculatorName="Salary Calculator"
                calculatorDescription="Calculate your true take-home pay (net salary) after taxes and deductions. Plan your monthly budget with accuracy."
                urlPath="/salary-calculator"
                calculatorType="tax"
            />
            <div className="text-center mb-10 space-y-4">
                 <div className="flex justify-center gap-2">
                     <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                        <Wallet size={12} /> Income Planner
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Salary <span className="text-emerald-600">Calculator</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Gross salary is what you earn. Net salary is what you keep. Find out the difference.
                </p>
            </div>

            <SalaryCalculator currency="USD" locale="en-US" mode="Global" />

            <div className="mt-16 grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="prose max-w-none text-slate-600 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">Where does the money go?</h2>
                    <p>
                        Your paycheck is often smaller than you expect due to:
                    </p>
                    <ul className="list-disc pl-5">
                        <li><strong>Federal & State Taxes:</strong> The biggest chunk.</li>
                        <li><strong>Social Security & Medicare:</strong> Mandatory contributions (FICA).</li>
                        <li><strong>Benefits:</strong> Health insurance premiums, 401(k) contributions.</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    {/* Standard rectangle ad on mobile/tablet, sticky skyscraper on desktop */}
                    <div className="lg:hidden">
                        <AdContainer size="rectangle" slotId="1475703853" />
                    </div>
                    <StickyAdSidebar slotId="5821640937" />
                </div>
            </div>
        </div>
    );
}
