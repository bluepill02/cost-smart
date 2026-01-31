"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, Globe, TrendingUp } from 'lucide-react';
import { PPP_DATA } from '@/lib/ppp-data';
import { formatCurrency } from '@/lib/formatters';

export default function PPPCalculator() {
    const [amount, setAmount] = useState<number>(100000);
    const [sourceCode, setSourceCode] = useState<string>('USA');
    const [targetCode, setTargetCode] = useState<string>('GBR');

    const sourceCountry = PPP_DATA.find(c => c.code === sourceCode) || PPP_DATA[0];
    const targetCountry = PPP_DATA.find(c => c.code === targetCode) || PPP_DATA[1];

    const result = useMemo(() => {
        // Convert Source to International Dollars
        const internationalDollars = amount / sourceCountry.pppFactor;
        // Convert Int$ to Target LCU
        const equivalentAmount = internationalDollars * targetCountry.pppFactor;

        return equivalentAmount;
    }, [amount, sourceCountry, targetCountry]);

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        Salary Details
                    </CardTitle>
                    <CardDescription>Compare the true purchasing power of your income.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>I earn in...</Label>
                        <Select value={sourceCode} onValueChange={setSourceCode}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {PPP_DATA.map(c => (
                                    <SelectItem key={c.code} value={c.code}>
                                        {c.name} ({c.currency})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Annual Salary ({sourceCountry.currencySymbol})</Label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="text-lg font-bold"
                        />
                    </div>

                    <div className="flex justify-center py-2">
                        <ArrowRightLeft className="text-slate-400 w-6 h-6 rotate-90 lg:rotate-0" />
                    </div>

                    <div className="space-y-2">
                        <Label>I want to live in...</Label>
                        <Select value={targetCode} onValueChange={setTargetCode}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {PPP_DATA.map(c => (
                                    <SelectItem key={c.code} value={c.code}>
                                        {c.name} ({c.currency})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none shadow-xl">
                    <CardContent className="p-8 flex flex-col justify-center h-full min-h-[200px]">
                        <div className="text-slate-400 font-medium mb-2">Equivalent Lifestyle Salary</div>
                        <div className="text-4xl lg:text-5xl font-extrabold text-emerald-400 mb-2">
                            {formatCurrency(result, targetCountry.currency)}
                        </div>
                        <div className="text-sm text-slate-300">
                            in {targetCountry.name}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-6">
                        <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4" />
                            What does this mean?
                        </h4>
                        <p className="text-sm text-blue-800 leading-relaxed">
                            To maintain the same standard of living as earning
                            <strong> {formatCurrency(amount, sourceCountry.currency)} </strong>
                            in {sourceCountry.name}, you would need to earn roughly
                            <strong> {formatCurrency(result, targetCountry.currency)} </strong>
                            in {targetCountry.name}.
                        </p>
                        <p className="text-xs text-blue-600 mt-3 pt-3 border-t border-blue-200">
                            Based on World Bank Purchasing Power Parity (PPP) data.
                            This accounts for differences in cost of living (rent, food, services), not just exchange rates.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
