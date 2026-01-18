"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, ShieldAlert, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from '@/lib/formatters';

const TDS_SECTIONS = [
    { id: '194C-ind', label: '194C - Contractors (Individual/HUF)', rate: 1 },
    { id: '194C-oth', label: '194C - Contractors (Company/Other)', rate: 2 },
    { id: '194J-prof', label: '194J - Professional Fees', rate: 10 },
    { id: '194J-tech', label: '194J - Technical Fees / Call Center', rate: 2 },
    { id: '194I-land', label: '194I - Rent (Land/Building)', rate: 10 },
    { id: '194I-plant', label: '194I - Rent (Plant/Machinery)', rate: 2 },
    { id: '194H', label: '194H - Commission/Brokerage', rate: 5 },
    { id: '194A', label: '194A - Interest (Non-Securities)', rate: 10 },
];

export default function TDSCalculator() {
    const [amount, setAmount] = useState<number>(50000);
    const [section, setSection] = useState<string>('194J-prof');
    const [hasPan, setHasPan] = useState<boolean>(true);

    const result = useMemo(() => {
        const selectedSection = TDS_SECTIONS.find(s => s.id === section);
        if (!selectedSection) return { tdsAmount: 0, netAmount: 0, effectiveRate: 0 };

        // If PAN is not provided, rate is 20% (or the rate itself if higher, but TDS max is usually 20% for these sections except rarely)
        // Sec 206AA: Rate is higher of (i) Rate in Act (ii) Rate in force (iii) 20%.
        let effectiveRate = hasPan ? selectedSection.rate : 20;

        // Edge case: If rate is naturally > 20% (rare in TDS, mainly 30% for NR), stick to rate.
        // But for these standard sections, 20% is the penalty floor.
        if (selectedSection.rate > 20) effectiveRate = selectedSection.rate;

        const tdsAmount = amount * (effectiveRate / 100);
        const netAmount = amount - tdsAmount;

        return {
            tdsAmount,
            netAmount,
            effectiveRate,
            sectionName: selectedSection.label
        };
    }, [amount, section, hasPan]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-blue-600" />
                            Payment Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="section">Nature of Payment (TDS Section)</Label>
                                <Select value={section} onValueChange={setSection}>
                                    <SelectTrigger id="section" className="w-full">
                                        <SelectValue placeholder="Select Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TDS_SECTIONS.map((s) => (
                                            <SelectItem key={s.id} value={s.id}>
                                                {s.label} ({s.rate}%)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount">Payment Amount (₹)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="text-lg"
                                />
                            </div>

                            <div className="space-y-2 pt-4 border-t">
                                <Label>Does the Payee have a valid PAN?</Label>
                                <RadioGroup
                                    value={hasPan ? "yes" : "no"}
                                    onValueChange={(v) => setHasPan(v === "yes")}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2 border rounded-lg p-3 px-4 cursor-pointer hover:bg-slate-50 [&:has(:checked)]:bg-blue-50 [&:has(:checked)]:border-blue-200">
                                        <RadioGroupItem value="yes" id="pan-yes" />
                                        <Label htmlFor="pan-yes" className="cursor-pointer">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 border rounded-lg p-3 px-4 cursor-pointer hover:bg-slate-50 [&:has(:checked)]:bg-red-50 [&:has(:checked)]:border-red-200">
                                        <RadioGroupItem value="no" id="pan-no" />
                                        <Label htmlFor="pan-no" className="cursor-pointer">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">TDS Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">TDS to Deduct</div>
                            <div className="text-4xl font-bold text-orange-400">
                                {formatCurrency(result.tdsAmount, 'INR')}
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                                Effective Rate: {result.effectiveRate}% {!hasPan && "(Penal Rate)"}
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Gross Amount</span>
                                <span className="font-semibold text-slate-200">{formatCurrency(amount, 'INR')}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg border-t border-slate-700 pt-2 mt-2">
                                <span className="text-emerald-400 font-medium">Net Payable to Party</span>
                                <span className="font-bold text-white">{formatCurrency(result.netAmount, 'INR')}</span>
                            </div>
                        </div>

                         {!hasPan && (
                            <div className="bg-red-900/30 border border-red-800 p-3 rounded-lg flex gap-3 items-start">
                                <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-slate-300">
                                    <strong className="text-red-400 block mb-1">High TDS Alert</strong>
                                    Since PAN is not provided, TDS is deducted at 20% (Section 206AA) instead of the standard rate.
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                        <ArrowRight size={18}/>
                        Next Steps
                    </h4>
                    <p className="text-sm text-blue-800 mb-2">
                        1. Deduct <strong>{formatCurrency(result.tdsAmount, 'INR')}</strong> and pay <strong>{formatCurrency(result.netAmount, 'INR')}</strong> to the vendor.
                    </p>
                    <p className="text-sm text-blue-800">
                        2. Deposit the TDS to the government by the 7th of next month to avoid interest.
                    </p>
                </div>
            </div>
        </div>
    );
}
