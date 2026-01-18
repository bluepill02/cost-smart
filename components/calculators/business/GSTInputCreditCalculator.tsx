"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';

export default function GSTInputCreditCalculator() {
    const [outputTax, setOutputTax] = useState<number>(50000);
    const [inputTax, setInputTax] = useState<number>(35000);
    const [openingBalance, setOpeningBalance] = useState<number>(0);

    const result = useMemo(() => {
        const totalCreditAvailable = inputTax + openingBalance;
        const netDifference = outputTax - totalCreditAvailable;

        // If Output > Credit, you pay the difference (Cash Ledger)
        // If Credit > Output, you have excess credit (Credit Ledger)
        const isPayable = netDifference > 0;

        return {
            totalCreditAvailable,
            payableAmount: isPayable ? netDifference : 0,
            carryForwardBalance: isPayable ? 0 : Math.abs(netDifference),
            isPayable
        };
    }, [outputTax, inputTax, openingBalance]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-purple-500" />
                            Ledger Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="output">Output Tax Liability (Tax on Sales)</Label>
                                <Input
                                    id="output"
                                    type="number"
                                    value={outputTax}
                                    onChange={(e) => setOutputTax(Number(e.target.value))}
                                    className="text-lg border-red-200 focus:border-red-500 focus:ring-red-500"
                                />
                                <p className="text-xs text-slate-500">Total GST collected from customers</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="input">Input Tax Credit (Tax on Purchases)</Label>
                                <Input
                                    id="input"
                                    type="number"
                                    value={inputTax}
                                    onChange={(e) => setInputTax(Number(e.target.value))}
                                    className="text-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                                <p className="text-xs text-slate-500">Total GST paid to vendors</p>
                            </div>

                            <div className="space-y-2 pt-4 border-t">
                                <Label htmlFor="opening">Opening Credit Balance (Optional)</Label>
                                <Input
                                    id="opening"
                                    type="number"
                                    value={openingBalance}
                                    onChange={(e) => setOpeningBalance(Number(e.target.value))}
                                />
                                <p className="text-xs text-slate-500">Unused credit from previous month</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Net Position</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {result.isPayable ? (
                            <div>
                                <div className="text-red-300 text-sm font-medium mb-1 flex items-center gap-2">
                                    <TrendingDown size={16} /> Net Payable in Cash
                                </div>
                                <div className="text-4xl font-bold text-red-400">
                                    {formatCurrency(result.payableAmount, 'INR')}
                                </div>
                                <div className="text-xs text-slate-500 mt-2">
                                    Your Input Credit ({formatCurrency(result.totalCreditAvailable, 'INR')}) was insufficient to cover the liability.
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="text-emerald-300 text-sm font-medium mb-1 flex items-center gap-2">
                                    <TrendingUp size={16} /> Credit Carried Forward
                                </div>
                                <div className="text-4xl font-bold text-emerald-400">
                                    {formatCurrency(result.carryForwardBalance, 'INR')}
                                </div>
                                <div className="text-xs text-slate-500 mt-2">
                                    You have excess credit. This will be added to next month's opening balance.
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Total Output Liability</span>
                                <span className="font-semibold text-slate-200">{formatCurrency(outputTax, 'INR')}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Total Input Credit</span>
                                <span className="font-semibold text-slate-200">-{formatCurrency(result.totalCreditAvailable, 'INR')}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                        <ArrowRight size={18}/>
                        ITC Rules
                    </h4>
                    <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                        <li>You must possess a valid tax invoice.</li>
                        <li>The goods/services must have been received.</li>
                        <li>The supplier must have paid the tax to the government.</li>
                        <li>The supplier must have filed their GST returns.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
