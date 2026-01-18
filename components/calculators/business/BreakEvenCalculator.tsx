"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';

export default function BreakEvenCalculator() {
    const [fixedCosts, setFixedCosts] = useState<number>(5000);
    const [pricePerUnit, setPricePerUnit] = useState<number>(100);
    const [variableCost, setVariableCost] = useState<number>(40);

    const result = useMemo(() => {
        const contributionMargin = pricePerUnit - variableCost;
        const breakEvenUnits = contributionMargin > 0 ? fixedCosts / contributionMargin : 0;
        const breakEvenRevenue = breakEvenUnits * pricePerUnit;

        return {
            contributionMargin,
            breakEvenUnits: Math.ceil(breakEvenUnits),
            breakEvenRevenue
        };
    }, [fixedCosts, pricePerUnit, variableCost]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="w-5 h-5 text-blue-600" />
                            Costs & Pricing
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="fixed">Fixed Costs ($)</Label>
                            <Input
                                id="fixed"
                                type="number"
                                value={fixedCosts}
                                onChange={(e) => setFixedCosts(Number(e.target.value))}
                            />
                            <p className="text-xs text-slate-500">Rent, salaries, insurance (Total)</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="price">Price per Unit ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={pricePerUnit}
                                    onChange={(e) => setPricePerUnit(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="variable">Variable Cost per Unit ($)</Label>
                                <Input
                                    id="variable"
                                    type="number"
                                    value={variableCost}
                                    onChange={(e) => setVariableCost(Number(e.target.value))}
                                />
                                <p className="text-xs text-slate-500">Materials, labor, shipping</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Break-Even Point</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Units to Sell</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {result.breakEvenUnits}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">To cover all costs</div>
                        </div>

                         <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Revenue Required</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.breakEvenRevenue, 'USD')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Contribution Margin</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.contributionMargin, 'USD')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
