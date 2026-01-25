"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/formatters';
import { Printer, Share2, RefreshCw } from 'lucide-react';
import ShareButton from '@/components/features/ShareButton';

// Rates based on 2024-25 Market Data (approximate per sq ft)
const RATES = {
  painting: {
    basic: 30, // Whitewash / Distemper
    standard: 50, // Emulsion
    premium: 90, // Royal / Texture
  },
  flooring: {
    basic: 60, // Vitrified Tiles
    standard: 120, // Premium Tiles / Laminate
    premium: 300, // Marble / Granite / Hardwood
  },
  electrical: {
    basic: 80,
    standard: 120,
    premium: 180,
  },
  plumbing: {
    basic: 90,
    standard: 150,
    premium: 250,
  },
  civil: { // False ceiling, wall changes, etc.
    basic: 100,
    standard: 200,
    premium: 350,
  },
  furniture: { // Wardrobes, Kitchen (per sq ft of floor area estimate)
    basic: 500,
    standard: 1000,
    premium: 1800,
  }
};

const CITY_TIER_MULTIPLIER = {
  tier1: 1.2, // Metro (Mumbai, Delhi, Blr)
  tier2: 1.0, // Pune, Ahmedabad, etc.
  tier3: 0.85, // Smaller towns
};

export default function HomeRenovationCalculator() {
  const [area, setArea] = useState<number>(1000);
  const [cityTier, setCityTier] = useState<keyof typeof CITY_TIER_MULTIPLIER>('tier1');
  const [quality, setQuality] = useState<'basic' | 'standard' | 'premium'>('standard');

  const [selectedCategories, setSelectedCategories] = useState({
    painting: true,
    flooring: true,
    electrical: true,
    plumbing: true,
    civil: false,
    furniture: false,
  });

  const handleCategoryChange = (key: keyof typeof selectedCategories) => {
    setSelectedCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const costs = useMemo(() => {
    const multiplier = CITY_TIER_MULTIPLIER[cityTier];
    const categoryCosts: Record<string, number> = {};
    let total = 0;

    (Object.keys(selectedCategories) as Array<keyof typeof selectedCategories>).forEach(key => {
      if (selectedCategories[key]) {
        const rate = RATES[key][quality];
        const cost = area * rate * multiplier;
        categoryCosts[key] = cost;
        total += cost;
      }
    });

    return { categoryCosts, total };
  }, [area, cityTier, quality, selectedCategories]);

  return (
    <Card className="w-full bg-white shadow-xl rounded-2xl overflow-hidden border-slate-100">
      <CardHeader className="bg-emerald-600 text-white p-6">
        <CardTitle className="text-2xl font-bold">Renovation Cost Estimator</CardTitle>
        <CardDescription className="text-emerald-100">
          Get a quick estimate based on current market rates in India.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="area">Carpet Area (sq. ft.)</Label>
            <div className="flex gap-4 items-center">
              <Input
                id="area"
                type="number"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <Slider
              value={[area]}
              onValueChange={(val) => setArea(val[0])}
              min={100}
              max={5000}
              step={50}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city-tier">City Type</Label>
            <Select value={cityTier} onValueChange={(val: any) => setCityTier(val)}>
              <SelectTrigger id="city-tier">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tier1">Tier 1 (Metro: Mumbai, Delhi, etc.)</SelectItem>
                <SelectItem value="tier2">Tier 2 (Pune, Jaipur, etc.)</SelectItem>
                <SelectItem value="tier3">Tier 3 (Smaller Cities)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quality Level</Label>
            <Tabs value={quality} onValueChange={(val: any) => setQuality(val)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-xs text-slate-500 mt-1">
              {quality === 'basic' && "Standard materials, economical finishes."}
              {quality === 'standard' && "Branded materials, modern finishes."}
              {quality === 'premium' && "Luxury materials, high-end finishes."}
            </p>
          </div>

          <div className="space-y-3">
            <Label>Scope of Work</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(selectedCategories).map((key) => (
                <div key={key} className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <Checkbox
                    id={`cat-${key}`}
                    checked={selectedCategories[key as keyof typeof selectedCategories]}
                    onCheckedChange={() => handleCategoryChange(key as keyof typeof selectedCategories)}
                  />
                  <Label htmlFor={`cat-${key}`} className="capitalize cursor-pointer flex-1">
                    {key}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-between border border-slate-100">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Estimated Budget</h3>

            <div className="space-y-3 mb-6">
              {Object.entries(costs.categoryCosts).map(([key, cost]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="capitalize text-slate-600">{key}</span>
                  <span className="font-medium text-slate-900">{formatCurrency(cost)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-slate-800">Total Estimate</span>
                <span className="text-2xl font-bold text-emerald-600">{formatCurrency(costs.total)}</span>
              </div>
              <p className="text-xs text-slate-500 text-right">
                *Approximate cost including labor & material. +18% GST may apply.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
             <Button variant="outline" onClick={() => window.print()}>
               <Printer size={16} className="mr-2" /> Print
             </Button>
             <ShareButton
                title="My Renovation Estimate"
                text={`I estimated my home renovation cost to be ${formatCurrency(costs.total)} using CostSmart!`}
                url="https://costsmart.app/home-renovation-cost-estimator"
             />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
