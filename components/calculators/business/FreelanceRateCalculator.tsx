"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';

export default function FreelanceRateCalculator() {
    const [targetIncome, setTargetIncome] = useState<number>(60000);
    const [expenses, setExpenses] = useState<number>(500);
    const [taxRate, setTaxRate] = useState<number>(20);
    const [billableHours, setBillableHours] = useState<number>(25);
    const [weeksOff, setWeeksOff] = useState<number>(4);

    const result = useMemo(() => {
        const annualExpenses = expenses * 12;
        const grossIncomeNeeded = targetIncome / (1 - taxRate / 100);
        const totalRevenueNeeded = grossIncomeNeeded + annualExpenses;

        const workingWeeks = 52 - weeksOff;
        const totalBillableHours = workingWeeks * billableHours;

        const hourlyRate = totalRevenueNeeded / totalBillableHours;
        const dayRate = hourlyRate * 8; // Assuming 8h day equivalent

        return {
            hourlyRate,
            dayRate,
            totalRevenueNeeded,
            taxAmount: grossIncomeNeeded - targetIncome
        };
    }, [targetIncome, expenses, taxRate, billableHours, weeksOff]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            Work Parameters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="income">Target Annual Net Income ($)</Label>
                                <Input
                                    id="income"
                                    type="number"
                                    value={targetIncome}
                                    onChange={(e) => setTargetIncome(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expenses">Monthly Expenses ($)</Label>
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
                                {formatCurrency(result.hourlyRate, 'USD')}
                            </div>
                        </div>

                         <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Day Rate (8h)</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.dayRate, 'USD')}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-sm">
                            <div>
                                <div className="text-slate-400">Gross Revenue</div>
                                <div className="font-medium text-slate-200">{formatCurrency(result.totalRevenueNeeded, 'USD')}</div>
                            </div>
                             <div>
                                <div className="text-slate-400">Est. Tax</div>
                                <div className="font-medium text-slate-200">{formatCurrency(result.taxAmount, 'USD')}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
