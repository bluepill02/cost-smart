"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, Calendar, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/lib/formatters';
import { PPP_DATA } from '@/lib/ppp-data';

export default function FreelanceRateCalculator() {
    // Basic Inputs
    const [targetIncome, setTargetIncome] = useState<number>(60000);
    const [expenses, setExpenses] = useState<number>(500);
    const [taxRate, setTaxRate] = useState<number>(20);
    const [billableHours, setBillableHours] = useState<number>(25);
    const [weeksOff, setWeeksOff] = useState<number>(4);

    // Geo-Arbitrage Inputs
    const [geoMode, setGeoMode] = useState(false);
    const [benchmarkCountryCode, setBenchmarkCountryCode] = useState('USA');
    const [myCountryCode, setMyCountryCode] = useState('USA');

    const result = useMemo(() => {
        // 1. Calculate Effective Target Income based on Geo-Arbitrage
        let effectiveTargetIncome = targetIncome;
        let currency = 'USD';
        let currencySymbol = '$';

        if (geoMode) {
            const benchmark = PPP_DATA.find(c => c.code === benchmarkCountryCode) || PPP_DATA[0];
            const local = PPP_DATA.find(c => c.code === myCountryCode) || PPP_DATA[1];

            // Convert "Benchmark Income" to "Local Equivalent"
            // (Input / Benchmark PPP) * Local PPP
            effectiveTargetIncome = (targetIncome / benchmark.pppFactor) * local.pppFactor;
            currency = local.currency;
            currencySymbol = local.currencySymbol;
        }

        const annualExpenses = expenses * 12;
        // Expenses are assumed to be in the SAME currency as the effective income (Local)

        const grossIncomeNeeded = effectiveTargetIncome / (1 - taxRate / 100);
        const totalRevenueNeeded = grossIncomeNeeded + annualExpenses;

        const workingWeeks = 52 - weeksOff;
        const totalBillableHours = workingWeeks * billableHours;

        const hourlyRate = totalRevenueNeeded / totalBillableHours;
        const dayRate = hourlyRate * 8; // Assuming 8h day equivalent

        return {
            hourlyRate,
            dayRate,
            totalRevenueNeeded,
            taxAmount: grossIncomeNeeded - effectiveTargetIncome,
            effectiveTargetIncome,
            currency,
            currencySymbol
        };
    }, [targetIncome, expenses, taxRate, billableHours, weeksOff, geoMode, benchmarkCountryCode, myCountryCode]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Work Parameters
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                                <Switch id="geo-mode" checked={geoMode} onCheckedChange={setGeoMode} />
                                <Label htmlFor="geo-mode" className="text-xs font-medium text-slate-500">Geo-Arbitrage Mode</Label>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {geoMode && (
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-2">
                                    <Label className="text-blue-800 text-xs uppercase font-bold">I want the lifestyle of...</Label>
                                    <Select value={benchmarkCountryCode} onValueChange={setBenchmarkCountryCode}>
                                        <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {PPP_DATA.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-blue-800 text-xs uppercase font-bold">But I live in...</Label>
                                    <Select value={myCountryCode} onValueChange={setMyCountryCode}>
                                        <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {PPP_DATA.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-2 text-xs text-blue-600">
                                    We&apos;ll calculate the local income needed to match your benchmark lifestyle.
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="income">
                                    {geoMode ? `Benchmark Net Income (${PPP_DATA.find(c => c.code === benchmarkCountryCode)?.currencySymbol})` : 'Target Annual Net Income ($)'}
                                </Label>
                                <Input
                                    id="income"
                                    type="number"
                                    value={targetIncome}
                                    onChange={(e) => setTargetIncome(Number(e.target.value))}
                                    className="font-bold text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expenses">Monthly Expenses ({result.currencySymbol})</Label>
                                <Input
                                    id="expenses"
                                    type="number"
                                    value={expenses}
                                    onChange={(e) => setExpenses(Number(e.target.value))}
                                />
                            </div>
                        </div>

                         <div className="grid md:grid-cols-3 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="tax">Tax Rate (%)</Label>
                                <Input
                                    id="tax"
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hours">Billable Hours/Week</Label>
                                <Input
                                    id="hours"
                                    type="number"
                                    value={billableHours}
                                    onChange={(e) => setBillableHours(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weeks">Weeks Off/Year</Label>
                                <Input
                                    id="weeks"
                                    type="number"
                                    value={weeksOff}
                                    onChange={(e) => setWeeksOff(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Required Rates</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Minimum Hourly Rate</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {formatCurrency(result.hourlyRate, result.currency)}
                            </div>
                        </div>

                         <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Day Rate (8h)</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.dayRate, result.currency)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-sm">
                            <div>
                                <div className="text-slate-400">Gross Revenue</div>
                                <div className="font-medium text-slate-200">{formatCurrency(result.totalRevenueNeeded, result.currency)}</div>
                            </div>
                             <div>
                                <div className="text-slate-400">Est. Tax</div>
                                <div className="font-medium text-slate-200">{formatCurrency(result.taxAmount, result.currency)}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {geoMode && (
                    <Card className="bg-emerald-50 border-emerald-100">
                        <CardContent className="p-4 flex gap-3">
                            <Zap className="w-8 h-8 text-emerald-600 shrink-0" />
                            <div>
                                <h4 className="font-bold text-emerald-900 text-sm">Geo-Arbitrage Win</h4>
                                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                                    You only need <strong>{formatCurrency(result.effectiveTargetIncome, result.currency)}</strong> in {PPP_DATA.find(c => c.code === myCountryCode)?.name} to live like someone earning <strong>{formatCurrency(targetIncome, PPP_DATA.find(c => c.code === benchmarkCountryCode)?.currency || 'USD')}</strong> in {PPP_DATA.find(c => c.code === benchmarkCountryCode)?.name}.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
