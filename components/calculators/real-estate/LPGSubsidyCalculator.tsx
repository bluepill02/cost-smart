"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';

export default function LPGSubsidyCalculator() {
    const [marketPrice, setMarketPrice] = useState<number>(1100);
    const [subsidizedPrice, setSubsidizedPrice] = useState<number>(800);
    const [cylindersPerYear, setCylindersPerYear] = useState<number>(12);

    const result = useMemo(() => {
        const subsidyPerCylinder = marketPrice - subsidizedPrice;
        const totalSubsidy = subsidyPerCylinder * cylindersPerYear;
        const totalCostWithoutSubsidy = marketPrice * cylindersPerYear;
        const totalCostWithSubsidy = subsidizedPrice * cylindersPerYear;

        return {
            subsidyPerCylinder,
            totalSubsidy,
            totalCostWithoutSubsidy,
            totalCostWithSubsidy
        };
    }, [marketPrice, subsidizedPrice, cylindersPerYear]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-500" />
                            Cylinder Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="consumption">Cylinders per Year</Label>
                            <Input
                                id="consumption"
                                type="number"
                                value={cylindersPerYear}
                                onChange={(e) => setCylindersPerYear(Number(e.target.value))}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="market">Market Price (Non-Subsidized) (₹)</Label>
                                <Input
                                    id="market"
                                    type="number"
                                    value={marketPrice}
                                    onChange={(e) => setMarketPrice(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subsidized">Subsidized Price (₹)</Label>
                                <Input
                                    id="subsidized"
                                    type="number"
                                    value={subsidizedPrice}
                                    onChange={(e) => setSubsidizedPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Subsidy Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Total Annual Subsidy</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {formatCurrency(result.totalSubsidy, 'INR')}
                            </div>
                        </div>

                         <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Subsidy per Cylinder</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.subsidyPerCylinder, 'INR')}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-slate-400">Effective Annual Cost</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.totalCostWithSubsidy, 'INR')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
