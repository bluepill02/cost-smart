"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/formatters';

export default function ProfitMarginCalculator() {
    const [cost, setCost] = useState<number>(50);
    const [revenue, setRevenue] = useState<number>(100);

    const result = useMemo(() => {
        const profit = revenue - cost;
        const margin = (profit / revenue) * 100;
        const markup = (profit / cost) * 100;

        return {
            profit,
            margin: isNaN(margin) ? 0 : margin,
            markup: isNaN(markup) ? 0 : markup
        };
    }, [cost, revenue]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Cost & Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="cost">Cost ($)</Label>
                                <Input
                                    id="cost"
                                    type="number"
                                    value={cost}
                                    onChange={(e) => setCost(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="revenue">Revenue (Price) ($)</Label>
                                <Input
                                    id="revenue"
                                    type="number"
                                    value={revenue}
                                    onChange={(e) => setRevenue(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Profit Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Net Profit</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {formatCurrency(result.profit, 'USD')}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                            <div className="p-3 bg-slate-800/50 rounded-lg">
                                <div className="text-slate-400 text-xs mb-1">Gross Margin</div>
                                <div className="font-bold text-xl text-blue-300">{result.margin.toFixed(2)}%</div>
                                <div className="text-xs text-slate-500 mt-1">of Revenue</div>
                            </div>
                            <div className="p-3 bg-slate-800/50 rounded-lg">
                                <div className="text-slate-400 text-xs mb-1">Markup</div>
                                <div className="font-bold text-xl text-purple-300">{result.markup.toFixed(2)}%</div>
                                <div className="text-xs text-slate-500 mt-1">on Cost</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
