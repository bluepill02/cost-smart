"use client";

import React, { useState, useMemo } from 'react';
import { Wallet, Save, Printer } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveHistoryItem } from '@/lib/history-manager';
import { formatCurrency } from '@/lib/formatters';
import PremiumAIAdvisor from '@/components/calculators/PremiumAIAdvisor';

interface SalaryCalculatorProps {
    currency?: string;
    locale?: string;
    mode?: 'Global' | 'India';
}

export default function SalaryCalculator({
    currency = 'USD',
    locale = 'en-US',
    mode = 'Global'
}: SalaryCalculatorProps) {
    // Global State
    const [annualGross, setAnnualGross] = useState<number>(60000);
    const [taxRate, setTaxRate] = useState<number>(22);
    const [deductions, setDeductions] = useState<number>(2000); // 401k/Insurance

    // India State
    const [ctc, setCtc] = useState<number>(1200000);
    const [basicPercent, setBasicPercent] = useState<number>(50); // Usually 40-50% of CTC
    const [pfRate] = useState<number>(12); // 12% of Basic
    const [professionalTax] = useState<number>(200); // Monthly approx

    const result = useMemo(() => {
        if (mode === 'Global') {
            const monthlyGross = annualGross / 12;
            const tax = monthlyGross * (taxRate / 100);
            const ded = deductions / 12;
            const net = monthlyGross - tax - ded;
            return {
                monthlyGross,
                tax,
                ded,
                net,
                annualNet: net * 12
            };
        } else {
            // India mode: CTC → In-Hand calculation
            // Tax slabs: FY 2025-26 New Regime (Budget 2025)
            // 0–4L: 0%, 4–8L: 5%, 8–12L: 10%, 12–16L: 15%, 16–20L: 20%, 20–24L: 25%, >24L: 30%
            // Standard Deduction: ₹75,000
            // 87A Rebate: full rebate if taxable income ≤ ₹12,00,000 (max ₹60,000)

            const monthlyCTC = ctc / 12;
            const basic = monthlyCTC * (basicPercent / 100);
            const pf = basic * (pfRate / 100);
            const pt = professionalTax;

            const taxable = Math.max(0, ctc - 75000); // Standard deduction
            let annualTax = 0;

            // Calculate tax as per FY25-26 slabs
            if (taxable > 400000)  annualTax += Math.min(400000, taxable - 400000)  * 0.05;  // 4–8L
            if (taxable > 800000)  annualTax += Math.min(400000, taxable - 800000)  * 0.10;  // 8–12L
            if (taxable > 1200000) annualTax += Math.min(400000, taxable - 1200000) * 0.15;  // 12–16L
            if (taxable > 1600000) annualTax += Math.min(400000, taxable - 1600000) * 0.20;  // 16–20L
            if (taxable > 2000000) annualTax += Math.min(400000, taxable - 2000000) * 0.25;  // 20–24L
            if (taxable > 2400000) annualTax += (taxable - 2400000) * 0.30;                   // >24L

            // Section 87A rebate: zero tax if taxable income ≤ ₹12,00,000
            if (taxable <= 1200000) annualTax = 0;

            // 4% Health & Education Cess (on tax after rebate)
            annualTax = annualTax * 1.04;

            const monthlyTDS = annualTax / 12;

            const totalDeductions = pf + pt + monthlyTDS;
            // const inHand = monthlyCTC - totalDeductions; // Ignoring Employer PF part of CTC for simplicity or assuming CTC includes it

            // Note: Usually CTC includes Employer PF. If so, Gross Salary = CTC - Employer PF.
            // Let's assume input is "Gross Salary" for simplicity, or adjust.
            // "CTC" implies Cost to Company. Employer PF (12% of Basic) is part of CTC but not Gross.
            // Let's refine:
            const employerPF = basic * (pfRate / 100);
            const grossSalary = monthlyCTC - employerPF;
            const employeePF = basic * (pfRate / 100); // Same amount usually
            const inHandFinal = grossSalary - employeePF - pt - monthlyTDS;

            return {
                monthlyGross: grossSalary,
                tax: monthlyTDS,
                ded: employeePF + pt, // PF + PT
                net: inHandFinal,
                annualNet: inHandFinal * 12,
                employerPF
            };
        }
    }, [annualGross, taxRate, deductions, ctc, basicPercent, pfRate, professionalTax, mode]);

    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        saveHistoryItem({
            type: 'salary',
            title: `Salary: ${formatCurrency(result.net, currency, locale)}/mo`,
            summary: `Net Pay`,
            link: `/salary-calculator`
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <>
        <div className="grid lg:grid-cols-2 gap-8 print:hidden">
            <Card className="h-fit shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-emerald-600" />
                        Salary Components
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {mode === 'Global' ? (
                         <>
                            <div className="space-y-4">
                                <Label>Annual Gross Salary ({currency === 'USD' ? '$' : currency})</Label>
                                <Input type="number" value={annualGross} onChange={e => setAnnualGross(Number(e.target.value))} className="text-lg font-bold" />
                            </div>
                            <div className="space-y-4">
                                <Label>Effective Tax Rate (%)</Label>
                                <Input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} />
                                <p className="text-xs text-slate-500">Combined Federal + State tax estimate.</p>
                            </div>
                            <div className="space-y-4">
                                <Label>Annual Deductions (401k/Health)</Label>
                                <Input type="number" value={deductions} onChange={e => setDeductions(Number(e.target.value))} />
                            </div>
                         </>
                    ) : (
                        <>
                            <div className="space-y-4">
                                <Label>Annual CTC (Cost to Company)</Label>
                                <Input type="number" value={ctc} onChange={e => setCtc(Number(e.target.value))} className="text-lg font-bold" />
                            </div>
                            <div className="space-y-4">
                                <Label>Basic Salary (% of CTC)</Label>
                                <div className="flex gap-4 items-center">
                                    <Input type="number" value={basicPercent} onChange={e => setBasicPercent(Number(e.target.value))} className="w-20" />
                                    <span className="text-sm text-slate-500">Default is 50%</span>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

             <div className="space-y-6">
                  <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={handleSave} className={saved ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}>
                         {saved ? "Saved" : <><Save size={16} className="mr-2"/> Save Paycheck</>}
                      </Button>
                      <Button
                         variant="outline"
                         size="sm"
                         onClick={() => window.print()}
                         className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
                      >
                         <Printer size={16} className="mr-2" /> Print Paycheck
                      </Button>
                 </div>

                <div className="grid gap-4">
                     <Card className="bg-slate-900 text-white border-none">
                        <CardContent className="p-6">
                            <div className="text-slate-400 text-sm font-medium mb-1">Monthly In-Hand (Net)</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {formatCurrency(result.net, currency, locale)}
                            </div>
                            <div className="text-sm mt-2 text-slate-400">
                                Annual: {formatCurrency(result.annualNet, currency, locale)}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dynamically placed in-content ad slot */}
                    <div className="my-2 print:hidden">
                        <AdContainer slotId="4057982103" size="square" />
                    </div>

                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-base">Breakdown</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Gross Monthly</span>
                                <span className="font-semibold">{formatCurrency(result.monthlyGross, currency, locale)}</span>
                            </div>
                             <div className="flex justify-between text-sm text-red-600">
                                <span>Tax / TDS</span>
                                <span>- {formatCurrency(result.tax, currency, locale)}</span>
                            </div>
                             <div className="flex justify-between text-sm text-amber-600">
                                <span>Deductions (PF/Ins)</span>
                                <span>- {formatCurrency(result.ded, currency, locale)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Premium AI Advisor with Monetized Placements */}
                    <PremiumAIAdvisor
                        calculatorType="salary-calculator"
                        values={mode === 'India' ? { ctc, basicPercent } : { annualGross, taxRate, deductions }}
                        result={{
                            netPay: result.net,
                            taxPay: result.tax,
                            deductionsPay: result.ded,
                            annualNet: result.annualNet
                        }}
                        currency={currency}
                        locale={locale}
                    />
                </div>
            </div>
        </div>

        {/* Print-friendly report layout */}
        <div className="hidden print:block print:bg-white p-8 max-w-[210mm] mx-auto text-slate-900 font-sans">
             <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
                 <div>
                     <h1 className="text-3xl font-bold text-slate-900">Take-Home Salary Report</h1>
                     <p className="text-slate-500 mt-1">CostSmart Calculator Hub</p>
                 </div>
                 <div className="text-right">
                     <div className="text-2xl font-bold text-emerald-600">CostSmart</div>
                     <p className="text-sm text-slate-400 mt-1">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                 </div>
             </div>

             <div className="mb-8">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-3">Executive Summary</h2>
                 <div className="grid grid-cols-3 gap-6">
                     <div className="bg-slate-50 p-4 rounded border border-slate-100">
                         <div className="text-xs text-slate-500 mb-1">Mode Mode</div>
                         <div className="text-xl font-bold text-slate-900">{mode} Paycheck</div>
                     </div>
                     <div className="bg-slate-50 p-4 rounded border border-slate-100">
                         <div className="text-xs text-slate-500 mb-1">Gross Annual Income</div>
                         <div className="text-xl font-bold text-slate-900">
                             {mode === 'India' ? formatCurrency(ctc, currency, locale) : formatCurrency(annualGross, currency, locale)}
                         </div>
                     </div>
                     <div className="bg-emerald-50 p-4 rounded border border-emerald-100">
                         <div className="text-xs text-emerald-800 mb-1">Monthly In-Hand Net</div>
                         <div className="text-xl font-bold text-emerald-700">{formatCurrency(result.net, currency, locale)}</div>
                     </div>
                 </div>
             </div>

             <div className="mb-8">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-3">Detailed Deductions & Taxes</h2>
                 <table className="w-full text-sm text-left border-collapse">
                     <thead>
                         <tr className="border-b border-slate-200 bg-slate-50">
                             <th className="py-2 px-3 font-semibold text-slate-600">Item</th>
                             <th className="py-2 px-3 font-semibold text-slate-600 text-right">Monthly Value</th>
                             <th className="py-2 px-3 font-semibold text-slate-600 text-right">Annual Value</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         <tr>
                             <td className="py-3 px-3 text-slate-500">Gross Paycheck</td>
                             <td className="py-3 px-3 font-medium text-right">{formatCurrency(result.monthlyGross, currency, locale)}</td>
                             <td className="py-3 px-3 font-medium text-right">{formatCurrency(result.monthlyGross * 12, currency, locale)}</td>
                         </tr>
                         <tr className="text-red-600 bg-red-50/10">
                             <td className="py-3 px-3 font-medium">Income Tax / TDS</td>
                             <td className="py-3 px-3 font-bold text-right">-{formatCurrency(result.tax, currency, locale)}</td>
                             <td className="py-3 px-3 font-bold text-right">-{formatCurrency(result.tax * 12, currency, locale)}</td>
                         </tr>
                         <tr className="text-amber-600 bg-amber-50/10">
                             <td className="py-3 px-3 font-medium">Social Security / PF / PT</td>
                             <td className="py-3 px-3 font-bold text-right">-{formatCurrency(result.ded, currency, locale)}</td>
                             <td className="py-3 px-3 font-bold text-right">-{formatCurrency(result.ded * 12, currency, locale)}</td>
                         </tr>
                         <tr className="bg-emerald-50/40 font-bold">
                             <td className="py-3 px-3 text-emerald-800">Net Take-Home Pay</td>
                             <td className="py-3 px-3 text-emerald-700 text-right">{formatCurrency(result.net, currency, locale)}</td>
                             <td className="py-3 px-3 text-emerald-700 text-right">{formatCurrency(result.annualNet, currency, locale)}</td>
                         </tr>
                     </tbody>
                 </table>
             </div>

             <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm text-slate-600 mb-8">
                 <h3 className="font-bold text-slate-800 mb-2">Smart Insights</h3>
                 <p className="leading-relaxed">
                     Your effective tax and deduction rate is <strong>{(((result.monthlyGross - result.net) / result.monthlyGross) * 100).toFixed(0)}%</strong>. This means you retain <strong>{((result.net / result.monthlyGross) * 100).toFixed(0)}%</strong> of your gross monthly paycheck as disposable take-home capital. Plan your monthly fixed budget, emergency savings (ideally 3-6 months of net take-home salary), and wealth investment goals based on this net disposable figure rather than your gross CTC/Salary.
                 </p>
             </div>

             <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
                 <p>Generated by CostSmart Salary & Take-Home Pay Calculator. Estimates are calculated based on basic standard taxation rules.</p>
                 <p className="mt-1">Visit https://cost-smart-five.vercel.app for live updates.</p>
             </div>
        </div>
        </>
    );
}
