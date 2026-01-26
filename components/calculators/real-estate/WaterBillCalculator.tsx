"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';

export default function WaterBillCalculator() {
    const [units, setUnits] = useState<number>(20);
    const [rate, setRate] = useState<number>(15);
    const [sewerageChargeRate, setSewerageChargeRate] = useState<number>(20); // % of water charge

    const result = useMemo(() => {
        const waterCharge = units * rate;
        const sewerageCharge = waterCharge * (sewerageChargeRate / 100);
        const totalBill = waterCharge + sewerageCharge;

        return {
            waterCharge,
            sewerageCharge,
            totalBill
        };
    }, [units, rate, sewerageChargeRate]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-blue-500" />
                            Usage Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="units">Consumption (kL)</Label>
                            <Input
                                id="units"
                                type="number"
                                value={units}
                                onChange={(e) => setUnits(Number(e.target.value))}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="rate">Rate per kL (₹)</Label>
                                <Input
                                    id="rate"
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sewerage">Sewerage Charge (% of Water)</Label>
                                <Input
                                    id="sewerage"
                                    type="number"
                                    value={sewerageChargeRate}
                                    onChange={(e) => setSewerageChargeRate(Number(e.target.value))}
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
                            <div className="text-4xl font-bold text-blue-400">
                                {formatCurrency(result.totalBill, 'INR')}
                            </div>
                        </div>

                         <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Water Charges</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.waterCharge, 'INR')}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-slate-400">Sewerage Charges</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.sewerageCharge, 'INR')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
