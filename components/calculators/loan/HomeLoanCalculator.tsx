"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from '@/lib/formatters';
import dynamic from 'next/dynamic';

const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

export default function HomeLoanCalculator() {
    const [loanAmount, setLoanAmount] = useState<number>(5000000);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [tenureYears, setTenureYears] = useState<number>(20);

    // Prepayment State
    const [enablePrepayment, setEnablePrepayment] = useState<boolean>(false);
    const [prepaymentAmount, setPrepaymentAmount] = useState<number>(10000); // Monthly extra
    const [prepaymentStartMonth, setPrepaymentStartMonth] = useState<number>(12); // Start after 1 year

    const result = useMemo(() => {
        const monthlyRate = interestRate / 12 / 100;
        const totalMonths = tenureYears * 12;

        // Standard EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

        // Amortization Schedule
        let balance = loanAmount;
        let totalInterest = 0;
        let totalInterestWithPrepayment = 0;
        let monthsWithPrepayment = 0;

        const data = [];
        let balanceWithPrepayment = loanAmount;

        for (let i = 1; i <= totalMonths; i++) {
            // Standard Scenario (Reference)
            if (balance > 0) {
                const interest = balance * monthlyRate;
                totalInterest += interest;
                balance = balance + interest - emi;
                if (balance < 0) balance = 0;
            }

            // Prepayment Scenario
            if (balanceWithPrepayment > 0) {
                const interest = balanceWithPrepayment * monthlyRate;
                totalInterestWithPrepayment += interest;

                let payment = emi;
                // Add prepayment if enabled and within timeframe
                if (enablePrepayment && i >= prepaymentStartMonth) {
                    payment += prepaymentAmount;
                }

                // Don't overpay
                if (payment > balanceWithPrepayment + interest) {
                    payment = balanceWithPrepayment + interest;
                }

                balanceWithPrepayment = balanceWithPrepayment + interest - payment;
                if (balanceWithPrepayment < 0) balanceWithPrepayment = 0;
                monthsWithPrepayment = i;
            }

            if (i % 12 === 0 || i === 1) { // Add data point every year
                data.push({
                    year: Math.ceil(i / 12),
                    balance: Math.round(balance),
                    balanceWithPrepayment: Math.round(balanceWithPrepayment)
                });
            }
        }

        const savedInterest = totalInterest - totalInterestWithPrepayment;
        const savedMonths = totalMonths - monthsWithPrepayment;

        return {
            emi,
            totalInterest,
            totalAmount: loanAmount + totalInterest,
            totalInterestWithPrepayment,
            monthsWithPrepayment,
            savedInterest,
            savedMonths,
            data
        };
    }, [loanAmount, interestRate, tenureYears, enablePrepayment, prepaymentAmount, prepaymentStartMonth]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-emerald-500" />
                            Loan Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
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
                                    max={20000000}
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
                                        min={1}
                                        max={20}
                                        step={0.1}
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
                                        max={30}
                                        step={1}
                                        onValueChange={(v) => setTenureYears(v[0])}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t">
                            <div className="flex items-center justify-between mb-4">
                                <Label htmlFor="prepayment-toggle" className="text-base font-semibold">Enable Prepayment</Label>
                                <Switch
                                    id="prepayment-toggle"
                                    checked={enablePrepayment}
                                    onCheckedChange={setEnablePrepayment}
                                />
                            </div>

                            {enablePrepayment && (
                                <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">
                                    <div className="space-y-2">
                                        <Label htmlFor="prepayment-amt">Extra Monthly Payment</Label>
                                        <Input
                                            id="prepayment-amt"
                                            type="number"
                                            value={prepaymentAmount}
                                            onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="prepayment-start">Starts After (Months)</Label>
                                        <Input
                                            id="prepayment-start"
                                            type="number"
                                            value={prepaymentStartMonth}
                                            onChange={(e) => setPrepaymentStartMonth(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Amortization Curve</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={result.data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{fontSize: 12}} />
                                <YAxis
                                    tickFormatter={(v) => `${v/100000}L`}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{fontSize: 12}}
                                />
                                <Tooltip
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    formatter={(value: any) => formatCurrency(value, 'INR')}
                                    labelFormatter={(label) => `Year ${label}`}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="balance"
                                    stroke="#cbd5e1"
                                    fill="#f1f5f9"
                                    name="Regular Balance"
                                />
                                {enablePrepayment && (
                                    <Area
                                        type="monotone"
                                        dataKey="balanceWithPrepayment"
                                        stroke="#10b981"
                                        fill="#d1fae5"
                                        name="With Prepayment"
                                        fillOpacity={0.6}
                                    />
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Loan Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Monthly EMI</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {formatCurrency(result.emi, 'INR')}
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Total Interest</span>
                                <span className="font-semibold text-lg text-red-300">
                                    {formatCurrency(enablePrepayment ? result.totalInterestWithPrepayment : result.totalInterest, 'INR')}
                                </span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-slate-400">Total Payable</span>
                                <span className="font-semibold text-lg">
                                    {formatCurrency(loanAmount + (enablePrepayment ? result.totalInterestWithPrepayment : result.totalInterest), 'INR')}
                                </span>
                            </div>
                        </div>

                        {enablePrepayment && (
                            <div className="bg-emerald-900/30 border border-emerald-800 p-4 rounded-lg space-y-3">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                    <TrendingDown size={18} /> Prepayment Savings
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-slate-400">Interest Saved</div>
                                        <div className="font-bold text-white text-lg">
                                            {formatCurrency(result.savedInterest, 'INR')}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400">Time Saved</div>
                                        <div className="font-bold text-white text-lg">
                                            {Math.floor(result.savedMonths / 12)}Y {result.savedMonths % 12}M
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                        <ArrowRight size={18}/>
                        Expert Tip
                    </h4>
                    <p className="text-sm text-blue-800">
                        {enablePrepayment ? (
                            <span>
                                Great job! Paying just <strong>{formatCurrency(prepaymentAmount, 'INR')}</strong> extra per month saves you
                                <strong> {formatCurrency(result.savedInterest, 'INR')}</strong> and helps you become debt-free
                                <strong> {Math.floor(result.savedMonths / 12)} years</strong> earlier.
                            </span>
                        ) : (
                            <span>
                                Try enabling <strong>Prepayment</strong>. Even a small extra payment of ₹5,000/month can reduce your tenure by years and save lakhs in interest.
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
