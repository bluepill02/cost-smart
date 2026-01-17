"use client";

import dynamic from 'next/dynamic';
import React, { useState, useMemo } from 'react';
import { Archive, Save, TrendingUp } from 'lucide-react';
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

interface FDCalculatorProps {
    currency?: string;
    locale?: string;
    defaultPrincipal?: number;
    compoundingFrequency?: 'quarterly' | 'monthly' | 'yearly'; // Default for India is Quarterly
}

export default function FDCalculator({
    currency = 'USD',
    locale = 'en-US',
    defaultPrincipal = 10000,
    compoundingFrequency = 'quarterly'
}: FDCalculatorProps) {
    const [principal, setPrincipal] = useState<number>(defaultPrincipal);
    const [rate, setRate] = useState<number>(6.5);
    const [years, setYears] = useState<number>(5);

    const result = useMemo(() => {
        // A = P(1 + r/n)^(nt)
        let n = 1;
        if (compoundingFrequency === 'quarterly') n = 4;
        if (compoundingFrequency === 'monthly') n = 12;

        const r = rate / 100;
        const totalAmount = principal * Math.pow(1 + r/n, n * years);
        const totalInterest = totalAmount - principal;

        // Chart Data
        const data = [];
        for (let i = 0; i <= years; i++) {
            const val = principal * Math.pow(1 + r/n, n * i);
            data.push({
                year: `Year ${i}`,
                value: Math.round(val),
                principal: principal
            });
        }

        return {
            totalAmount,
            totalInterest,
            data
        };
    }, [principal, rate, years, compoundingFrequency]);

    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        saveHistoryItem({
            type: 'fd',
            title: `Fixed Deposit: ${formatCurrency(result.totalAmount, currency, locale)}`,
            summary: `${years}yr @ ${rate}%`,
            link: `/in/fd-calculator`
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-fit shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Archive className="w-5 h-5 text-emerald-600" />
                        Fixed Deposit Details
                    </CardTitle>
                    <CardDescription>
                        {compoundingFrequency === 'quarterly' ? 'Interest compounded quarterly (Standard).' : 'Calculate your returns.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="principal">Investment Amount ({currency === 'USD' ? '$' : (currency === 'INR' ? '₹' : currency)})</Label>
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
                            max={currency === 'USD' ? 1000000 : 10000000}
                            step={1000}
                            onValueChange={(v) => setPrincipal(v[0])}
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
                 <div className="flex justify-end">
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSave}
                        className={saved ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}
                     >
                        {saved ? "Saved" : <><Save size={16} className="mr-2"/> Save Scenario</>}
                     </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-slate-900 text-white border-none">
                        <CardContent className="p-6">
                            <div className="text-slate-400 text-sm font-medium mb-1">Maturity Amount</div>
                            <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                                {formatCurrency(result.totalAmount, currency, locale)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-emerald-50 border-emerald-100">
                         <CardContent className="p-6">
                            <div className="text-emerald-800 text-sm font-medium mb-1">Total Interest</div>
                            <div className="text-2xl md:text-3xl font-bold text-emerald-700">
                                {formatCurrency(result.totalInterest, currency, locale)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2"><TrendingUp size={16}/> Growth Over Time</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={result.data}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" tick={{fontSize: 12}} />
                                <YAxis
                                    tickFormatter={(value) =>
                                        new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(value)
                                    }
                                    tick={{fontSize: 12}}
                                    width={40}
                                />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value), currency, locale)} />
                                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
