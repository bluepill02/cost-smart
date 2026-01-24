"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Building, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';

export default function StampDutyCalculator() {
    const [propertyValue, setPropertyValue] = useState<number>(5000000);
    const [stampDutyRate, setStampDutyRate] = useState<number>(5); // Common avg
    const [registrationRate, setRegistrationRate] = useState<number>(1); // Usually 1%

    const result = useMemo(() => {
        const stampDuty = propertyValue * (stampDutyRate / 100);
        const registrationFee = propertyValue * (registrationRate / 100);
        const totalCost = stampDuty + registrationFee;
        const totalInvestment = propertyValue + totalCost;

        return {
            stampDuty,
            registrationFee,
            totalCost,
            totalInvestment
        };
    }, [propertyValue, stampDutyRate, registrationRate]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-blue-600" />
                            Property Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="value">Property Market Value / Agreement Value</Label>
                            <Input
                                id="value"
                                type="number"
                                value={propertyValue}
                                onChange={(e) => setPropertyValue(Number(e.target.value))}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="stamp">Stamp Duty Rate (%)</Label>
                                <Input
                                    id="stamp"
                                    type="number"
                                    value={stampDutyRate}
                                    onChange={(e) => setStampDutyRate(Number(e.target.value))}
                                    step={0.1}
                                />
                                <p className="text-xs text-slate-500">Varies by state (3% - 7%)</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reg">Registration Fee Rate (%)</Label>
                                <Input
                                    id="reg"
                                    type="number"
                                    value={registrationRate}
                                    onChange={(e) => setRegistrationRate(Number(e.target.value))}
                                    step={0.1}
                                />
                                <p className="text-xs text-slate-500">Usually 1% or fixed cap</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Total Government Fees</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Total Charges</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {formatCurrency(result.totalCost, 'INR')}
                            </div>
                        </div>

                         <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Stamp Duty</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.stampDuty, 'INR')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Registration Fee</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.registrationFee, 'INR')}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center text-sm text-slate-400">
                                <span>Total Property Cost</span>
                                <span className="font-bold text-white text-base">{formatCurrency(result.totalInvestment, 'INR')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
