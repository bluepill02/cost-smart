"use client";

import dynamic from 'next/dynamic';
import React, { useState, useMemo } from 'react';
import { History, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { getCPI } from '@/lib/inflation-data';

// Lazy load Recharts components
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

export default function InflationCalculator() {
    const [amount, setAmount] = useState<number>(100);
    const [startYear, setStartYear] = useState<number>(1990);
    const [endYear, setEndYear] = useState<number>(2024);

    const result = useMemo(() => {
        const startCPI = getCPI(startYear);
        const endCPI = getCPI(endYear);

        if (!startCPI || !endCPI) return 0;

        return amount * (endCPI / startCPI);
    }, [amount, startYear, endYear]);

    const chartData = useMemo(() => {
        const data = [];
        const start = Math.min(startYear, endYear);
        const end = Math.max(startYear, endYear);
        const startCPI = getCPI(startYear); // Base CPI for the amount

        // Generate points every 5 years or so if range is large, or every year
        for (let y = start; y <= end; y++) {
             const cpi = getCPI(y);
             // Value of the original amount in year Y
             const val = amount * (cpi / startCPI);
             data.push({ year: y, value: val });
        }
        return data;
    }, [amount, startYear, endYear]);

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-slate-200 shadow-md h-fit">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="w-5 h-5 text-emerald-600" />
                        Time Machine Parameters
                    </CardTitle>
                    <CardDescription>Enter a value and a year range.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount ($)</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="text-lg font-bold"
                        />
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Start Year</Label>
                                <span className="font-mono font-bold text-slate-700">{startYear}</span>
                            </div>
                            <Slider
                                value={[startYear]}
                                min={1913}
                                max={2024}
                                step={1}
                                onValueChange={(v) => setStartYear(v[0])}
                            />
                        </div>

                        <div className="space-y-2">
                             <div className="flex justify-between">
                                <Label>End Year</Label>
                                <span className="font-mono font-bold text-emerald-700">{endYear}</span>
                            </div>
                            <Slider
                                value={[endYear]}
                                min={1913}
                                max={2024}
                                step={1}
                                onValueChange={(v) => setEndYear(v[0])}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className={amount > result ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}>
                    <CardHeader>
                        <CardTitle className="text-lg text-slate-700">Buying Power Conversion</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pb-8">
                        <div className="flex items-center justify-center gap-4 text-slate-500 font-medium mb-2">
                             <span>${amount} in {startYear}</span>
                             <ArrowRight size={16} />
                             <span>{endYear} Equivalent</span>
                        </div>
                        <div className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                            ${result.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                        <p className="text-sm text-slate-500 mt-4 max-w-xs mx-auto">
                            Cumulative Inflation: <strong>{(((result - amount) / amount) * 100).toFixed(1)}%</strong>
                        </p>
                    </CardContent>
                </Card>

                {/* Chart */}
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Value Trajectory</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="year" tick={{fontSize: 10}} minTickGap={30} />
                                <YAxis hide domain={['auto', 'auto']} />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <Tooltip formatter={(val: any) => `$${Number(val).toFixed(2)}`} />
                                <Area type="monotone" dataKey="value" stroke="#059669" fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
