"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Wallet, Percent, ShieldCheck, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from '@/lib/formatters';
import { TAX_CONSTANTS_FY24_25 } from '@/lib/tax-data';

export default function IndiaTaxCalculator() {
    const [grossIncome, setGrossIncome] = useState<number>(1200000);
    const [regime, setRegime] = useState<'new' | 'old'>('new');

    // Deductions (Mainly relevant for Old Regime, but 80CCD(2) applies to New)
    const [section80C, setSection80C] = useState<number>(0);
    const [section80D, setSection80D] = useState<number>(0);
    const [hra, setHra] = useState<number>(0);
    const [lta, setLta] = useState<number>(0);
    const [otherDeductions, setOtherDeductions] = useState<number>(0);

    const result = useMemo(() => {
        const rules = regime === 'new' ? TAX_CONSTANTS_FY24_25.NEW_REGIME : TAX_CONSTANTS_FY24_25.OLD_REGIME;

        let taxableIncome = grossIncome - rules.standardDeduction;

        if (regime === 'old') {
            const totalDeductions = Math.min(section80C, 150000) + section80D + hra + lta + otherDeductions;
            taxableIncome -= totalDeductions;
        } else {
            // New Regime only allows 80CCD(2) [Employer NPS] - treating 'otherDeductions' as that for simplicity here
            // or we assume 0 deductions besides Std Ded for basic new regime calc
        }

        if (taxableIncome < 0) taxableIncome = 0;

        let tax = 0;

        // Calculate Tax based on Slabs
        // Note: Logic for New Regime Slabs 2024 (Budget update: 3-7L 5%, 7-10L 10%, etc)
        // The slab structure in `tax-data.ts` assumes limits are absolute points (3L, 7L, 10L).
        // Calculation needs to be delta based.

        // Re-implementing robust slab logic:
        if (taxableIncome > rules.basicExemptionLimit) {
            let previousLimit = rules.basicExemptionLimit;

            for (let i = 1; i < rules.slabs.length; i++) {
                const currentSlab = rules.slabs[i];
                const rate = currentSlab.rate;
                const limit = currentSlab.limit;

                if (taxableIncome > previousLimit) {
                    const taxableAmount = Math.min(taxableIncome, limit) - previousLimit;
                    tax += taxableAmount * rate;
                    previousLimit = limit;
                } else {
                    break;
                }
            }
        }

        // Rebate 87A
        // New Regime: Tax free if taxable income <= 7L. Rebate up to 25k.
        // Old Regime: Tax free if taxable income <= 5L. Rebate up to 12.5k.
        let rebate = 0;
        if (taxableIncome <= rules.rebate87ALimit) {
            rebate = tax; // Full tax rebated
        }

        // Marginal Relief logic is complex, skipping for Phase 1 MVP unless tax > income diff.

        const taxAfterRebate = tax - rebate;
        const cess = taxAfterRebate * TAX_CONSTANTS_FY24_25.CESS;
        const totalTax = taxAfterRebate + cess;

        return {
            taxableIncome,
            baseTax: tax,
            rebate,
            cess,
            totalTax,
            standardDeduction: rules.standardDeduction,
            effectiveRate: (totalTax / grossIncome) * 100
        };
    }, [grossIncome, regime, section80C, section80D, hra, lta, otherDeductions]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-emerald-500" />
                            Income Details (FY 2024-25)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <Label>Tax Regime</Label>
                            <RadioGroup
                                value={regime}
                                onValueChange={(v) => setRegime(v as 'new' | 'old')}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${regime === 'new' ? 'bg-emerald-50 border-emerald-200' : 'hover:bg-slate-50'}`}>
                                    <RadioGroupItem value="new" id="new" />
                                    <Label htmlFor="new" className="cursor-pointer font-medium">
                                        New Regime
                                        <span className="block text-xs text-slate-500 font-normal">Default (Lower Rates, Fewer Deductions)</span>
                                    </Label>
                                </div>
                                <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${regime === 'old' ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}`}>
                                    <RadioGroupItem value="old" id="old" />
                                    <Label htmlFor="old" className="cursor-pointer font-medium">
                                        Old Regime
                                        <span className="block text-xs text-slate-500 font-normal">High Deductions (80C, HRA, etc.)</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="income">Gross Annual Income (₹)</Label>
                            <Input
                                id="income"
                                type="number"
                                value={grossIncome}
                                onChange={(e) => setGrossIncome(Number(e.target.value))}
                                className="text-lg"
                            />
                        </div>

                        {regime === 'old' && (
                            <div className="space-y-4 pt-4 border-t animate-in fade-in slide-in-from-top-2">
                                <h4 className="font-semibold text-sm text-slate-700">Deductions</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="80c">Section 80C (Max 1.5L)</Label>
                                        <Input id="80c" type="number" value={section80C} onChange={(e) => setSection80C(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="80d">Section 80D (Health Ins.)</Label>
                                        <Input id="80d" type="number" value={section80D} onChange={(e) => setSection80D(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="hra">HRA Exemption</Label>
                                        <Input id="hra" type="number" value={hra} onChange={(e) => setHra(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lta">LTA / Other</Label>
                                        <Input id="lta" type="number" value={lta} onChange={(e) => setLta(Number(e.target.value))} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {regime === 'new' && (
                             <div className="bg-slate-50 p-4 rounded-lg border text-sm text-slate-600 flex gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 text-blue-500" />
                                <p>Standard Deduction of <strong>₹75,000</strong> is automatically applied in the New Regime (Budget 2024 update).</p>
                             </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Tax Liability</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Total Tax Payable</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {formatCurrency(result.totalTax, 'INR')}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                                Effective Rate: {result.effectiveRate.toFixed(2)}%
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-800 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Gross Income</span>
                                <span className="font-semibold text-slate-200">{formatCurrency(grossIncome, 'INR')}</span>
                            </div>
                             <div className="flex justify-between items-center text-emerald-400">
                                <span>Standard Deduction</span>
                                <span>- {formatCurrency(result.standardDeduction, 'INR')}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-800 pt-2">
                                <span className="text-slate-400">Taxable Income</span>
                                <span className="font-semibold text-white">{formatCurrency(result.taxableIncome, 'INR')}</span>
                            </div>
                        </div>

                        <div className="space-y-2 pt-2 text-sm">
                            {result.rebate > 0 && (
                                <div className="flex justify-between items-center text-emerald-400">
                                    <span>Rebate u/s 87A</span>
                                    <span>- {formatCurrency(result.rebate, 'INR')}</span>
                                </div>
                            )}
                             <div className="flex justify-between items-center text-slate-400">
                                <span>Health & Education Cess (4%)</span>
                                <span>+ {formatCurrency(result.cess, 'INR')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
