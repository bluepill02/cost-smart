"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Home, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';

export default function PropertyTaxCalculator() {
    const [annualValue, setAnnualValue] = useState<number>(60000);
    const [taxRate, setTaxRate] = useState<number>(10);
    const [cessRate, setCessRate] = useState<number>(2); // Education/Health cess

    const result = useMemo(() => {
        const baseTax = annualValue * (taxRate / 100);
        const cess = baseTax * (cessRate / 100);
        const totalTax = baseTax + cess;

        return {
            baseTax,
            cess,
            totalTax
        };
    }, [annualValue, taxRate, cessRate]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Home className="w-5 h-5 text-blue-600" />
                            Assessment Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="value">Rateable Annual Value (RV)</Label>
                            <Input
                                id="value"
                                type="number"
                                value={annualValue}
                                onChange={(e) => setAnnualValue(Number(e.target.value))}
                            />
                            <p className="text-xs text-slate-500">As assessed by your municipal corporation</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="rate">General Tax Rate (%)</Label>
                                <Input
                                    id="rate"
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cess">Cess Percentage (%)</Label>
                                <Input
                                    id="cess"
                                    type="number"
                                    value={cessRate}
                                    onChange={(e) => setCessRate(Number(e.target.value))}
                                />
                                <p className="text-xs text-slate-500">% of Tax Amount</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Annual Property Tax</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Total Payable</div>
                            <div className="text-4xl font-bold text-orange-400">
                                {formatCurrency(result.totalTax, 'INR')}
                            </div>
                        </div>

                         <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Base Tax</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.baseTax, 'INR')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Cess Amount</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.cess, 'INR')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
