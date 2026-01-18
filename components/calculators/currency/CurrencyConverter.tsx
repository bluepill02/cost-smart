"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRightLeft, TrendingUp, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getHistoricalRates, ExchangeRates } from '@/lib/currency-api';

// Lazy load Recharts components
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

interface CurrencyConverterProps {
    initialRates: ExchangeRates;
}

export default function CurrencyConverter({ initialRates }: CurrencyConverterProps) {
    const [amount, setAmount] = useState<string>('1');
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('EUR');
    const [rates, setRates] = useState<ExchangeRates>(initialRates);
    const [history, setHistory] = useState<{ date: string, rate: number }[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // List of available currencies from the API response
    const currencyList = useMemo(() => {
        return [initialRates.base, ...Object.keys(initialRates.rates)].sort();
    }, [initialRates]);

    // Fetch new rates when 'fromCurrency' changes (because base changes)
    useEffect(() => {
        if (fromCurrency === rates.base) return;

        async function updateBase() {
            // We fetch client-side here for interactivity
            try {
                const res = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}`);
                const data = await res.json();
                setRates(data);
            } catch (err) {
                console.error("Failed to update base rate", err);
            }
        }
        updateBase();
    }, [fromCurrency, rates.base]);

    // Fetch history for the chart
    useEffect(() => {
        let active = true;

        async function fetchHistory() {
            if (fromCurrency === toCurrency) {
                if (active) setHistory([]);
                return;
            }

            if (active) setLoadingHistory(true);
            const data = await getHistoricalRates(fromCurrency, toCurrency, 30);

            if (active) {
                setHistory(data);
                setLoadingHistory(false);
            }
        }
        fetchHistory();
        return () => { active = false; };
    }, [fromCurrency, toCurrency]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const result = useMemo(() => {
        const val = parseFloat(amount);
        if (isNaN(val)) return 0;
        if (fromCurrency === toCurrency) return val;

        const rate = rates.rates[toCurrency];
        return val * (rate || 0);
    }, [amount, fromCurrency, toCurrency, rates]);

    const currentRate = rates.rates[toCurrency] || 1;

    return (
        <div className="space-y-6">
            <Card className="border-slate-200 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ArrowRightLeft className="text-emerald-600" />
                        Live Converter
                    </CardTitle>
                    <CardDescription>
                        Real-time ECB reference rates. Updated daily at 16:00 CET.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">

                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="text-lg font-bold"
                            />
                        </div>

                        <div className="space-y-2">
                             <Label htmlFor="from">From</Label>
                             <Select value={fromCurrency} onValueChange={setFromCurrency}>
                                <SelectTrigger id="from" className="font-mono">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencyList.map(c => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                             </Select>
                        </div>

                        <div className="flex justify-center pb-2">
                             <Button size="icon" variant="ghost" onClick={handleSwap} className="rounded-full hover:bg-emerald-50 text-emerald-600">
                                 <ArrowRightLeft className="w-5 h-5" />
                             </Button>
                        </div>

                        <div className="space-y-2">
                             <Label htmlFor="to">To</Label>
                             <Select value={toCurrency} onValueChange={setToCurrency}>
                                <SelectTrigger id="to" className="font-mono">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencyList.map(c => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                             </Select>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                        <div className="text-sm text-slate-500 mb-1">
                            {parseFloat(amount).toLocaleString()} {fromCurrency} =
                        </div>
                        <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
                        </div>
                        <div className="text-xs text-emerald-600 font-medium mt-2 flex items-center justify-center gap-1">
                            1 {fromCurrency} = {currentRate.toFixed(4)} {toCurrency}
                            <Info size={12} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Chart */}
            <Card className="border-slate-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        30 Day Trend ({fromCurrency} to {toCurrency})
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[200px] w-full">
                    {loadingHistory ? (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">Loading trend...</div>
                    ) : history.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    tick={{fontSize: 10}}
                                    tickFormatter={(val: string) => val.slice(5)} // MM-DD
                                    interval={6}
                                />
                                <YAxis domain={['auto', 'auto']} hide />
                                <Tooltip
                                    contentStyle={{fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="rate"
                                    stroke="#059669"
                                    fillOpacity={1}
                                    fill="url(#colorRate)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">No trend data available</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
