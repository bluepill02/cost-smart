"use client";

import React, { useState, useMemo } from 'react';
import { ShieldAlert, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { saveHistoryItem } from '@/lib/history-manager';
import { formatCurrency } from '@/lib/formatters';

interface EmergencyFundCalculatorProps {
    currency?: string;
    locale?: string;
}

export default function EmergencyFundCalculator({
    currency = 'USD',
    locale = 'en-US'
}: EmergencyFundCalculatorProps) {
    const [monthlyExpense, setMonthlyExpense] = useState<number>(currency === 'USD' ? 3000 : 30000);
    const [months, setMonths] = useState<number>(6);
    const [currentSavings, setCurrentSavings] = useState<number>(currency === 'USD' ? 5000 : 50000);

    const result = useMemo(() => {
        const required = monthlyExpense * months;
        const gap = required - currentSavings;
        return { required, gap };
    }, [monthlyExpense, months, currentSavings]);

    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        saveHistoryItem({
            type: 'emergency',
            title: `Emergency Fund: ${formatCurrency(result.required, currency, locale)}`,
            summary: `${months} months of expenses`,
            link: `/emergency-fund-calculator`
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-fit shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-emerald-600" />
                        Safety Net
                    </CardTitle>
                    <CardDescription>Calculate how much you need for a rainy day.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label htmlFor="monthlyExpense">Monthly Living Expenses ({currency === 'USD' ? '$' : (currency === 'INR' ? '₹' : currency)})</Label>
                        <Input
                            id="monthlyExpense"
                            type="number"
                            value={monthlyExpense}
                            onChange={e => setMonthlyExpense(Number(e.target.value))}
                        />
                         <p className="text-xs text-slate-500">Rent, Food, Utilities, EMIs, Insurance.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Coverage Duration (Months)</Label>
                            <span className="font-bold text-emerald-600">{months} Months</span>
                        </div>
                        <Slider value={[months]} min={3} max={24} step={1} onValueChange={v => setMonths(v[0])} />
                         <div className="flex justify-between text-xs text-slate-400">
                            <span>3 Months (Risky)</span>
                            <span>6 Months (Standard)</span>
                            <span>12 Months (Safe)</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="currentSavings">Current Emergency Cash</Label>
                        <Input
                            id="currentSavings"
                            type="number"
                            value={currentSavings}
                            onChange={e => setCurrentSavings(Number(e.target.value))}
                        />
                    </div>
                </CardContent>
            </Card>

             <div className="space-y-6">
                 <div className="flex justify-end">
                     <Button variant="outline" size="sm" onClick={handleSave} className={saved ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}>
                        {saved ? "Saved" : <><Save size={16} className="mr-2"/> Save Plan</>}
                     </Button>
                </div>

                <Card className="bg-slate-900 text-white border-none">
                    <CardContent className="p-6">
                        <div className="text-slate-400 text-sm font-medium mb-1">Target Emergency Fund</div>
                        <div className="text-4xl font-bold text-emerald-400">
                            {formatCurrency(result.required, currency, locale)}
                        </div>
                    </CardContent>
                </Card>

                 {result.gap > 0 ? (
                    <Card className="bg-amber-50 border-amber-200">
                        <CardContent className="p-6">
                            <h4 className="font-bold text-amber-900 mb-2">Gap to Goal</h4>
                            <p className="text-amber-800 text-lg">
                                You need <span className="font-bold">{formatCurrency(result.gap, currency, locale)}</span> more to be fully secure.
                            </p>
                        </CardContent>
                    </Card>
                 ) : (
                    <Card className="bg-emerald-50 border-emerald-200">
                         <CardContent className="p-6">
                            <h4 className="font-bold text-emerald-900 mb-2">Fully Secured!</h4>
                            <p className="text-emerald-800">
                                Excellent job! You have enough savings to cover {months} months of expenses.
                            </p>
                        </CardContent>
                    </Card>
                 )}
            </div>
        </div>
    );
}
