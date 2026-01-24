"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';

export default function ElectricityBillCalculator() {
    const [units, setUnits] = useState<number>(250);
    const [rate, setRate] = useState<number>(7.5);
    const [fixedCharge, setFixedCharge] = useState<number>(100);

    const result = useMemo(() => {
        const energyCharge = units * rate;
        const totalBill = energyCharge + fixedCharge;

        return {
            energyCharge,
            totalBill
        };
    }, [units, rate, fixedCharge]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            Consumption Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="units">Units Consumed (kWh)</Label>
                            <Input
                                id="units"
                                type="number"
                                value={units}
                                onChange={(e) => setUnits(Number(e.target.value))}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="rate">Average Rate per Unit (₹)</Label>
                                <Input
                                    id="rate"
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    step={0.1}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fixed">Fixed Charges (₹)</Label>
                                <Input
                                    id="fixed"
                                    type="number"
                                    value={fixedCharge}
                                    onChange={(e) => setFixedCharge(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Estimated Bill</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Total Due</div>
                            <div className="text-4xl font-bold text-yellow-400">
                                {formatCurrency(result.totalBill, 'INR')}
                            </div>
                        </div>

                         <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Energy Charges</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.energyCharge, 'INR')}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-slate-400">Fixed/Demand Charges</span>
                                <span className="font-semibold text-lg">{formatCurrency(fixedCharge, 'INR')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
