"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveHistoryItem } from '@/lib/history-manager';
import { formatCurrency } from '@/lib/formatters';

export default function IndiaTaxCalculator() {
    const [income, setIncome] = useState<number>(1200000);
    const [exemptions, setExemptions] = useState<number>(150000); // 80C etc
    const [hraExemption, setHRAExemption] = useState<number>(0);

    const result = useMemo(() => {
        // FY 2024-25 Rules (AY 2025-26)

        // --- NEW REGIME (Default) ---
        // Slabs:
        // 0-3L: 0%
        // 3-7L: 5%
        // 7-10L: 10%
        // 10-12L: 15%
        // 12-15L: 20%
        // >15L: 30%
        // Std Deduction: 75,000 (Proposed)
        // Rebate u/s 87A: Taxable income up to 7L is tax free.

        let newTax = 0;
        const newStdDed = 75000;
        const taxableNew = Math.max(0, income - newStdDed); // No other deductions usually

        if (taxableNew <= 700000) {
            newTax = 0;
        } else {
            // Calculate slab wise
            if (taxableNew > 300000) newTax += Math.min(400000, taxableNew - 300000) * 0.05; // 3-7L
            if (taxableNew > 700000) newTax += Math.min(300000, taxableNew - 700000) * 0.10; // 7-10L
            if (taxableNew > 1000000) newTax += Math.min(200000, taxableNew - 1000000) * 0.15; // 10-12L
            if (taxableNew > 1200000) newTax += Math.min(300000, taxableNew - 1200000) * 0.20; // 12-15L
            if (taxableNew > 1500000) newTax += (taxableNew - 1500000) * 0.30; // >15L
        }

        // --- OLD REGIME ---
        // Slabs:
        // 0-2.5L: 0%
        // 2.5-5L: 5%
        // 5-10L: 20%
        // >10L: 30%
        // Std Deduction: 50,000
        // Rebate u/s 87A: Income <= 5L tax free.

        let oldTax = 0;
        const oldStdDed = 50000;
        const taxableOld = Math.max(0, income - oldStdDed - exemptions - hraExemption);

        if (taxableOld <= 500000) {
            oldTax = 0;
        } else {
             if (taxableOld > 250000) oldTax += Math.min(250000, taxableOld - 250000) * 0.05; // 2.5-5L
             if (taxableOld > 500000) oldTax += Math.min(500000, taxableOld - 500000) * 0.20; // 5-10L
             if (taxableOld > 1000000) oldTax += (taxableOld - 1000000) * 0.30; // >10L
        }

        // Cess 4%
        newTax += newTax * 0.04;
        oldTax += oldTax * 0.04;

        return {
            newTax,
            oldTax,
            taxableNew,
            taxableOld,
            diff: Math.abs(newTax - oldTax),
            betterRegime: newTax < oldTax ? 'New Regime' : 'Old Regime'
        };
    }, [income, exemptions, hraExemption]);

    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        saveHistoryItem({
            type: 'tax',
            title: `Tax: ${formatCurrency(Math.min(result.newTax, result.oldTax), 'INR', 'en-IN')}`,
            summary: `Better: ${result.betterRegime}`,
            link: `/in/income-tax-calculator`
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-fit shadow-md border-slate-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-emerald-600" />
                        Income Details (FY 2024-25)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label>Gross Annual Salary (₹)</Label>
                        <Input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} className="text-lg font-bold" />
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                        <h4 className="font-semibold text-sm text-slate-700">Deductions (For Old Regime)</h4>

                        <div className="space-y-2">
                            <Label>80C + 80D + Others (Max 1.5L + etc)</Label>
                            <Input type="number" value={exemptions} onChange={e => setExemptions(Number(e.target.value))} />
                        </div>
                         <div className="space-y-2">
                            <Label>HRA Exemption</Label>
                            <Input type="number" value={hraExemption} onChange={e => setHRAExemption(Number(e.target.value))} />
                        </div>
                    </div>
                </CardContent>
            </Card>

             <div className="space-y-6">
                 <div className="flex justify-end">
                     <Button variant="outline" size="sm" onClick={handleSave} className={saved ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}>
                        {saved ? "Saved" : <><Save size={16} className="mr-2"/> Save Calculation</>}
                     </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <Card className={`border-2 ${result.betterRegime === 'New Regime' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base text-slate-700">New Regime</CardTitle>
                            <CardDescription className="text-xs">Std Ded: ₹75k</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {formatCurrency(result.newTax, 'INR', 'en-IN')}
                            </div>
                            {result.betterRegime === 'New Regime' && <span className="text-xs font-bold text-emerald-600">Winner!</span>}
                        </CardContent>
                    </Card>

                    <Card className={`border-2 ${result.betterRegime === 'Old Regime' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base text-slate-700">Old Regime</CardTitle>
                            <CardDescription className="text-xs">With Deductions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {formatCurrency(result.oldTax, 'INR', 'en-IN')}
                            </div>
                            {result.betterRegime === 'Old Regime' && <span className="text-xs font-bold text-emerald-600">Winner!</span>}
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-slate-900 text-white border-none">
                    <CardContent className="p-6">
                        <div className="text-slate-400 text-sm font-medium mb-1">Recommendation</div>
                        <div className="text-xl font-bold">
                            Choose <span className="text-emerald-400">{result.betterRegime}</span>
                        </div>
                        <div className="text-sm mt-2 text-slate-400">
                            You will save <strong>{formatCurrency(result.diff, 'INR', 'en-IN')}</strong> in taxes.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
