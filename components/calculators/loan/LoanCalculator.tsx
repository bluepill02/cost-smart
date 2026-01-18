"use client";

import dynamic from 'next/dynamic';
import React, { useState, useMemo } from 'react';
import { Calculator, TrendingDown, PiggyBank, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { saveHistoryItem } from '@/lib/history-manager';

// Lazy load Recharts components
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const RechartsTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });

export default function LoanCalculator() {
    const [principal, setPrincipal] = useState<number>(250000);
    const [rate, setRate] = useState<number>(6.5);
    const [years, setYears] = useState<number>(30);
    const [extraPayment, setExtraPayment] = useState<number>(0);

    const calculation = useMemo(() => {
        const r = rate / 100 / 12;
        const n = years * 12;

        // Standard EMI
        const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPaymentStandard = emi * n;
        const totalInterestStandard = totalPaymentStandard - principal;

        // With Extra Payment
        let balance = principal;
        let monthsWithExtra = 0;
        let totalInterestWithExtra = 0;

        while (balance > 0 && monthsWithExtra < n * 2) { // Safety break
            const interestForMonth = balance * r;
            const principalForMonth = (emi + extraPayment) - interestForMonth;

            totalInterestWithExtra += interestForMonth;
            balance -= principalForMonth;
            monthsWithExtra++;

            if (balance < 0) {
                 // Adjust last payment
                 // (Simplified for estimation)
            }
        }

        const totalPaymentWithExtra = principal + totalInterestWithExtra;
        const savings = totalInterestStandard - totalInterestWithExtra;
        const timeSavedMonths = n - monthsWithExtra;

        return {
            emi,
            totalPaymentStandard,
            totalInterestStandard,
            totalInterestWithExtra,
            totalPaymentWithExtra,
            savings,
            monthsWithExtra,
            timeSavedMonths
        };
    }, [principal, rate, years, extraPayment]);

    const chartData = [
        { name: 'Principal', value: principal, color: '#10b981' }, // emerald-500
        { name: 'Interest', value: calculation.totalInterestWithExtra, color: '#f59e0b' }, // amber-500
    ];

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        saveHistoryItem({
            type: 'loan',
            title: `Loan: $${principal.toLocaleString()}`,
            summary: `${years}yr Term @ ${rate}% | Monthly: $${(calculation.emi + extraPayment).toFixed(0)}`,
            link: `/loan-calculator?p=${principal}&r=${rate}&y=${years}&e=${extraPayment}` // In future, handle URL params
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <Card className="border-slate-200 shadow-md h-fit">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-emerald-600" />
                        Loan Parameters
                    </CardTitle>
                    <CardDescription>Adjust the values to see how interest accumulates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="principal">Loan Amount ($)</Label>
                            <Input
                                id="principal"
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(Number(e.target.value))}
                                className="text-lg font-bold"
                            />
                            <Slider
                                value={[principal]}
                                min={1000}
                                max={1000000}
                                step={1000}
                                onValueChange={(v) => setPrincipal(v[0])}
                                className="pt-2"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="rate">Interest Rate (%)</Label>
                                <Input
                                    id="rate"
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    step="0.1"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="years">Term (Years)</Label>
                                <Input
                                    id="years"
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="extra" className="text-emerald-700 font-semibold flex items-center gap-2">
                                    <TrendingDown className="w-4 h-4" />
                                    Pay Extra Monthly?
                                </Label>
                                <span className="text-sm font-bold text-emerald-600">+${extraPayment}</span>
                            </div>
                            <Slider
                                value={[extraPayment]}
                                min={0}
                                max={principal * 0.05} // Cap at 5% of principal
                                step={50}
                                onValueChange={(v) => setExtraPayment(v[0])}
                            />
                            <p className="text-xs text-slate-500">
                                Paying even a little extra directly reduces your principal, slashing total interest.
                            </p>
                        </div>
                    </div>

                </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">

                <div className="flex justify-end">
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSave}
                        className={saved ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}
                     >
                        {saved ? "Saved to Dashboard" : <><Save size={16} className="mr-2"/> Save Scenario</>}
                     </Button>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-slate-900 text-white border-none">
                        <CardContent className="p-6">
                            <div className="text-slate-400 text-sm font-medium mb-1">Monthly Payment</div>
                            <div className="text-3xl font-bold">
                                ${(calculation.emi + extraPayment).toLocaleString(undefined, {maximumFractionDigits: 0})}
                            </div>
                            {extraPayment > 0 && (
                                <div className="text-xs text-emerald-400 mt-1">
                                    (Base: ${calculation.emi.toFixed(0)} + Extra: ${extraPayment})
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="bg-emerald-50 border-emerald-100">
                        <CardContent className="p-6">
                            <div className="text-emerald-800 text-sm font-medium mb-1">Total Interest</div>
                            <div className="text-3xl font-bold text-emerald-700">
                                ${calculation.totalInterestWithExtra.toLocaleString(undefined, {maximumFractionDigits: 0})}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Savings Highlight */}
                {extraPayment > 0 && calculation.savings > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4 animate-in fade-in zoom-in duration-300">
                        <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                            <PiggyBank size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-amber-900">Smart Move!</h4>
                            <p className="text-amber-800 text-sm mt-1">
                                By paying <strong>${extraPayment}</strong> extra per month, you will save <strong className="text-emerald-700">${calculation.savings.toLocaleString(undefined, {maximumFractionDigits: 0})}</strong> in interest and be debt-free <strong>{(calculation.timeSavedMonths / 12).toFixed(1)} years</strong> earlier.
                            </p>
                        </div>
                    </div>
                )}

                {/* Breakdown Chart */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Total Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <RechartsTooltip formatter={(value: any) => `$${Number(value).toLocaleString()}`} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
