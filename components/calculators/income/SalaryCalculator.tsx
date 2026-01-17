"use client";

import React, { useState, useMemo } from 'react';
import { Wallet, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveHistoryItem } from '@/lib/history-manager';
import { formatCurrency } from '@/lib/formatters';

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
            // India Logic
            // CTC = Gross (Cost to Company)
            // Components: Basic, HRA, Special Allowances
            // Deductions: PF (Employee), PT, TDS (Approx based on New Regime)

            const monthlyCTC = ctc / 12;
            const basic = monthlyCTC * (basicPercent / 100);
            const pf = basic * (pfRate / 100);
            const pt = professionalTax;

            // Simplified TDS Calculation (New Regime Average for estimation)
            // Use the effective tax rate from previous calculator logic or a rough estimate
            // 0-3L: 0, 3-7L: 5%, 7-10L: 10%, 10-12L: 15%, 12-15L: 20%, >15L: 30%
            // Let's calculate annual tax roughly
            let annualTax = 0;
            const taxable = Math.max(0, ctc - 75000); // Std Ded
            if (taxable > 700000) {
                 if (taxable > 300000) annualTax += Math.min(400000, taxable - 300000) * 0.05;
                 if (taxable > 700000) annualTax += Math.min(300000, taxable - 700000) * 0.10;
                 if (taxable > 1000000) annualTax += Math.min(200000, taxable - 1000000) * 0.15;
                 if (taxable > 1200000) annualTax += Math.min(300000, taxable - 1200000) * 0.20;
                 if (taxable > 1500000) annualTax += (taxable - 1500000) * 0.30;
            }
            // Cess
            annualTax += annualTax * 0.04;
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
        <div className="grid lg:grid-cols-2 gap-8">
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
                 <div className="flex justify-end">
                     <Button variant="outline" size="sm" onClick={handleSave} className={saved ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}>
                        {saved ? "Saved" : <><Save size={16} className="mr-2"/> Save Paycheck</>}
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
                </div>
            </div>
        </div>
    );
}
