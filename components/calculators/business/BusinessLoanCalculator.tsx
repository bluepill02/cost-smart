"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Building2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/lib/formatters';

export default function BusinessLoanCalculator() {
    const [loanAmount, setLoanAmount] = useState<number>(2500000);
    const [interestRate, setInterestRate] = useState<number>(12);
    const [tenureYears, setTenureYears] = useState<number>(5);
    const [annualTurnover, setAnnualTurnover] = useState<number>(10000000);
    const [yearsInBusiness, setYearsInBusiness] = useState<number>(3);

    const result = useMemo(() => {
        const monthlyRate = interestRate / 12 / 100;
        const totalMonths = tenureYears * 12;

        // EMI
        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        const totalInterest = (emi * totalMonths) - loanAmount;

        // Eligibility Check
        const monthlyTurnover = annualTurnover / 12;
        // Conservative bank rule: EMI should not exceed 10-15% of turnover for unsecured, or 50% of EBITDA.
        // For simplicity: EMI should be < 15% of Gross Turnover
        const maxSafeEmi = monthlyTurnover * 0.15;
        const isAmountSafe = emi <= maxSafeEmi;
        const isVintageSafe = yearsInBusiness >= 3;

        return {
            emi,
            totalInterest,
            totalAmount: loanAmount + totalInterest,
            monthlyTurnover,
            maxSafeEmi,
            isAmountSafe,
            isVintageSafe
        };
    }, [loanAmount, interestRate, tenureYears, annualTurnover, yearsInBusiness]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-blue-600" />
                            Business Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="turnover">Annual Turnover (Revenue)</Label>
                                <Input
                                    id="turnover"
                                    type="number"
                                    value={annualTurnover}
                                    onChange={(e) => setAnnualTurnover(Number(e.target.value))}
                                />
                                <p className="text-xs text-slate-500">Gross sales before expenses</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vintage">Years in Business</Label>
                                <Input
                                    id="vintage"
                                    type="number"
                                    value={yearsInBusiness}
                                    onChange={(e) => setYearsInBusiness(Number(e.target.value))}
                                />
                                <p className="text-xs text-slate-500">Banks prefer 3+ years</p>
                            </div>
                        </div>

                        <div className="border-t pt-6 space-y-4">
                             <h3 className="font-semibold flex items-center gap-2">
                                <Calculator className="w-4 h-4" /> Loan Requirements
                            </h3>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Loan Amount ({formatCurrency(loanAmount, 'INR')})</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                />
                                <Slider
                                    value={[loanAmount]}
                                    min={100000}
                                    max={50000000}
                                    step={100000}
                                    onValueChange={(v) => setLoanAmount(v[0])}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="rate">Interest Rate (%)</Label>
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        step={0.1}
                                    />
                                    <Slider
                                        value={[interestRate]}
                                        min={8}
                                        max={24}
                                        step={0.5}
                                        onValueChange={(v) => setInterestRate(v[0])}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tenure">Tenure (Years)</Label>
                                    <Input
                                        id="tenure"
                                        type="number"
                                        value={tenureYears}
                                        onChange={(e) => setTenureYears(Number(e.target.value))}
                                    />
                                    <Slider
                                        value={[tenureYears]}
                                        min={1}
                                        max={15}
                                        step={1}
                                        onValueChange={(v) => setTenureYears(v[0])}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Result Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Estimated EMI</div>
                            <div className="text-4xl font-bold text-blue-400">
                                {formatCurrency(result.emi, 'INR')}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">/ month</div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-800">
                             <div className="flex justify-between items-center">
                                <span className="text-slate-400">Total Interest</span>
                                <span className="font-semibold text-lg text-orange-300">
                                    {formatCurrency(result.totalInterest, 'INR')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Total Payable</span>
                                <span className="font-semibold text-lg">
                                    {formatCurrency(result.totalAmount, 'INR')}
                                </span>
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg border ${
                            result.isAmountSafe && result.isVintageSafe
                            ? 'bg-emerald-900/30 border-emerald-800'
                            : 'bg-amber-900/30 border-amber-800'
                        }`}>
                            <div className="flex items-start gap-3">
                                {result.isAmountSafe && result.isVintageSafe ? (
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                                ) : (
                                    <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                                )}
                                <div>
                                    <h4 className={`font-bold mb-1 ${
                                        result.isAmountSafe && result.isVintageSafe ? 'text-emerald-400' : 'text-amber-400'
                                    }`}>
                                        {result.isAmountSafe && result.isVintageSafe ? 'High Approval Chance' : 'Approval Risk'}
                                    </h4>
                                    <p className="text-xs text-slate-300">
                                        {!result.isVintageSafe
                                            ? `Business age is below 3 years. Collateral might be required.`
                                            : !result.isAmountSafe
                                                ? `EMI is ${(result.emi / result.monthlyTurnover * 100).toFixed(1)}% of turnover. Recommended limit is 15%.`
                                                : "Your financials look healthy for an unsecured business loan."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                        <ArrowRight size={18}/>
                        Lender's Perspective
                    </h4>
                    <p className="text-sm text-blue-800">
                        Banks look at your <strong>DSCR (Debt Service Coverage Ratio)</strong>. Since we don't have your profit details, we used a turnover proxy.
                        Ensure your Net Profit covers the EMI by at least <strong>1.5 times</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}
