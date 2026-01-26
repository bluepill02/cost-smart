"use client";

import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ShareButton from '@/components/features/ShareButton';
import { Sun, BatteryCharging, DollarSign, Loader2, Sparkles, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PrintSolarReport from '@/components/calculators/PrintSolarReport';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAIClassifier } from '@/lib/hooks/useAIClassifier';
import { cn } from '@/lib/utils';

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
    const [homeDescription, setHomeDescription] = useState('');
    const [isBillHighlighted, setIsBillHighlighted] = useState(false);

    // AI Estimator
    const { classify, result: usageTier, loading: aiLoading } = useAIClassifier();

    const currencySymbol = cityData.country === 'India' ? '₹' : '$';

    // Debounce AI call
    useEffect(() => {
        const timer = setTimeout(() => {
            if (homeDescription.length > 5) {
                classify(homeDescription, ['Low Usage', 'Medium Usage', 'High Usage', 'Very High Usage']);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [homeDescription, classify]);

    // Update Bill based on AI Tier
    useEffect(() => {
        if (usageTier) {
            // Estimate kWh based on tier
            let estimatedKwh = 800; // Medium default

            switch (usageTier) {
                case 'Low Usage':
                    estimatedKwh = 350; // Apartment / small home
                    break;
                case 'Medium Usage':
                    estimatedKwh = 900; // Average home
                    break;
                case 'High Usage':
                    estimatedKwh = 1600; // Large home / AC
                    break;
                case 'Very High Usage':
                    estimatedKwh = 2500; // Estate / EV + Pool
                    break;
            }

            // Calculate bill based on local rate
            // Bill = kWh * Cost/kWh
            const calculatedBill = Math.round(estimatedKwh * cityData.avg_electricity_cost_per_kwh);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setBill(calculatedBill);

            // Trigger visual feedback
            setIsBillHighlighted(true);
            const timer = setTimeout(() => setIsBillHighlighted(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [usageTier, cityData.avg_electricity_cost_per_kwh]);

    const { systemSize, savings20Year, paybackPeriod, chartData } = React.useMemo(() => {
        // 1. Calculate Monthly Usage (kWh) = Bill / Cost per kWh
        const monthlyKwh = bill / cityData.avg_electricity_cost_per_kwh;

        // 2. Required System Size (kW) = (Monthly Usage / 30) / Avg Sun Hours / 0.75 (Efficiency factor)
        const requiredKw = (monthlyKwh / 30) / cityData.avg_daily_sunlight_hours / 0.75;

        // 3. System Cost = Size * Cost/kW
        const grossCost = requiredKw * cityData.solar_installation_cost_per_kw;
        // Federal Tax Credit (USA 30%) or Subsidy (India ~20-40%). Simplified to 30% global avg for estimator.
        const netCost = grossCost * 0.70;

        // 4. Annual Savings & Data Projection
        let cumulativeSavings = 0 - netCost; // Start negative (investment)
        const dataPoints: ChartData[] = [];

        const currentAnnualBill = bill * 12;
        // Initial Investment Year 0
        dataPoints.push({ year: 'Start', savings: Math.round(cumulativeSavings) });

        let breakEvenFound = false;
        let calculatedBreakEvenYear = 0;

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
                calculatedBreakEvenYear = i - 1 + (Math.abs(dataPoints[i - 1].savings) / avoidedBill);
                breakEvenFound = true;
            }
        }

        // Extrapolate for 20 year total
        let total20Year = cumulativeSavings;
        for (let i = 11; i <= 20; i++) {
            const avoidedBill = currentAnnualBill * Math.pow(1 + cityData.grid_inflation_rate, i);
            total20Year += avoidedBill;
        }

        return {
            systemSize: requiredKw,
            savings20Year: total20Year,
            paybackPeriod: calculatedBreakEvenYear || 0,
            chartData: dataPoints
        };

    }, [bill, cityData]);

    return (
        <>
        <div className="space-y-8 print:hidden">
            <div className="space-y-6">

                {/* AI Estimator Input */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="home-description" className="font-semibold text-slate-700 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                            AI Bill Estimator
                        </Label>
                        {aiLoading && <span className="text-xs text-emerald-600 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Analyzing...</span>}
                        {!aiLoading && usageTier && <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">{usageTier} Detected</span>}
                    </div>
                    <div className="relative">
                        <Input
                            id="home-description"
                            placeholder="Describe your home (e.g., 3 bedrooms, AC, pool, 2 people)..."
                            value={homeDescription}
                            onChange={(e) => setHomeDescription(e.target.value)}
                            className="bg-white"
                        />
                    </div>
                    <p className="text-xs text-slate-400">
                        Don&apos;t know your bill? Describe your home and we&apos;ll estimate it for you.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <Label className="text-lg font-medium">Average Monthly Electricity Bill</Label>
                        <span className={cn(
                            "text-2xl font-bold text-slate-900 border-b-2 border-emerald-500 pb-1 transition-all duration-500",
                            isBillHighlighted && "text-emerald-600 scale-110 border-emerald-600 bg-emerald-50 px-2 rounded"
                        )}>
                            {currencySymbol}{bill}
                        </span>
                    </div>
                    <Slider
                        aria-label="Average Monthly Electricity Bill"
                        defaultValue={[150]}
                        value={[bill]}
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
                <Button
                    className="w-full h-14 text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xl"
                    onClick={() => alert("This checks your local installers availability! (Affiliate Link Placeholder)")}
                >
                    Get My Verified Solar Quote
                </Button>

                <div className="flex justify-center gap-2">
                    <ShareButton
                        title="My Solar Savings"
                        text={`I found I can save ${currencySymbol}${savings20Year.toLocaleString(undefined, { maximumFractionDigits: 0 })} with solar in ${cityData.city_name}.`}
                        variant="ghost"
                        className="text-slate-500 hover:text-emerald-600"
                    />
                    <Button
                        variant="ghost"
                        className="text-slate-500 hover:text-emerald-600"
                        onClick={() => window.print()}
                    >
                        <Printer className="w-4 h-4 mr-2" /> Print Report
                    </Button>
                </div>
            </div>
        </div>

        <PrintSolarReport
            cityData={cityData}
            systemSize={systemSize}
            savings20Year={savings20Year}
            paybackPeriod={paybackPeriod}
            monthlyBill={bill}
        />
        </>
    );
}
