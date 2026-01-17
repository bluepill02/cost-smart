"use client";

import dynamic from 'next/dynamic';
import React, { useState, useMemo } from 'react';
import { Landmark, Lock, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { saveHistoryItem } from '@/lib/history-manager';
import { formatCurrency } from '@/lib/formatters';

// Lazy load Recharts
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const RechartsTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });

export default function PPFCalculator() {
    const [investment, setInvestment] = useState<number>(150000); // Max 1.5L
    const [rate] = useState<number>(7.1); // Fixed for now, or fetchable
    const [period] = useState<number>(15); // Fixed 15 years

    // Validation
    const safeInvestment = Math.min(Math.max(investment, 500), 150000);

    const result = useMemo(() => {
        let balance = 0;
        let totalInvested = 0;
        const data = [];

        for (let i = 1; i <= period; i++) {
            totalInvested += safeInvestment;
            // Interest calculated on lowest balance between 5th and end of month.
            // Assuming annual deposit at start of year for simplicity (or monthly).
            // Formula for annual compounding: A = P(1+r)^t
            // But PPF is compounded annually.
            // If invested annually at start of year:
            const interest = (balance + safeInvestment) * (rate / 100);
            balance = balance + safeInvestment + interest;

            data.push({
                year: i,
                invested: totalInvested,
                interest: Math.round(balance - totalInvested),
                balance: Math.round(balance)
            });
        }

        return {
            totalMaturity: balance,
            totalInvested,
            totalInterest: balance - totalInvested,
            data
        };
    }, [safeInvestment, rate, period]);

    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        saveHistoryItem({
            type: 'ppf',
            title: `PPF Plan: ${formatCurrency(result.totalMaturity, 'INR', 'en-IN')}`,
            summary: `Invest ₹${safeInvestment.toLocaleString()}/yr @ ${rate}%`,
            link: `/in/ppf-calculator?i=${safeInvestment}`
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-fit shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-emerald-600" />
                        PPF Parameters
                    </CardTitle>
                    <CardDescription>
                        Public Provident Fund rules (15 Year Lock-in)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="investment">Annual Investment (₹)</Label>
                        <Input
                            id="investment"
                            type="number"
                            value={investment}
                            onChange={(e) => setInvestment(Number(e.target.value))}
                            className="text-lg font-bold"
                            max={150000}
                        />
                        <Slider
                            value={[safeInvestment]}
                            min={500}
                            max={150000}
                            step={500}
                            onValueChange={(v) => setInvestment(v[0])}
                        />
                        <p className="text-xs text-slate-500">Max limit: ₹1,50,000 per financial year.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 opacity-75">
                            <Label>Interest Rate</Label>
                            <div className="p-2 bg-slate-100 rounded border font-mono font-bold">{rate}%</div>
                            <p className="text-[10px] text-slate-400">Fixed by Govt.</p>
                        </div>
                        <div className="space-y-2 opacity-75">
                            <Label>Duration</Label>
                            <div className="p-2 bg-slate-100 rounded border font-mono font-bold flex items-center justify-between">
                                {period} Years <Lock size={12}/>
                            </div>
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
                        {saved ? "Saved" : <><Save size={16} className="mr-2"/> Save Plan</>}
                     </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-emerald-50 border-emerald-100">
                        <CardContent className="p-6">
                            <div className="text-emerald-800 text-sm font-medium mb-1">Maturity Value</div>
                            <div className="text-2xl md:text-3xl font-bold text-emerald-700">
                                {formatCurrency(result.totalMaturity, 'INR', 'en-IN')}
                            </div>
                            <Badge className="mt-2 bg-emerald-200 text-emerald-800 hover:bg-emerald-200 border-none">Tax Free</Badge>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-slate-200">
                        <CardContent className="p-6">
                            <div className="text-slate-500 text-sm font-medium mb-1">Total Interest</div>
                            <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                                {formatCurrency(result.totalInterest, 'INR', 'en-IN')}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Yearly Balance Growth</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={result.data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" tick={{fontSize: 12}} />
                                <YAxis
                                    tickFormatter={(value) =>
                                        new Intl.NumberFormat('en-IN', { notation: "compact", compactDisplay: "short" }).format(value)
                                    }
                                    tick={{fontSize: 12}}
                                    width={40}
                                />
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value), 'INR', 'en-IN')} />
                                <Legend />
                                <Bar dataKey="invested" name="Invested" stackId="a" fill="#94a3b8" />
                                <Bar dataKey="interest" name="Interest" stackId="a" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
