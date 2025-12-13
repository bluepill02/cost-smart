"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, AlertCircle, TrendingUp, Info } from 'lucide-react';
import AdContainer from '@/components/ads/AdContainer';
import ShareButton from '@/components/features/ShareButton';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Types & Constants ---

type Country = 'China' | 'USA' | 'India' | 'Germany' | 'UAE' | 'UK' | 'Canada';
type Category = 'Electronics' | 'Clothing' | 'Auto Parts' | 'Beauty';

interface DutyData {
    dutyRate: number; // Percentage (e.g., 0.25 for 25%)
    vatRate: number;  // VAT/GST Percentage
}

// Simplified Rate Matrix (Destination -> Origin -> Category -> Rate)
// Estimates based on standard MFN and recent trade policies (e.g. China 301 tariffs)
const DUTY_MATRIX: Record<string, Record<string, Record<Category, number>>> = {
    'USA': {
        'China': { 'Electronics': 0.25, 'Clothing': 0.20, 'Auto Parts': 0.25, 'Beauty': 0.10 },
        'India': { 'Electronics': 0.05, 'Clothing': 0.10, 'Auto Parts': 0.025, 'Beauty': 0.05 },
        'Germany': { 'Electronics': 0.0, 'Clothing': 0.05, 'Auto Parts': 0.025, 'Beauty': 0.0 }, // EU-US relations
        'UAE': { 'Electronics': 0.0, 'Clothing': 0.10, 'Auto Parts': 0.025, 'Beauty': 0.05 },
        'USA': { 'Electronics': 0, 'Clothing': 0, 'Auto Parts': 0, 'Beauty': 0 } // Domestic
    },
    'India': {
        'China': { 'Electronics': 0.20, 'Clothing': 0.25, 'Auto Parts': 0.15, 'Beauty': 0.20 },
        'USA': { 'Electronics': 0.15, 'Clothing': 0.20, 'Auto Parts': 0.15, 'Beauty': 0.20 },
        'Germany': { 'Electronics': 0.10, 'Clothing': 0.20, 'Auto Parts': 0.15, 'Beauty': 0.20 },
        'UAE': { 'Electronics': 0.10, 'Clothing': 0.15, 'Auto Parts': 0.10, 'Beauty': 0.15 }, // CEPA benefits? simplified
        'India': { 'Electronics': 0, 'Clothing': 0, 'Auto Parts': 0, 'Beauty': 0 }
    },
    'UK': {
        'China': { 'Electronics': 0.12, 'Clothing': 0.12, 'Auto Parts': 0.10, 'Beauty': 0.08 },
        'USA': { 'Electronics': 0.0, 'Clothing': 0.12, 'Auto Parts': 0.10, 'Beauty': 0.0 },
        'India': { 'Electronics': 0.0, 'Clothing': 0.10, 'Auto Parts': 0.08, 'Beauty': 0.0 },
        'Germany': { 'Electronics': 0.0, 'Clothing': 0.0, 'Auto Parts': 0.0, 'Beauty': 0.0 }, // Brexit/EU rules?
        'UAE': { 'Electronics': 0.05, 'Clothing': 0.10, 'Auto Parts': 0.05, 'Beauty': 0.05 },
        'UK': { 'Electronics': 0, 'Clothing': 0, 'Auto Parts': 0, 'Beauty': 0 }
    },
    'Canada': {
        'China': { 'Electronics': 0.06, 'Clothing': 0.18, 'Auto Parts': 0.06, 'Beauty': 0.065 },
        'USA': { 'Electronics': 0.0, 'Clothing': 0.0, 'Auto Parts': 0.0, 'Beauty': 0.0 }, // USMCA
        'India': { 'Electronics': 0.0, 'Clothing': 0.17, 'Auto Parts': 0.06, 'Beauty': 0.065 },
        'Germany': { 'Electronics': 0.0, 'Clothing': 0.18, 'Auto Parts': 0.0, 'Beauty': 0.0 }, // CETA
        'UAE': { 'Electronics': 0.05, 'Clothing': 0.15, 'Auto Parts': 0.05, 'Beauty': 0.05 },
        'Canada': { 'Electronics': 0, 'Clothing': 0, 'Auto Parts': 0, 'Beauty': 0 }
    }
};

const VAT_ATES: Record<string, number> = {
    'USA': 0.0, // Sales tax varies, but usually not "Import VAT" at border in same way. Keeping simple or add Avg sales tax 8%? User prompted for Duty+VAT.
    'India': 0.18, // IGST
    'UK': 0.20,
    'Canada': 0.13, // HST Avg
};

export default function ImportForm() {
    const [productValue, setProductValue] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [category, setCategory] = useState<Category | 'Custom' | ''>('');
    const [customDutyRate, setCustomDutyRate] = useState<string>(''); // User editable rate (%)

    // Handle Category Change
    const handleCategoryChange = (val: Category | 'Custom') => {
        setCategory(val);
        if (val === 'Custom') {
            setCustomDutyRate(''); // Clear for manual input
        } else if (origin && destination) {
            // Auto-fill average from matrix if available
            const rate = DUTY_MATRIX[destination]?.[origin]?.[val] ?? 0.10;
            setCustomDutyRate((rate * 100).toFixed(1)); // Convert 0.25 -> "25.0"
        }
    };

    // Update rate if Origin/Dest changes and Category is already selected (and not Custom)
    React.useEffect(() => {
        if (category && category !== 'Custom' && origin && destination) {
            const rate = DUTY_MATRIX[destination]?.[origin]?.[category as Category] ?? 0.10;
            setCustomDutyRate((rate * 100).toFixed(1));
        }
    }, [origin, destination]);


    const result = useMemo(() => {
        const val = parseFloat(productValue);
        const rateInput = parseFloat(customDutyRate);

        if (isNaN(val) || isNaN(rateInput) || !origin || !destination) return null;

        // 1. Get Base Rate (User input / matrix default)
        const dutyPercent = rateInput / 100;

        // 2. Get VAT
        let vatPercent = VAT_ATES[destination] ?? 0.0;
        // USA special case: Import tax vs Sales tax. Let's add small buffer for MPF/HMF fees (~0.5%)
        if (destination === 'USA') vatPercent = 0.005;

        // 3. Calculate
        const dutyAmount = val * dutyPercent;
        // VAT is usually charged on (Value + Duty)
        const vatAmount = (val + dutyAmount) * vatPercent;
        const totalLanded = val + dutyAmount + vatAmount;

        return {
            dutyPercent,
            vatPercent,
            dutyAmount,
            vatAmount,
            totalLanded
        };
    }, [productValue, origin, destination, customDutyRate]);

    const currencySymbol = destination === 'India' ? '₹' : destination === 'UK' ? '£' : '$';

    return (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Input Section */}
            <Card className="lg:col-span-2 border-slate-200 shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-emerald-600" />
                        Duty Estimator
                    </CardTitle>
                    <CardDescription>
                        Enter shipment details to calculate reliable landed costs.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Origin Country</Label>
                            <Select onValueChange={setOrigin} value={origin}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Where is it from?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="China">China</SelectItem>
                                    <SelectItem value="USA">USA</SelectItem>
                                    <SelectItem value="India">India</SelectItem>
                                    <SelectItem value="Germany">Germany</SelectItem>
                                    <SelectItem value="UAE">UAE</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Destination Country</Label>
                            <Select onValueChange={setDestination} value={destination}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Where is it going?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="India">India</SelectItem>
                                    <SelectItem value="USA">USA</SelectItem>
                                    <SelectItem value="UK">UK</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Product Category</Label>
                            <Select onValueChange={(v) => handleCategoryChange(v as Category | 'Custom')} value={category}>
                                <SelectTrigger>
                                    <SelectValue placeholder="What kind of item?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Electronics">Electronics</SelectItem>
                                    <SelectItem value="Clothing">Clothing & Apparel</SelectItem>
                                    <SelectItem value="Auto Parts">Automotive Parts</SelectItem>
                                    <SelectItem value="Beauty">Beauty & Cosmetics</SelectItem>
                                    <SelectItem value="Custom">Custom / Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                Duty Rate (%)
                                {category !== 'Custom' && category !== '' && (
                                    <span className="text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                        Avg. Suggested
                                    </span>
                                )}
                            </Label>
                            <Input
                                type="number"
                                placeholder="e.g. 10"
                                value={customDutyRate}
                                onChange={(e) => setCustomDutyRate(e.target.value)}
                                className="font-medium"
                            />
                            <p className="text-xs text-slate-500">
                                {category === 'Custom'
                                    ? "Enter the exact HS code duty rate if known."
                                    : "You can edit this if you have a specific rate."}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Product Value ({currencySymbol})</Label>
                        <Input
                            type="number"
                            placeholder="e.g. 500"
                            value={productValue}
                            onChange={(e) => setProductValue(e.target.value)}
                            className="text-lg font-medium"
                        />
                        <p className="text-xs text-slate-500">Enter the invoice value of the goods.</p>
                    </div>

                    <div className="pt-4 flex items-center gap-3 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <Info className="w-4 h-4 text-blue-500 shrink-0" />
                        <p><strong>Disclaimer:</strong> Estimates for planning purposes only. Consult a customs broker for final clearance. Actual fees may vary.</p>
                    </div>

                </CardContent>
            </Card>

            {/* Sticky Summary Section */}
            <div className="lg:sticky lg:top-8">
                <Card className={cn(
                    "border-2 transition-colors duration-300 shadow-xl overflow-hidden",
                    result ? "border-emerald-500 bg-emerald-50/10" : "border-slate-100 bg-slate-50"
                )}>
                    <CardHeader className="pb-2 bg-slate-900 text-white">
                        <CardTitle className="text-lg flex items-center justify-between">
                            Total Landed Cost
                            {result && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        {!result ? (
                            <div className="text-center py-8 opacity-50">
                                <p className="text-sm">Enter details to see breakdown</p>
                                <div className="mt-4 h-8 w-24 bg-slate-200 rounded mx-auto animate-pulse" />
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

                                {/* Big Result */}
                                <div className="text-center pb-4 border-b border-dashed border-slate-300">
                                    <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Estimated Total</div>
                                    <div className="text-4xl font-extrabold text-slate-900">
                                        {currencySymbol}{result.totalLanded.toFixed(2)}
                                    </div>
                                </div>

                                {/* Breakdown */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Product Value:</span>
                                        <span className="font-medium">{currencySymbol}{parseFloat(productValue).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Import Duty ({(result.dutyPercent * 100).toFixed(1)}%):</span>
                                        <span className="font-medium text-amber-600">+{currencySymbol}{result.dutyAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">VAT/GST/Fees ({(result.vatPercent * 100).toFixed(1)}%):</span>
                                        <span className="font-medium text-red-600">+{currencySymbol}{result.vatAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <ShareButton
                                        title="Import Duty Estimate"
                                        text={`Estimated landed cost for ${category} from ${origin} to ${destination}: ${currencySymbol}${result.totalLanded.toFixed(2)}.`}
                                        variant="default"
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                                    />
                                    <Button variant="outline" className="w-full border-blue-600 text-blue-700 hover:bg-blue-50">
                                        Get Shipping Quote
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Ad Placeholder - High visibility below results */}
                <AdContainer size="rectangle" className="mt-8" />
            </div>
        </div>
    );
}
