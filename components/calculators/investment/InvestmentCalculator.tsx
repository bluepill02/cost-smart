"use client";

import dynamic from 'next/dynamic';
import React, { useState, useMemo } from 'react';
import { TrendingUp, Save, Printer } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { saveHistoryItem } from '@/lib/history-manager';
import { formatCurrency } from '@/lib/formatters';

// Lazy load Recharts
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const RechartsTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });

interface InvestmentCalculatorProps {
    defaultMonthly?: number;
    defaultInitial?: number;
    defaultRate?: number;
    defaultYears?: number;
    currency?: string;
    locale?: string;
    mode?: 'SIP' | 'Lumpsum' | 'Combined';
}

export default function InvestmentCalculator({
    defaultMonthly = 500,
    defaultInitial = 1000,
    defaultRate = 12,
    defaultYears = 10,
    currency = 'USD',
    locale = 'en-US',
    mode = 'Combined'
}: InvestmentCalculatorProps) {
    const [monthly, setMonthly] = useState<number>(defaultMonthly);
    const [initial, setInitial] = useState<number>(defaultInitial);
    const [rate, setRate] = useState<number>(defaultRate);
    const [years, setYears] = useState<number>(defaultYears);

    const result = useMemo(() => {
        const r = rate / 100 / 12;
        const n = years * 12;

        // Future value of Initial Lumpsum
        // FV = P * (1+r)^n
        const fvInitial = initial * Math.pow(1 + r, n);

        // Future value of Monthly SIP
        // FV = P * ((1+r)^n - 1) / r * (1+r)  (Assuming payment at beginning of month)
        // If payment at end: FV = P * ((1+r)^n - 1) / r
        // SIP usually assumes beginning? Let's assume End for standard financial formulas,
        // but SIP calculators often use Beginning. Let's use End for conservative, or create a toggle.
        // Most online SIP calculators use: M = P × ({[1 + i]^n - 1} / i) × (1 + i)  <-- This is Beginning
        const fvMonthly = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

        const totalValue = fvInitial + fvMonthly;
        const totalInvested = initial + (monthly * n);
        const totalGrowth = totalValue - totalInvested;

        // Generate Chart Data (Yearly points)
        const data = [];
        for (let i = 0; i <= years; i++) {
             // Calculate value at year i
             const months = i * 12;
             const valInitial = initial * Math.pow(1 + r, months);
             const valMonthly = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
             const total = i === 0 ? initial : (valInitial + valMonthly);
             const invested = initial + (monthly * months);

             data.push({
                 year: `Year ${i}`,
                 invested: Math.round(invested),
                 value: Math.round(total),
                 growth: Math.round(total - invested)
             });
        }

        return {
            totalValue,
            totalInvested,
            totalGrowth,
            data
        };
    }, [monthly, initial, rate, years]);

    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        saveHistoryItem({
            type: 'investment',
            title: `Investment Plan: ${formatCurrency(result.totalValue, currency, locale)}`,
            summary: `${years}yr | +${formatCurrency(monthly, currency, locale)}/mo`,
            link: `/investment-calculator?m=${monthly}&i=${initial}&r=${rate}&y=${years}`
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
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        Investment Strategy
                    </CardTitle>
                    <CardDescription>
                        {mode === 'SIP' ? 'Regular monthly investments build massive wealth.' : 'Calculate how your money grows over time.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Monthly Investment */}
                    <div className="space-y-4">
                        <Label htmlFor="monthly">Monthly Investment ({currency === 'USD' ? '$' : (currency === 'INR' ? '₹' : currency)})</Label>
                        <div className="flex gap-4 items-center">
                            <Input
                                id="monthly"
                                type="number"
                                value={monthly}
                                onChange={(e) => setMonthly(Number(e.target.value))}
                                className="text-lg font-bold"
                            />
                        </div>
                        <Slider
                            value={[monthly]}
                            min={0}
                            max={currency === 'USD' ? 5000 : 100000}
                            step={currency === 'USD' ? 50 : 500}
                            onValueChange={(v) => setMonthly(v[0])}
                        />
                    </div>

                    {/* Initial Investment */}
                    <div className="space-y-4">
                        <Label htmlFor="initial">Initial Lumpsum ({currency === 'USD' ? '$' : (currency === 'INR' ? '₹' : currency)})</Label>
                        <Input
                            id="initial"
                            type="number"
                            value={initial}
                            onChange={(e) => setInitial(Number(e.target.value))}
                        />
                        <Slider
                            value={[initial]}
                            min={0}
                            max={currency === 'USD' ? 100000 : 5000000}
                            step={currency === 'USD' ? 1000 : 10000}
                            onValueChange={(v) => setInitial(v[0])}
                        />
                    </div>

                    {/* Rate & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="rate">Return Rate (%)</Label>
                            <Input
                                id="rate"
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                step="0.1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="years">Duration (Years)</Label>
                            <Input
                                id="years"
                                type="number"
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                 <div className="flex justify-end gap-2">
                      <Button
                         variant="outline"
                         size="sm"
                         onClick={handleSave}
                         className={saved ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}
                      >
                         {saved ? "Saved" : <><Save size={16} className="mr-2"/> Save Plan</>}
                      </Button>
                      <Button
                         variant="outline"
                         size="sm"
                         onClick={() => window.print()}
                         className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
                      >
                         <Printer size={16} className="mr-2" /> Print Plan
                      </Button>
                 </div>

                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-slate-900 text-white border-none">
                        <CardContent className="p-6">
                            <div className="text-slate-400 text-sm font-medium mb-1">Total Maturity Value</div>
                            <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                                {formatCurrency(result.totalValue, currency, locale)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-slate-200">
                        <CardContent className="p-6">
                            <div className="text-slate-500 text-sm font-medium mb-1">Total Wealth Gained</div>
                            <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                                +{formatCurrency(result.totalGrowth, currency, locale)}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                                Invested: {formatCurrency(result.totalInvested, currency, locale)}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Dynamically placed in-content ad slot */}
                <div className="my-4 print:hidden">
                    <AdContainer slotId="4057982103" size="square" />
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Wealth Growth Projection</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={result.data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    tick={{fontSize: 12}}
                                    interval="preserveStartEnd"
                                    minTickGap={30}
                                />
                                <YAxis
                                    tickFormatter={(value) =>
                                        new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(value)
                                    }
                                    tick={{fontSize: 12}}
                                    width={40}
                                />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value), currency, locale)} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#10b981"
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    name="Total Value"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="invested"
                                    stroke="#94a3b8"
                                    fill="none"
                                    strokeDasharray="5 5"
                                    name="Invested Amount"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Print-friendly report layout */}
        <div className="hidden print:block print:bg-white p-8 max-w-[210mm] mx-auto text-slate-900 font-sans">
             <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
                 <div>
                     <h1 className="text-3xl font-bold text-slate-900">Wealth Projection Report</h1>
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
                         <div className="text-xs text-slate-500 mb-1">Initial Lumpsum</div>
                         <div className="text-xl font-bold text-slate-900">{formatCurrency(initial, currency, locale)}</div>
                     </div>
                     <div className="bg-slate-50 p-4 rounded border border-slate-100">
                         <div className="text-xs text-slate-500 mb-1">Monthly Contribution</div>
                         <div className="text-xl font-bold text-slate-900">{formatCurrency(monthly, currency, locale)}</div>
                     </div>
                     <div className="bg-emerald-50 p-4 rounded border border-emerald-100">
                         <div className="text-xs text-emerald-800 mb-1">Final Wealth Projected</div>
                         <div className="text-xl font-bold text-emerald-700">{formatCurrency(result.totalValue, currency, locale)}</div>
                     </div>
                 </div>
             </div>

             <div className="mb-8">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-3">Detailed Financial Breakdown</h2>
                 <table className="w-full text-sm text-left border-collapse">
                     <thead>
                         <tr className="border-b border-slate-200 bg-slate-50">
                             <th className="py-2 px-3 font-semibold text-slate-600">Metric</th>
                             <th className="py-2 px-3 font-semibold text-slate-600 text-right">Value</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         <tr>
                             <td className="py-3 px-3 text-slate-500">Compound Growth Rate</td>
                             <td className="py-3 px-3 font-medium text-right">{rate}% Per Annum</td>
                         </tr>
                         <tr>
                             <td className="py-3 px-3 text-slate-500">Duration modeled</td>
                             <td className="py-3 px-3 font-medium text-right">{years} Years</td>
                         </tr>
                         <tr>
                             <td className="py-3 px-3 text-slate-500">Total Capital Invested</td>
                             <td className="py-3 px-3 font-semibold text-right">{formatCurrency(result.totalInvested, currency, locale)}</td>
                         </tr>
                         <tr className="bg-emerald-50/40">
                             <td className="py-3 px-3 text-emerald-800 font-bold">Total Net Wealth Gained</td>
                             <td className="py-3 px-3 font-extrabold text-emerald-700 text-right">+{formatCurrency(result.totalGrowth, currency, locale)}</td>
                         </tr>
                         <tr className="bg-slate-100/50 font-semibold">
                             <td className="py-3 px-3 text-slate-800">Total Portfolio Value</td>
                             <td className="py-3 px-3 font-bold text-slate-900 text-right">{formatCurrency(result.totalValue, currency, locale)}</td>
                         </tr>
                     </tbody>
                 </table>
             </div>

             <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm text-slate-600 mb-8">
                 <h3 className="font-bold text-slate-800 mb-2">Smart Insights</h3>
                 <p className="leading-relaxed">
                     By keeping your funds invested, the power of compound interest accelerates. Over a {years}-year timeline at {rate}% return, your net capital gain accounts for <strong>{((result.totalGrowth / result.totalValue) * 100).toFixed(0)}%</strong> of your total future net worth. This illustrates how consistency and timeline yield dramatic wealth effects.
                 </p>
             </div>

             <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
                 <p>Generated by CostSmart Investment Return Calculator. Growth modeling is based on standard interest compounding frequencies.</p>
                 <p className="mt-1">Visit https://costsmart.app for live updates.</p>
             </div>
        </div>
        </>
    );
}
