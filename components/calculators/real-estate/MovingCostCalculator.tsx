"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/formatters';
import { Printer, Truck, Package, Home, MapPin } from 'lucide-react';
import ShareButton from '@/components/features/ShareButton';

// Base rates for moving services (INR)
const BASE_RATES = {
  local: { // Within city
    perKm: 15,
    baseCharge: 2000,
    laborPerHour: 300,
  },
  intercity: { // Between cities
    perKm: 12,
    baseCharge: 5000,
    laborPerHour: 400,
  },
  interstate: { // Different states
    perKm: 10,
    baseCharge: 8000,
    laborPerHour: 500,
  },
};

// Vehicle capacity rates (multiplier based on truck size)
const VEHICLE_RATES = {
  mini: { capacity: '1 BHK / Small', multiplier: 1.0 },
  tempo: { capacity: '2 BHK / Medium', multiplier: 1.5 },
  truck: { capacity: '3+ BHK / Large', multiplier: 2.2 },
  container: { capacity: 'Full House / Office', multiplier: 3.0 },
};

// Additional services
const ADDITIONAL_SERVICES = {
  packing: { label: 'Professional Packing', rate: 3000 },
  unpacking: { label: 'Unpacking Service', rate: 2000 },
  furniture: { label: 'Furniture Dismantling/Assembly', rate: 2500 },
  insurance: { label: 'Transit Insurance (1%)', isPercentage: true, rate: 0.01 },
  storage: { label: 'Temporary Storage (per day)', rate: 500 },
  cleaning: { label: 'Post-Move Cleaning', rate: 1500 },
};

// City tier affects labor costs
const CITY_TIER_MULTIPLIER = {
  tier1: 1.3, // Metro (Mumbai, Delhi, Bangalore)
  tier2: 1.0, // Pune, Hyderabad, Chennai
  tier3: 0.8, // Smaller cities
};

export default function MovingCostCalculator() {
  const [moveType, setMoveType] = useState<'local' | 'intercity' | 'interstate'>('intercity');
  const [vehicleType, setVehicleType] = useState<keyof typeof VEHICLE_RATES>('tempo');
  const [distance, setDistance] = useState<number>(200);
  const [cityTier, setCityTier] = useState<keyof typeof CITY_TIER_MULTIPLIER>('tier1');
  const [laborHours, setLaborHours] = useState<number>(8);
  const [storageDays, setStorageDays] = useState<number>(0);
  const [goodsValue, setGoodsValue] = useState<number>(500000);

  const [selectedServices, setSelectedServices] = useState({
    packing: true,
    unpacking: false,
    furniture: true,
    insurance: true,
    storage: false,
    cleaning: false,
  });

  const handleServiceChange = (key: keyof typeof selectedServices) => {
    setSelectedServices(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const costs = useMemo(() => {
    const rates = BASE_RATES[moveType];
    const vehicle = VEHICLE_RATES[vehicleType];
    const tierMultiplier = CITY_TIER_MULTIPLIER[cityTier];

    // Base transportation cost
    const transportCost = (rates.baseCharge + (distance * rates.perKm)) * vehicle.multiplier;

    // Labor cost
    const laborCost = laborHours * rates.laborPerHour * tierMultiplier;

    // Additional services
    const serviceCosts: Record<string, number> = {};
    let servicesTotal = 0;

    if (selectedServices.packing) {
      serviceCosts.packing = ADDITIONAL_SERVICES.packing.rate * vehicle.multiplier;
      servicesTotal += serviceCosts.packing;
    }
    if (selectedServices.unpacking) {
      serviceCosts.unpacking = ADDITIONAL_SERVICES.unpacking.rate * vehicle.multiplier;
      servicesTotal += serviceCosts.unpacking;
    }
    if (selectedServices.furniture) {
      serviceCosts.furniture = ADDITIONAL_SERVICES.furniture.rate;
      servicesTotal += serviceCosts.furniture;
    }
    if (selectedServices.insurance) {
      serviceCosts.insurance = goodsValue * ADDITIONAL_SERVICES.insurance.rate;
      servicesTotal += serviceCosts.insurance;
    }
    if (selectedServices.storage && storageDays > 0) {
      serviceCosts.storage = ADDITIONAL_SERVICES.storage.rate * storageDays;
      servicesTotal += serviceCosts.storage;
    }
    if (selectedServices.cleaning) {
      serviceCosts.cleaning = ADDITIONAL_SERVICES.cleaning.rate;
      servicesTotal += serviceCosts.cleaning;
    }

    const subtotal = transportCost + laborCost + servicesTotal;
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    return {
      transportCost,
      laborCost,
      serviceCosts,
      servicesTotal,
      subtotal,
      gst,
      total,
    };
  }, [moveType, vehicleType, distance, cityTier, laborHours, storageDays, goodsValue, selectedServices]);

  return (
    <Card className="w-full bg-white shadow-xl rounded-2xl overflow-hidden border-slate-100">
      <CardHeader className="bg-orange-600 text-white p-6">
        <div className="flex items-center gap-3">
          <Truck className="w-8 h-8" />
          <div>
            <CardTitle className="text-2xl font-bold">Moving Cost Calculator</CardTitle>
            <CardDescription className="text-orange-100">
              Estimate your relocation expenses based on distance, load size, and services.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Move Type</Label>
            <Tabs value={moveType} onValueChange={(val: any) => setMoveType(val)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="local">
                  <Home className="w-4 h-4 mr-1" /> Local
                </TabsTrigger>
                <TabsTrigger value="intercity">
                  <MapPin className="w-4 h-4 mr-1" /> Intercity
                </TabsTrigger>
                <TabsTrigger value="interstate">
                  <Truck className="w-4 h-4 mr-1" /> Interstate
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label htmlFor="distance">Distance (km)</Label>
            <div className="flex gap-4 items-center">
              <Input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <Slider
              value={[distance]}
              onValueChange={(val) => setDistance(val[0])}
              min={moveType === 'local' ? 5 : 50}
              max={moveType === 'local' ? 100 : 3000}
              step={moveType === 'local' ? 5 : 50}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehicle / Load Size</Label>
            <Select value={vehicleType} onValueChange={(val: any) => setVehicleType(val)}>
              <SelectTrigger id="vehicle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(VEHICLE_RATES).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.capacity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city-tier">Origin/Destination City Type</Label>
            <Select value={cityTier} onValueChange={(val: any) => setCityTier(val)}>
              <SelectTrigger id="city-tier">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tier1">Tier 1 (Metro: Mumbai, Delhi, etc.)</SelectItem>
                <SelectItem value="tier2">Tier 2 (Pune, Hyderabad, etc.)</SelectItem>
                <SelectItem value="tier3">Tier 3 (Smaller Cities)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="labor">Labor Hours</Label>
              <Input
                id="labor"
                type="number"
                value={laborHours}
                onChange={(e) => setLaborHours(Number(e.target.value))}
                min={2}
                max={24}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goods-value">Goods Value (₹)</Label>
              <Input
                id="goods-value"
                type="number"
                value={goodsValue}
                onChange={(e) => setGoodsValue(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Additional Services</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(ADDITIONAL_SERVICES).map(([key, service]) => (
                <div key={key} className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <Checkbox
                    id={`svc-${key}`}
                    checked={selectedServices[key as keyof typeof selectedServices]}
                    onCheckedChange={() => handleServiceChange(key as keyof typeof selectedServices)}
                  />
                  <Label htmlFor={`svc-${key}`} className="cursor-pointer flex-1 text-sm">
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {selectedServices.storage && (
            <div className="space-y-2">
              <Label htmlFor="storage-days">Storage Days</Label>
              <Input
                id="storage-days"
                type="number"
                value={storageDays}
                onChange={(e) => setStorageDays(Number(e.target.value))}
                min={0}
                max={90}
              />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-between border border-slate-100">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" /> Cost Breakdown
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Transportation</span>
                <span className="font-medium text-slate-900">{formatCurrency(costs.transportCost)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Labor ({laborHours} hrs)</span>
                <span className="font-medium text-slate-900">{formatCurrency(costs.laborCost)}</span>
              </div>

              {Object.entries(costs.serviceCosts).map(([key, cost]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="capitalize text-slate-600">
                    {ADDITIONAL_SERVICES[key as keyof typeof ADDITIONAL_SERVICES]?.label || key}
                  </span>
                  <span className="font-medium text-slate-900">{formatCurrency(cost)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(costs.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">GST (18%)</span>
                <span className="font-medium">{formatCurrency(costs.gst)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-lg font-bold text-slate-800">Total Estimated Cost</span>
                <span className="text-2xl font-bold text-orange-600">{formatCurrency(costs.total)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
              <p className="text-xs text-orange-800">
                <strong>Tips to save:</strong> Book mid-month, declutter before moving,
                get quotes from multiple packers, and avoid peak seasons (month-end, festivals).
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer size={16} className="mr-2" /> Print
            </Button>
            <ShareButton
              title="My Moving Cost Estimate"
              text={`I estimated my relocation cost to be ${formatCurrency(costs.total)} using CostSmart!`}
              url="https://cost-smart-five.vercel.app/moving-cost-calculator"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
