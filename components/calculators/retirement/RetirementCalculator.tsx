"use client";

import React, { useState, useMemo } from 'react';
import { Palmtree, Save, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { saveHistoryItem } from '@/lib/history-manager';
import { formatCurrency } from '@/lib/formatters';

// Lazy load Recharts
// const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
// const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
// const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
// const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
// const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
// const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
// const RechartsTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });

interface RetirementCalculatorProps {
    currency?: string;
    locale?: string;
}

export default function RetirementCalculator({
    currency = 'USD',
    locale = 'en-US'
}: RetirementCalculatorProps) {
    const [currentAge, setCurrentAge] = useState<number>(30);
    const [retirementAge, setRetirementAge] = useState<number>(60);
    const [monthlyExpense, setMonthlyExpense] = useState<number>(currency === 'USD' ? 4000 : 50000);
    const [currentSavings, setCurrentSavings] = useState<number>(currency === 'USD' ? 50000 : 1000000);
    const [monthlySavings, setMonthlySavings] = useState<number>(currency === 'USD' ? 1000 : 20000);
    const [inflation, setInflation] = useState<number>(6);
    const [returnRate, setReturnRate] = useState<number>(10); // Pre-retirement
    const [postRetirementRate] = useState<number>(8); // Conservative
    const [lifeExpectancy] = useState<number>(85);

    const result = useMemo(() => {
        const yearsToRetire = retirementAge - currentAge;
        const yearsInRetirement = lifeExpectancy - retirementAge;

        // 1. Calculate Required Corpus (Inflation Adjusted)
        // Future Monthly Expense = Current * (1+inf)^years
        const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflation/100, yearsToRetire);

        // Corpus needed to sustain this expense for yearsInRetirement
        // Using Annuity Formula? Or simply: Expense * 12 / (Real Rate of Return) ?
        // Real Rate = (1+Nominal)/(1+Inflation) - 1.
        // Let's use a standard bucket method or simply "25x rule" adjusted for inflation?
        // Let's do accurate: PMT = FutureMonthlyExpense. n = yearsInRetirement*12. r = (PostRate - Inflation) / 12 ??
        // Actually, during retirement, inflation still eats value.
        // Let's use Real Rate of Return during retirement.
        const realRate = ((1 + postRetirementRate/100) / (1 + inflation/100)) - 1;
        const rMonth = realRate / 12;
        const nMonth = yearsInRetirement * 12;

        // Corpus = P * [1 - (1+r)^-n] / r
        const requiredCorpus = futureMonthlyExpense * (1 - Math.pow(1 + rMonth, -nMonth)) / rMonth;

        // 2. Calculate Projected Corpus from Savings
        // FV of Current Savings
        const fvCurrent = currentSavings * Math.pow(1 + returnRate/100, yearsToRetire);
        // FV of Monthly SIP (End of period)
        const rInvest = returnRate/100/12;
        const nInvest = yearsToRetire * 12;
        const fvSIP = monthlySavings * (Math.pow(1 + rInvest, nInvest) - 1) / rInvest;

        const projectedCorpus = fvCurrent + fvSIP;
        const gap = requiredCorpus - projectedCorpus;

        return {
            requiredCorpus,
            projectedCorpus,
            gap,
            yearsToRetire,
            futureMonthlyExpense
        };
    }, [currentAge, retirementAge, monthlyExpense, currentSavings, monthlySavings, inflation, returnRate, postRetirementRate, lifeExpectancy]);

    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        saveHistoryItem({
            type: 'retirement',
            title: `Retirement Goal: ${formatCurrency(result.requiredCorpus, currency, locale)}`,
            summary: `Gap: ${formatCurrency(result.gap, currency, locale)}`,
            link: `/retirement-calculator`
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-fit shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palmtree className="w-5 h-5 text-emerald-600" />
                        Plan Your Freedom
                    </CardTitle>
                    <CardDescription>Adjust variables to see if you are on track.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Current Age</Label>
                            <Input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Retire At</Label>
                            <Input type="number" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} />
                        </div>
                    </div>

                     <div className="space-y-4">
                        <Label>Current Monthly Expenses ({currency === 'USD' ? '$' : (currency === 'INR' ? '₹' : currency)})</Label>
                        <Input type="number" value={monthlyExpense} onChange={e => setMonthlyExpense(Number(e.target.value))} />
                         <p className="text-xs text-slate-500">Expenses you need to cover in retirement (today&apos;s value).</p>
                    </div>

                    <div className="space-y-4">
                        <Label>Current Investments / Savings</Label>
                        <Input type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} />
                    </div>

                    <div className="space-y-4">
                        <Label>Monthly Investment (SIP)</Label>
                        <Input type="number" value={monthlySavings} onChange={e => setMonthlySavings(Number(e.target.value))} />
                        <Slider value={[monthlySavings]} min={0} max={currency === 'USD' ? 10000 : 200000} step={currency === 'USD' ? 100 : 1000} onValueChange={v => setMonthlySavings(v[0])} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label>Inflation (%)</Label>
                            <Input type="number" value={inflation} onChange={e => setInflation(Number(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Exp. Return (%)</Label>
                            <Input type="number" value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} />
                        </div>
                    </div>
                </CardContent>
            </Card>

             <div className="space-y-6">
                 <div className="flex justify-end">
                     <Button variant="outline" size="sm" onClick={handleSave} className={saved ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}>
                        {saved ? "Saved" : <><Save size={16} className="mr-2"/> Save Plan</>}
                     </Button>
                </div>

                <div className="grid gap-4">
                    <Card className="bg-slate-900 text-white border-none">
                        <CardContent className="p-6">
                            <div className="text-slate-400 text-sm font-medium mb-1">Required Corpus</div>
                            <div className="text-3xl font-bold text-emerald-400">
                                {formatCurrency(result.requiredCorpus, currency, locale)}
                            </div>
                            <div className="text-xs text-slate-500 mt-2">
                                To cover {formatCurrency(result.futureMonthlyExpense, currency, locale)}/mo (inflation adjusted)
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                         <Card className="bg-white border-slate-200">
                            <CardContent className="p-4">
                                <div className="text-slate-500 text-xs font-medium mb-1">Projected Savings</div>
                                <div className="text-xl font-bold text-slate-800">
                                    {formatCurrency(result.projectedCorpus, currency, locale)}
                                </div>
                            </CardContent>
                        </Card>
                         <Card className={`${result.gap > 0 ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
                            <CardContent className="p-4">
                                <div className={`${result.gap > 0 ? 'text-red-800' : 'text-emerald-800'} text-xs font-medium mb-1`}>
                                    {result.gap > 0 ? 'Shortfall' : 'Surplus'}
                                </div>
                                <div className={`text-xl font-bold ${result.gap > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                                    {formatCurrency(Math.abs(result.gap), currency, locale)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {result.gap > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertTriangle className="text-amber-600 w-5 h-5 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-amber-900 font-medium">You are falling short.</p>
                                <p className="text-xs text-amber-800 mt-1">
                                    Consider increasing your monthly investment or retiring later. Increasing SIP by just 10% can make a huge difference.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
