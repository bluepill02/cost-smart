"use client";

import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/lib/formatters';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

export default function EMIVsSIPCalculator() {
    const [amount, setAmount] = useState<number>(20000); // Monthly amount
    const [loanRate, setLoanRate] = useState<number>(8.5);
    const [sipRate, setSipRate] = useState<number>(12);
    const [tenure, setTenure] = useState<number>(20);

    const result = useMemo(() => {
        // Scenario A: Pay EMI
        // If I pay 'amount' as EMI, how much loan can I get?
        // P = (EMI * ((1+r)^n - 1)) / (r * (1+r)^n)
        const monthlyLoanRate = loanRate / 12 / 100;
        const months = tenure * 12;

        const loanPrincipal = (amount * (Math.pow(1 + monthlyLoanRate, months) - 1)) / (monthlyLoanRate * Math.pow(1 + monthlyLoanRate, months));
        const totalLoanPaid = amount * months;
        const interestPaid = totalLoanPaid - loanPrincipal;

        // Scenario B: Invest in SIP
        // FV = P * [ (1+i)^n - 1 ] / i * (1+i)
        const monthlySipRate = sipRate / 12 / 100;
        const sipValue = amount * ((Math.pow(1 + monthlySipRate, months) - 1) / monthlySipRate) * (1 + monthlySipRate);
        const totalInvested = amount * months;
        const wealthGained = sipValue - totalInvested;

        // Chart Data
        const data = [];
        for (let i = 1; i <= tenure; i++) {
            const m = i * 12;

            // Loan Balance (Amortization) approximation for chart
            // For chart, let's show "Net Worth Impact"
            // Loan Path: You have an asset (Home) worth Principal (assuming 0 appreciation for conservative comparison) but you paid Interest.
            // SIP Path: You have Liquid Cash.

            // Simpler Chart: Total Interest Paid vs Total Wealth Gained
            const curLoanPaid = amount * m;

            // SIP
            const curSipValue = amount * ((Math.pow(1 + monthlySipRate, m) - 1) / monthlySipRate) * (1 + monthlySipRate);

            data.push({
                year: i,
                loanCost: Math.round(curLoanPaid), // Cumulative Outflow
                sipValue: Math.round(curSipValue), // Cumulative Value
            });
        }

        return {
            loanPrincipal,
            totalLoanPaid,
            interestPaid,
            sipValue,
            totalInvested,
            wealthGained,
            opportunityCost: sipValue - totalLoanPaid, // Difference in final value
            data
        };
    }, [amount, loanRate, sipRate, tenure]);

    return (
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="w-5 h-5 text-indigo-500" />
                            Configuration
                        </CardTitle>
                        <CardDescription>Compare monthly outflow of ₹{amount.toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Monthly Budget (₹)</Label>
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                                <Slider
                                    value={[amount]}
                                    min={5000}
                                    max={200000}
                                    step={1000}
                                    onValueChange={(v) => setAmount(v[0])}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Loan Interest Rate (%)</Label>
                                <Input
                                    type="number"
                                    value={loanRate}
                                    onChange={(e) => setLoanRate(Number(e.target.value))}
                                    step={0.1}
                                />
                                <Slider
                                    value={[loanRate]}
                                    min={6}
                                    max={15}
                                    step={0.1}
                                    onValueChange={(v) => setLoanRate(v[0])}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>SIP Return Rate (%)</Label>
                                <Input
                                    type="number"
                                    value={sipRate}
                                    onChange={(e) => setSipRate(Number(e.target.value))}
                                    step={0.1}
                                />
                                <Slider
                                    value={[sipRate]}
                                    min={8}
                                    max={20}
                                    step={0.1}
                                    onValueChange={(v) => setSipRate(v[0])}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Time Period (Years)</Label>
                                <Input
                                    type="number"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                />
                                <Slider
                                    value={[tenure]}
                                    min={5}
                                    max={30}
                                    step={1}
                                    onValueChange={(v) => setTenure(v[0])}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <ArrowRight size={18} /> Expert Insight
                    </h3>
                    <p className="text-sm text-blue-800">
                        <strong>The Cost of Debt:</strong> By paying an EMI of {formatCurrency(amount, 'INR')} for {tenure} years,
                        you end up paying {formatCurrency(result.interestPaid, 'INR')} just in interest to the bank.
                        However, investing the same amount could generate {formatCurrency(result.wealthGained, 'INR')} in returns.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white border-red-100 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Loan Scenario</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {formatCurrency(result.loanPrincipal, 'INR')}
                            </div>
                            <div className="text-xs text-red-500 mt-1 flex items-center">
                                <TrendingDown size={12} className="mr-1" />
                                Interest Paid: {formatCurrency(result.interestPaid, 'INR')}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-emerald-100 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">SIP Scenario</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-600">
                                {formatCurrency(result.sipValue, 'INR')}
                            </div>
                            <div className="text-xs text-emerald-500 mt-1 flex items-center">
                                <TrendingUp size={12} className="mr-1" />
                                Wealth Gained: {formatCurrency(result.wealthGained, 'INR')}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Growth vs Payment</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={result.data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis
                                    tickFormatter={(v) => `${(v/100000).toFixed(0)}L`}
                                    width={40}
                                />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <Tooltip formatter={(val: any) => formatCurrency(Number(val), 'INR')} />
                                <Legend />
                                <Line type="monotone" dataKey="loanCost" name="Total Paid (EMI)" stroke="#ef4444" strokeWidth={2} />
                                <Line type="monotone" dataKey="sipValue" name="Investment Value (SIP)" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="text-center p-4 bg-slate-900 text-white rounded-lg">
                    <div className="text-sm text-slate-400">Net Difference</div>
                    <div className="text-3xl font-bold text-emerald-400">
                        {formatCurrency(Math.abs(result.sipValue - result.totalLoanPaid), 'INR')}
                    </div>
                    <div className="text-xs mt-1">
                        {result.sipValue > result.totalLoanPaid ? "SIP Wins" : "Loan Wins"}
                    </div>
                </div>
            </div>
        </div>
    );
}
