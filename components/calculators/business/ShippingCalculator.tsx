"use client";

import React, { useState, useMemo } from 'react';
import { Package, Scale, Truck, ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatters';

const PROVIDERS = {
    'generic': { name: 'Standard / IATA', divisor: 5000, url: '' },
    'fedex': { name: 'FedEx', divisor: 5000, url: 'https://www.fedex.com/lite/lite-ship.html' },
    'dhl': { name: 'DHL Express', divisor: 5000, url: 'https://www.dhl.com/en/express/shipping.html' },
    'blue-dart': { name: 'Blue Dart (Domestic)', divisor: 5000, url: 'https://www.bluedart.com/price-finder' },
    'india-post': { name: 'India Post', divisor: 6000, url: 'https://www.indiapost.gov.in/VAS/Pages/CalculatePostage.aspx' },
};

export default function ShippingCalculator() {
    const [length, setLength] = useState<number>(30);
    const [width, setWidth] = useState<number>(20);
    const [height, setHeight] = useState<number>(15);
    const [actualWeight, setActualWeight] = useState<number>(2); // kg
    const [quantity, setQuantity] = useState<number>(1);
    const [ratePerKg, setRatePerKg] = useState<number>(50);
    const [provider, setProvider] = useState<string>("generic");

    const currentProvider = PROVIDERS[provider as keyof typeof PROVIDERS];

    const result = useMemo(() => {
        const volDivisor = currentProvider.divisor;
        // Volumetric Weight per box
        const volumeCm3 = length * width * height;
        const volWeightSingle = volumeCm3 / volDivisor;

        // Total Weights
        const totalActualWeight = actualWeight * quantity;
        const totalVolWeight = volWeightSingle * quantity;

        // Chargeable Weight is Max of Total Actual vs Total Volumetric
        const chargeableWeight = Math.max(totalActualWeight, totalVolWeight);

        // Cost
        const totalCost = chargeableWeight * ratePerKg;

        return {
            volWeightSingle,
            totalActualWeight,
            totalVolWeight,
            chargeableWeight,
            totalCost,
            isVolumetric: totalVolWeight > totalActualWeight
        };
    }, [length, width, height, actualWeight, quantity, ratePerKg, provider, currentProvider]);

    return (
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-blue-600" />
                            Package Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="provider">Courier / Provider</Label>
                                <Select value={provider} onValueChange={setProvider}>
                                    <SelectTrigger id="provider">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(PROVIDERS).map(([key, p]) => (
                                            <SelectItem key={key} value={key}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-slate-500">
                                    Adjusts the volumetric divisor ({currentProvider.divisor}) automatically.
                                </p>
                            </div>

                             <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="length">Length (cm)</Label>
                                    <Input
                                        id="length"
                                        type="number"
                                        value={length}
                                        onChange={(e) => setLength(Number(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="width">Width (cm)</Label>
                                    <Input
                                        id="width"
                                        type="number"
                                        value={width}
                                        onChange={(e) => setWidth(Number(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="height">Height (cm)</Label>
                                    <Input
                                        id="height"
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Actual Weight (kg)</Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        value={actualWeight}
                                        onChange={(e) => setActualWeight(Number(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="qty">Quantity</Label>
                                    <Input
                                        id="qty"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t space-y-2">
                                <Label htmlFor="rate">Estimated Rate per kg</Label>
                                <Input
                                    id="rate"
                                    type="number"
                                    value={ratePerKg}
                                    onChange={(e) => setRatePerKg(Number(e.target.value))}
                                />
                                <p className="text-xs text-slate-500">
                                    Enter your negotiated rate or standard card rate.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-slate-900 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-slate-200">Shipping Cost Estimate</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="text-slate-400 text-sm font-medium mb-1">Estimated Cost</div>
                            <div className="text-4xl font-bold text-emerald-400">
                                {formatCurrency(result.totalCost, 'USD').replace('$', '')} <span className="text-xl text-slate-400">approx</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                                Based on chargeable weight of {result.chargeableWeight.toFixed(2)} kg
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                            <div className={`p-3 rounded-lg ${!result.isVolumetric ? 'bg-blue-900/40 border border-blue-800' : 'bg-slate-800/50 opacity-50'}`}>
                                <div className="text-slate-400 text-xs mb-1">Actual Weight</div>
                                <div className="font-bold text-xl">{result.totalActualWeight.toFixed(2)} kg</div>
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                    <Scale size={12}/> Physical
                                </div>
                            </div>
                            <div className={`p-3 rounded-lg ${result.isVolumetric ? 'bg-blue-900/40 border border-blue-800' : 'bg-slate-800/50 opacity-50'}`}>
                                <div className="text-slate-400 text-xs mb-1">Volumetric Weight</div>
                                <div className="font-bold text-xl">{result.totalVolWeight.toFixed(2)} kg</div>
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                    <Truck size={12}/> Dimensional
                                </div>
                            </div>
                        </div>

                        {currentProvider.url && (
                            <div className="mt-4 pt-4 border-t border-slate-800">
                                <Button className="w-full bg-slate-800 hover:bg-slate-700" onClick={() => window.open(currentProvider.url, '_blank')}>
                                    <ExternalLink className="mr-2 h-4 w-4" /> Check Real Rates on {currentProvider.name}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                 <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                        <ArrowRight size={18}/>
                        Note on APIs
                    </h4>
                    <p className="text-sm text-blue-800">
                        Live shipping rates require a business account and API keys from {currentProvider.name}.
                        This calculator provides a volumetric estimate based on standard industry formulas.
                    </p>
                </div>
            </div>
        </div>
    );
}
