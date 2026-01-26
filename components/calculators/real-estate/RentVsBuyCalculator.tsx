"use client";

import React, { useState, useMemo } from 'react';
import { Home, TrendingUp, DollarSign, ArrowRight, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from '@/lib/formatters';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

import { Switch } from '@/components/ui/switch';

export default function RentVsBuyCalculator() {
    // Region Toggle - Default to Global (US)
    const [isGlobal, setIsGlobal] = useState(true);
    const currency = isGlobal ? 'USD' : 'INR';

    // Buy Inputs
    const [propertyPrice, setPropertyPrice] = useState<number>(500000);
    const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [tenureYears, setTenureYears] = useState<number>(20);
    const [appreciationRate, setAppreciationRate] = useState<number>(5);
    const [maintenanceRate, setMaintenanceRate] = useState<number>(0.5); // % of value per year

    // Rent Inputs
    const [monthlyRent, setMonthlyRent] = useState<number>(2500);
    const [rentInflation, setRentInflation] = useState<number>(5);
    const [investmentReturn, setInvestmentReturn] = useState<number>(7); // Opportunity cost return

    // Update defaults when region changes
    React.useEffect(() => {
        if (isGlobal) {
            setPropertyPrice(500000); // $500k
            setMonthlyRent(2500); // $2.5k
            setInterestRate(6.5);
            setInvestmentReturn(7);
        } else {
            setPropertyPrice(5000000); // ₹50L
            setMonthlyRent(15000); // ₹15k
            setInterestRate(8.5);
            setInvestmentReturn(10);
        }
    }, [isGlobal]);

    const result = useMemo(() => {
        const years = tenureYears;
        const downPayment = propertyPrice * (downPaymentPercent / 100);
        const loanAmount = propertyPrice - downPayment;

        // EMI Calculation
        const monthlyRate = interestRate / 12 / 100;
        const totalMonths = tenureYears * 12;
        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

        // Simulation
        const data = [];
        let buyNetWorth = downPayment; // Starts with equity (roughly, ignoring fees for simplicity)
        let rentNetWorth = downPayment; // Starts with cash invested

        let currentPropertyValue = propertyPrice;
        let currentLoanBalance = loanAmount;
        let currentRent = monthlyRent;
        let currentMaintenance = (propertyPrice * (maintenanceRate / 100)) / 12;

        let totalRentPaid = 0;
        let totalBuyPayments = 0; // EMI + Maint
        let totalInterestPaid = 0;

        for (let m = 1; m <= years * 12; m++) {
            // BUY Scenario Update
            // 1. Loan Amortization
            const interest = currentLoanBalance * monthlyRate;
            const principal = emi - interest;
            currentLoanBalance -= principal;
            if (currentLoanBalance < 0) currentLoanBalance = 0;
            totalInterestPaid += interest;

            // 2. Costs
            const monthlyBuyCost = emi + currentMaintenance;
            totalBuyPayments += monthlyBuyCost;

            // 3. Appreciation (Monthly compounding for smoothness)
            currentPropertyValue *= (1 + (appreciationRate / 100 / 12));
            currentMaintenance = (currentPropertyValue * (maintenanceRate / 100)) / 12;

            // RENT Scenario Update
            // 1. Costs
            const monthlyRentCost = currentRent;
            totalRentPaid += monthlyRentCost;

            // 2. Investment (Opportunity Cost)
            // The difference between (Buy Outflow) and (Rent Outflow) is invested/withdrawn
            const surplus = monthlyBuyCost - monthlyRentCost;

            // Rent Net Worth grows by investment return + surplus
            rentNetWorth *= (1 + (investmentReturn / 100 / 12));
            rentNetWorth += surplus;

            // Annual Rent Inflation
            if (m % 12 === 0) {
                currentRent *= (1 + (rentInflation / 100));
            }

            // Record Annual Data
            if (m % 12 === 0) {
                data.push({
                    year: m / 12,
                    buyNetWorth: Math.round(currentPropertyValue - currentLoanBalance),
                    rentNetWorth: Math.round(rentNetWorth),
                    propertyValue: Math.round(currentPropertyValue),
                    loanBalance: Math.round(currentLoanBalance)
                });
            }
        }

        const finalBuyNetWorth = currentPropertyValue - currentLoanBalance;
        const winner = finalBuyNetWorth > rentNetWorth ? 'buy' : 'rent';
        const difference = Math.abs(finalBuyNetWorth - rentNetWorth);

        return {
            emi,
            finalBuyNetWorth,
            finalRentNetWorth: rentNetWorth,
            winner,
            difference,
            data
        };
    }, [propertyPrice, downPaymentPercent, interestRate, tenureYears, appreciationRate, maintenanceRate, monthlyRent, rentInflation, investmentReturn]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2">
                                <Building className="w-5 h-5 text-emerald-500" />
                                Parameters
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="region-mode" className="text-xs font-medium text-slate-500">
                                    {isGlobal ? 'Global (USD)' : 'India (INR)'}
                                </Label>
                                <Switch id="region-mode" checked={isGlobal} onCheckedChange={setIsGlobal} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="buy" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="buy">Buying Details</TabsTrigger>
                                <TabsTrigger value="rent">Renting & Market</TabsTrigger>
                            </TabsList>

                            <TabsContent value="buy" className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Property Price ({formatCurrency(propertyPrice, currency)})</Label>
                                    <Input type="number" value={propertyPrice} onChange={e => setPropertyPrice(Number(e.target.value))} className="font-bold text-lg" />
                                    <Slider
                                        value={[propertyPrice]}
                                        min={isGlobal ? 100000 : 1000000}
                                        max={isGlobal ? 2000000 : 50000000}
                                        step={isGlobal ? 10000 : 100000}
                                        onValueChange={(v) => setPropertyPrice(v[0])}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                                        <Input id="interest-rate" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="down-payment">Down Payment (%)</Label>
                                        <Input id="down-payment" type="number" value={downPaymentPercent} onChange={e => setDownPaymentPercent(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tenure">Tenure (Years)</Label>
                                        <Input id="tenure" type="number" value={tenureYears} onChange={e => setTenureYears(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="maintenance">Maintenance Cost (%/yr)</Label>
                                        <Input id="maintenance" type="number" value={maintenanceRate} onChange={e => setMaintenanceRate(Number(e.target.value))} step={0.1} />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="rent" className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Monthly Rent ({formatCurrency(monthlyRent, currency)})</Label>
                                    <Input type="number" value={monthlyRent} onChange={e => setMonthlyRent(Number(e.target.value))} />
                                    <Slider
                                        value={[monthlyRent]}
                                        min={isGlobal ? 500 : 5000}
                                        max={isGlobal ? 10000 : 200000}
                                        step={isGlobal ? 100 : 1000}
                                        onValueChange={(v) => setMonthlyRent(v[0])}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="appreciation">Property Appreciation (%/yr)</Label>
                                        <Input id="appreciation" type="number" value={appreciationRate} onChange={e => setAppreciationRate(Number(e.target.value))} step={0.1} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rent-inflation">Rent Inflation (%/yr)</Label>
                                        <Input id="rent-inflation" type="number" value={rentInflation} onChange={e => setRentInflation(Number(e.target.value))} step={0.1} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="investment-return">Investment Return (%/yr)</Label>
                                        <Input id="investment-return" type="number" value={investmentReturn} onChange={e => setInvestmentReturn(Number(e.target.value))} step={0.1} />
                                        <p className="text-xs text-slate-500">Return on saved cash if you rent</p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Net Worth Projection</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={result.data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" tickLine={false} axisLine={false} />
                                <YAxis
                                    tickFormatter={(v) => isGlobal ? `${(v/1000).toFixed(0)}k` : `${(v/100000).toFixed(0)}L`}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    formatter={(value: any) => formatCurrency(value, currency)}
                                    labelFormatter={(label) => `Year ${label}`}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="buyNetWorth"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    name="Net Worth (Buy)"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="rentNetWorth"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    name="Net Worth (Rent)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className={`text-white border-none ${result.winner === 'buy' ? 'bg-emerald-900' : 'bg-blue-900'}`}>
                    <CardHeader>
                        <CardTitle className="text-slate-200">Verdict</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">
                                Financially Better To
                            </div>
                            <div className={`text-4xl font-bold ${result.winner === 'buy' ? 'text-emerald-400' : 'text-blue-400'} flex items-center gap-3`}>
                                {result.winner === 'buy' ? <Home size={32} /> : <Building size={32} />}
                                <span className="uppercase">{result.winner}</span>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Difference after {tenureYears}y</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.difference, currency)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Buy Net Worth</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.finalBuyNetWorth, currency)}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-slate-400">Rent Net Worth</span>
                                <span className="font-semibold text-lg">{formatCurrency(result.finalRentNetWorth, currency)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                        <ArrowRight size={18}/>
                        Interpretation
                    </h4>
                    <p className="text-sm text-slate-800">
                        {result.winner === 'buy' ? (
                            <span>
                                Buying wins because property appreciation ({appreciationRate}%) and forced savings (equity buildup) outweigh the returns you'd get from investing the difference ({investmentReturn}%).
                            </span>
                        ) : (
                            <span>
                                Renting wins because the opportunity cost of the down payment and monthly savings invested at {investmentReturn}% beats the property appreciation ({appreciationRate}%).
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
