"use client";

import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import ShareButton from '@/components/features/ShareButton';
import { Sun, BatteryCharging, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SolarData {
    city_name: string;
    country: string;
    avg_daily_sunlight_hours: number;
    avg_electricity_cost_per_kwh: number; // 0.13 or 7.5
    grid_inflation_rate: number;
    solar_installation_cost_per_kw: number;
}

interface ChartData {
    year: string;
    savings: number;
}

export default function SolarForm({ cityData }: { cityData: SolarData }) {
    const [bill, setBill] = useState(150); // Default monthly bill
    const [systemSize, setSystemSize] = useState(0);
    const [savings20Year, setSavings20Year] = useState(0);
    const [paybackPeriod, setPaybackPeriod] = useState(0);
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const currencySymbol = cityData.country === 'India' ? '₹' : '$';

    useEffect(() => {
        // 1. Calculate Monthly Usage (kWh) = Bill / Cost per kWh
        const monthlyKwh = bill / cityData.avg_electricity_cost_per_kwh;

        // 2. Required System Size (kW) = (Monthly Usage / 30) / Avg Sun Hours / 0.75 (Efficiency factor)
        const requiredKw = (monthlyKwh / 30) / cityData.avg_daily_sunlight_hours / 0.75;
        setSystemSize(requiredKw);

        // 3. System Cost = Size * Cost/kW
        const grossCost = requiredKw * cityData.solar_installation_cost_per_kw;
        // Federal Tax Credit (USA 30%) or Subsidy (India ~20-40%). Simplified to 30% global avg for estimator.
        const netCost = grossCost * 0.70;

        // 4. Annual Savings & Data Projection
        let cumulativeSavings = 0 - netCost; // Start negative (investment)
        const dataPoints: ChartData[] = [];

        let currentAnnualBill = bill * 12;
        // Initial Investment Year 0
        dataPoints.push({ year: 'Start', savings: Math.round(cumulativeSavings) });

        let breakEvenFound = false;
        let breakEvenYear = 0;

        for (let i = 1; i <= 10; i++) {
            // Savings = Avoided Bill calculated at inflated rate
            const avoidedBill = currentAnnualBill * Math.pow(1 + cityData.grid_inflation_rate, i);
            cumulativeSavings += avoidedBill;

            dataPoints.push({
                year: `Yr ${i}`,
                savings: Math.round(cumulativeSavings)
            });

            if (cumulativeSavings >= 0 && !breakEvenFound) {
                // Simple linear interpolation for year fraction? 
                // Just capturing the integer year for now.
                breakEvenYear = i - 1 + (Math.abs(dataPoints[i - 1].savings) / avoidedBill);
                breakEvenFound = true;
            }
        }

        // Extrapolate for 20 year total
        let total20Year = cumulativeSavings;
        for (let i = 11; i <= 20; i++) {
            const avoidedBill = currentAnnualBill * Math.pow(1 + cityData.grid_inflation_rate, i);
            total20Year += avoidedBill;
        }

        setSavings20Year(total20Year);
        setPaybackPeriod(breakEvenYear || 0); // Use the chart derived one or fallback
        setChartData(dataPoints);

    }, [bill, cityData]);

    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <Label className="text-lg font-medium">Average Monthly Electricity Bill</Label>
                        <span className="text-2xl font-bold text-slate-900 border-b-2 border-emerald-500 pb-1">
                            {currencySymbol}{bill}
                        </span>
                    </div>
                    <Slider
                        defaultValue={[150]}
                        max={cityData.country === 'India' ? 10000 : 1000}
                        min={cityData.country === 'India' ? 500 : 30}
                        step={cityData.country === 'India' ? 100 : 10}
                        onValueChange={(vals) => setBill(vals[0])}
                        className="py-4"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>Low Usage</span>
                        <span>High Usage</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Payback Card */}
                <Card className="border-slate-200 bg-slate-50/50">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <BatteryCharging className="w-8 h-8 text-blue-500 mb-3" />
                        <div className="text-sm text-slate-500 mb-1">Payback Period</div>
                        <div className="text-3xl font-bold text-slate-900">{paybackPeriod.toFixed(1)} <span className="text-base font-normal text-slate-500">Years</span></div>
                    </CardContent>
                </Card>

                {/* System Size Card */}
                <Card className="border-slate-200 bg-slate-50/50">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <Sun className="w-8 h-8 text-amber-500 mb-3" />
                        <div className="text-sm text-slate-500 mb-1">Recommended System</div>
                        <div className="text-3xl font-bold text-slate-900">{systemSize.toFixed(1)} <span className="text-base font-normal text-slate-500">kW</span></div>
                    </CardContent>
                </Card>

                {/* Savings Card (Highlighted) */}
                <Card className="border-emerald-500 bg-emerald-50 shadow-lg md:col-span-1 ring-4 ring-emerald-100">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <DollarSign className="w-8 h-8 text-emerald-600 mb-3" />
                        <div className="text-sm text-emerald-800 font-medium mb-1">20-Year Savings</div>
                        <div className="text-3xl font-extrabold text-emerald-700">
                            {currencySymbol}{savings20Year.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Retention Chart */}
            <div className="h-64 w-full mt-8 bg-slate-50 rounded-lg p-4 border border-slate-100">
                <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-700">Cumulative Net Savings (10 Years)</h4>
                    <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">Inflation Adj.</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="year" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${currencySymbol}${val}`} />
                        <Tooltip
                            cursor={{ fill: '#f1f5f9' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar
                            dataKey="savings"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-3">
                <Button className="w-full h-14 text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xl">
                    Get My Verified Solar Quote
                </Button>

                <div className="flex justify-center">
                    <ShareButton
                        title="My Solar Savings"
                        text={`I found I can save ${currencySymbol}${savings20Year.toLocaleString(undefined, { maximumFractionDigits: 0 })} with solar in ${cityData.city_name}.`}
                        variant="ghost"
                        className="text-slate-500 hover:text-emerald-600"
                    />
                </div>
            </div>
        </div>
    );
}
