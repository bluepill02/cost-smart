"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from '@/lib/formatters';
import { GST_RATES } from '@/lib/tax-data';

interface GSTResult {
    netAmount: number;
    gstAmount: number;
    totalAmount: number;
    cgst: number;
    sgst: number;
}

export default function GSTCalculator() {
    const [amount, setAmount] = useState<number>(10000);
    const [rate, setRate] = useState<number>(18);
    const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

    const result: GSTResult = useMemo(() => {
        let net = 0;
        let gst = 0;
        let total = 0;

        if (type === 'exclusive') {
            net = amount;
            gst = amount * (rate / 100);
            total = net + gst;
        } else {
            // Inclusive: Total = Amount
            // Net = Total / (1 + rate/100)
            total = amount;
            net = amount / (1 + rate / 100);
            gst = total - net;
        }

        return {
            netAmount: net,
            gstAmount: gst,
            totalAmount: total,
            cgst: gst / 2,
            sgst: gst / 2
        };
    }, [amount, rate, type]);

    // Use centralized rates if available, else fallback
    const presetRates = GST_RATES || [5, 12, 18, 28];

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-emerald-500" />
                            GST Parameters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="gst-type">Calculation Type</Label>
                            <RadioGroup
                                id="gst-type"
                                value={type}
                                onValueChange={(v) => setType(v as 'exclusive' | 'inclusive')}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-slate-50 [&:has(:checked)]:bg-emerald-50 [&:has(:checked)]:border-emerald-200">
                                    <RadioGroupItem value="exclusive" id="exclusive" />
                                    <Label htmlFor="exclusive" className="cursor-pointer font-medium">
                                        GST Exclusive
                                        <span className="block text-xs text-slate-500 font-normal">Add GST to Amount</span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-slate-50 [&:has(:checked)]:bg-emerald-50 [&:has(:checked)]:border-emerald-200">
                                    <RadioGroupItem value="inclusive" id="inclusive" />
                                    <Label htmlFor="inclusive" className="cursor-pointer font-medium">
                                        GST Inclusive
                                        <span className="block text-xs text-slate-500 font-normal">Extract GST from Amount</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (₹)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rate">GST Rate (%)</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className="text-lg w-24"
                                    />
                                    <div className="flex-1 flex gap-1 overflow-x-auto pb-1">
                                        {presetRates.map(r => (
                                            <Button
                                                key={r}
                                                variant={rate === r ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setRate(r)}
                                                className="flex-1 min-w-[3rem]"
                                            >
                                                {r}%
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Result Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Total Amount</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {formatCurrency(result.totalAmount, 'INR')}
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Net Amount (Pre-Tax)</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.netAmount, 'INR')}</span>
                            </div>
                            <div className="flex justify-between items-center text-red-300">
                                <span className="flex items-center gap-2">
                                    Total GST ({rate}%)
                                </span>
                                <span className="font-bold text-lg">+ {formatCurrency(result.gstAmount, 'INR')}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-sm">
                            <div className="bg-slate-800/50 p-3 rounded-lg">
                                <div className="text-slate-400 mb-1">CGST ({rate/2}%)</div>
                                <div className="font-medium text-slate-200">{formatCurrency(result.cgst, 'INR')}</div>
                                <div className="text-xs text-slate-500 mt-1">Central Tax</div>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg">
                                <div className="text-slate-400 mb-1">SGST ({rate/2}%)</div>
                                <div className="font-medium text-slate-200">{formatCurrency(result.sgst, 'INR')}</div>
                                <div className="text-xs text-slate-500 mt-1">State Tax</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                        <ArrowRight size={18}/>
                        Expert Insight
                    </h4>
                    <p className="text-sm text-blue-800">
                        <strong>For Businesses:</strong> If you are GST registered, the {formatCurrency(result.gstAmount, 'INR')} GST component is usually available as
                        <span className="font-semibold"> Input Tax Credit (ITC)</span>, effectively making your cost {formatCurrency(result.netAmount, 'INR')}.
                    </p>
                </div>
            </div>
        </div>
    );
}
