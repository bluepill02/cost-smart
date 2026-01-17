"use client";

import React, { useState, useMemo } from 'react';
import { Trash2, Plus, TrendingDown, Layers, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from '@/lib/formatters';

interface Debt {
    id: number;
    name: string;
    balance: number;
    rate: number;
    minPayment: number;
}

export default function DebtPayoffCalculator() {
    const [debts, setDebts] = useState<Debt[]>([
        { id: 1, name: 'Credit Card', balance: 5000, rate: 18, minPayment: 150 },
        { id: 2, name: 'Car Loan', balance: 12000, rate: 6, minPayment: 300 }
    ]);
    const [monthlyBudget, setMonthlyBudget] = useState<number>(1000); // Total amount user can pay
    const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('avalanche');

    const addDebt = () => {
        setDebts([...debts, { id: Date.now(), name: `Debt ${debts.length + 1}`, balance: 0, rate: 0, minPayment: 0 }]);
    };

    const removeDebt = (id: number) => {
        setDebts(debts.filter(d => d.id !== id));
    };

    const updateDebt = (id: number, field: keyof Debt, value: string | number) => {
        setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
    };

    const result = useMemo(() => {
        // Validation: Budget must be at least sum of min payments
        const totalMinPayment = debts.reduce((sum, d) => sum + d.minPayment, 0);
        const actualBudget = Math.max(monthlyBudget, totalMinPayment);

        // Simulation
        const tempDebts = debts.map(d => ({ ...d }));
        let months = 0;
        let totalInterest = 0;

        // Sorting strategy
        // Snowball: Lowest Balance first
        // Avalanche: Highest Rate first
        const sortDebts = (ds: typeof tempDebts) => {
            return ds.sort((a, b) => {
                if (strategy === 'snowball') return a.balance - b.balance;
                return b.rate - a.rate;
            });
        };

        while (tempDebts.some(d => d.balance > 0) && months < 360) { // Cap at 30 years
            months++;
            let availableMoney = actualBudget;

            // 1. Pay minimums first
            tempDebts.forEach(d => {
                if (d.balance > 0) {
                    const interest = d.balance * (d.rate / 100 / 12);
                    totalInterest += interest;
                    d.balance += interest;

                    const pay = Math.min(d.balance, d.minPayment);
                    d.balance -= pay;
                    availableMoney -= pay;
                }
            });

            // 2. Apply extra money to target debt
            if (availableMoney > 0) {
                // Find first active debt based on strategy
                // Note: We need to filter only active debts to sort, but we want to modify the original object in the array
                // So we find the target ID
                const activeDebts = tempDebts.filter(d => d.balance > 0);
                if (activeDebts.length > 0) {
                    const target = sortDebts(activeDebts)[0];
                    const payExtra = Math.min(target.balance, availableMoney);
                    target.balance -= payExtra;
                }
            }
        }

        return {
            months,
            totalInterest,
            totalMinPayment,
            actualBudget
        };
    }, [debts, monthlyBudget, strategy]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Your Debts</span>
                            <Button onClick={addDebt} size="sm" variant="outline" className="gap-2">
                                <Plus size={16} /> Add Debt
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {debts.map((debt) => (
                            <div key={debt.id} className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end p-4 border rounded-lg bg-slate-50 relative group">
                                <div className="col-span-2 md:col-span-2 space-y-1">
                                    <Label htmlFor={`name-${debt.id}`} className="text-xs">Name</Label>
                                    <Input id={`name-${debt.id}`} value={debt.name} onChange={e => updateDebt(debt.id, 'name', e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor={`balance-${debt.id}`} className="text-xs">Balance</Label>
                                    <Input id={`balance-${debt.id}`} type="number" value={debt.balance} onChange={e => updateDebt(debt.id, 'balance', Number(e.target.value))} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor={`rate-${debt.id}`} className="text-xs">Rate (%)</Label>
                                    <Input id={`rate-${debt.id}`} type="number" value={debt.rate} onChange={e => updateDebt(debt.id, 'rate', Number(e.target.value))} />
                                </div>
                                <div className="space-y-1 relative">
                                    <Label htmlFor={`min-${debt.id}`} className="text-xs">Min Pay</Label>
                                    <Input id={`min-${debt.id}`} type="number" value={debt.minPayment} onChange={e => updateDebt(debt.id, 'minPayment', Number(e.target.value))} />
                                     <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute -top-6 -right-3 h-6 w-6 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeDebt(debt.id)}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Payoff Strategy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="budget-input">Total Monthly Payment Budget</Label>
                                <Input
                                    id="budget-input"
                                    type="number"
                                    value={monthlyBudget}
                                    onChange={e => setMonthlyBudget(Number(e.target.value))}
                                    className="text-lg font-bold"
                                />
                                {monthlyBudget < result.totalMinPayment && (
                                    <p className="text-xs text-red-500 font-medium">
                                        Must be at least ${result.totalMinPayment} (Sum of minimums)
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label>Method</Label>
                                <Select value={strategy} onValueChange={(v: 'snowball'|'avalanche') => setStrategy(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="avalanche">Avalanche (Highest Interest First)</SelectItem>
                                        <SelectItem value="snowball">Snowball (Lowest Balance First)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <div>
                                <div className="text-slate-400 text-sm font-medium mb-1">Debt Free In</div>
                                <div className="text-4xl font-bold text-emerald-400">
                                    {Math.floor(result.months / 12)} Years {result.months % 12} Months
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                                <div>
                                    <div className="text-slate-500 text-xs font-medium">Total Interest Paid</div>
                                    <div className="text-xl font-bold text-red-400">
                                        {formatCurrency(result.totalInterest)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-slate-500 text-xs font-medium">Method</div>
                                    <div className="text-xl font-bold flex items-center gap-2">
                                        {strategy === 'avalanche' ? <TrendingDown size={18}/> : <Layers size={18}/>}
                                        <span className="capitalize">{strategy}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                        <ArrowRight size={18}/>
                        Expert Tip
                    </h4>
                    {strategy === 'avalanche' ? (
                        <p className="text-sm text-blue-800">
                            <strong>Avalanche is mathematically superior.</strong> By targeting the highest interest rate (18%), you save the most money overall compared to Snowball.
                        </p>
                    ) : (
                        <p className="text-sm text-blue-800">
                            <strong>Snowball is psychologically superior.</strong> Clearing small debts quickly gives you &quot;quick wins&quot; and motivation to keep going, even if you pay slightly more interest.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
