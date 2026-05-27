"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProStatus } from '@/lib/hooks/useProStatus';
import { Lock, Loader2, Package, Ship, Truck, DollarSign } from 'lucide-react';
import Link from 'next/link';

type Category = 'Electronics' | 'Clothing' | 'Auto Parts' | 'Beauty' | 'Toys' | 'Furniture' | 'Footwear' | 'Sports Equipment';

const DUTY_MATRIX: Record<string, Record<Category, number>> = {
  'China': { 'Electronics': 0.25, 'Clothing': 0.20, 'Auto Parts': 0.25, 'Beauty': 0.10, 'Toys': 0.15, 'Furniture': 0.10, 'Footwear': 0.25, 'Sports Equipment': 0.10 },
  'India': { 'Electronics': 0.05, 'Clothing': 0.10, 'Auto Parts': 0.025, 'Beauty': 0.05, 'Toys': 0.05, 'Furniture': 0.0, 'Footwear': 0.10, 'Sports Equipment': 0.05 },
  'Germany': { 'Electronics': 0.0, 'Clothing': 0.05, 'Auto Parts': 0.025, 'Beauty': 0.0, 'Toys': 0.0, 'Furniture': 0.0, 'Footwear': 0.05, 'Sports Equipment': 0.0 },
  'UAE': { 'Electronics': 0.0, 'Clothing': 0.10, 'Auto Parts': 0.025, 'Beauty': 0.05, 'Toys': 0.05, 'Furniture': 0.05, 'Footwear': 0.10, 'Sports Equipment': 0.05 },
  'Vietnam': { 'Electronics': 0.05, 'Clothing': 0.15, 'Auto Parts': 0.05, 'Beauty': 0.05, 'Toys': 0.05, 'Furniture': 0.05, 'Footwear': 0.15, 'Sports Equipment': 0.05 },
  'Japan': { 'Electronics': 0.0, 'Clothing': 0.05, 'Auto Parts': 0.025, 'Beauty': 0.0, 'Toys': 0.0, 'Furniture': 0.0, 'Footwear': 0.05, 'Sports Equipment': 0.0 },
  'South Korea': { 'Electronics': 0.0, 'Clothing': 0.05, 'Auto Parts': 0.025, 'Beauty': 0.0, 'Toys': 0.0, 'Furniture': 0.0, 'Footwear': 0.05, 'Sports Equipment': 0.0 },
  'Taiwan': { 'Electronics': 0.05, 'Clothing': 0.10, 'Auto Parts': 0.05, 'Beauty': 0.05, 'Toys': 0.05, 'Furniture': 0.05, 'Footwear': 0.10, 'Sports Equipment': 0.05 },
};

const ORIGIN_COUNTRIES = ['China', 'India', 'Germany', 'UAE', 'Vietnam', 'Japan', 'South Korea', 'Taiwan'] as const;
const CATEGORIES: Category[] = ['Electronics', 'Clothing', 'Auto Parts', 'Beauty', 'Toys', 'Furniture', 'Footwear', 'Sports Equipment'];

interface RouteData {
  distanceMiles: number;
  durationText: string;
}

interface ReportData {
  dutyRate: number;
  dutyAmount: number;
  mpfFees: number;
  taxAmount: number;
  volumetricWeight: number;
  chargeableWeight: number;
  weightType: string;
  freightCost: number;
  seaFreightCost: number;
  route: RouteData | null;
  lastMileCost: number;
  grandTotal: number;
  productValue: number;
}

export default function LandedCostReport() {
  const { isPro, isLoading: proLoading, proEmail } = useProStatus();

  const [originCountry, setOriginCountry] = useState('');
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [productValue, setProductValue] = useState('');
  const [weight, setWeight] = useState('');
  const [lengthCm, setLengthCm] = useState('');
  const [widthCm, setWidthCm] = useState('');
  const [heightCm, setHeightCm] = useState('');

  const [loading, setLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);

  const handleCalculate = async () => {
    if (!originCountry || !category || !productValue || !weight || !lengthCm || !widthCm || !heightCm) {
      setError('Please fill in all required fields.');
      return;
    }

    const val = parseFloat(productValue);
    const wt = parseFloat(weight);
    const l = parseFloat(lengthCm);
    const w = parseFloat(widthCm);
    const h = parseFloat(heightCm);

    if (isNaN(val) || isNaN(wt) || isNaN(l) || isNaN(w) || isNaN(h)) {
      setError('Please enter valid numbers for value, weight, and dimensions.');
      return;
    }

    setLoading(true);
    setError(null);

    // Section 1: Customs & Duties
    const dutyRate = DUTY_MATRIX[originCountry]?.[category as Category] ?? 0.10;
    const dutyAmount = val * dutyRate;
    let mpfFees = val * 0.003464;
    mpfFees = Math.max(31.67, Math.min(mpfFees, 538.40));
    const taxAmount = (val + dutyAmount) * 0.005;

    // Section 2: Shipping Cost
    const volumetricWeight = (l * w * h) / 5000;
    const chargeableWeight = Math.max(wt, volumetricWeight);
    const weightType = volumetricWeight > wt ? 'Volumetric' : 'Actual';
    const freightCost = chargeableWeight * 8.50;
    const seaFreightCost = chargeableWeight * 1.20;

    // Section 3: Domestic Route
    let routeData: RouteData | null = null;
    let lastMileCost = 0;
    let routeFailed = false;

    if (originAddress.trim() && destinationAddress.trim()) {
      setRouteLoading(true);
      setRouteError(false);
      try {
        const res = await fetch('/api/logistics/route-estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            origin: originAddress.trim(),
            destination: destinationAddress.trim(),
            isPro,
            email: proEmail,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            routeData = {
              distanceMiles: json.data.distanceMiles,
              durationText: json.data.durationText,
            };
            const distance = json.data.distanceMiles;
            lastMileCost = 25 + (distance * 0.35);
          } else {
            routeFailed = true;
          }
        } else {
          routeFailed = true;
        }
      } catch {
        routeFailed = true;
      } finally {
        setRouteLoading(false);
        if (routeFailed) {
          setRouteError(true);
        }
      }
    }

    // Section 4: Total
    const grandTotal = val + dutyAmount + mpfFees + taxAmount + freightCost + lastMileCost;

    setReport({
      dutyRate,
      dutyAmount,
      mpfFees,
      taxAmount,
      volumetricWeight,
      chargeableWeight,
      weightType,
      freightCost,
      seaFreightCost,
      route: routeData,
      lastMileCost,
      grandTotal,
      productValue: val,
    });

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="border-slate-200 rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
            <Package className="w-5 h-5 text-emerald-500" />
            Landed Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Origin & Destination */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin-country">Origin Country</Label>
              <Select onValueChange={setOriginCountry} value={originCountry}>
                <SelectTrigger id="origin-country">
                  <SelectValue placeholder="Select origin country" />
                </SelectTrigger>
                <SelectContent>
                  {ORIGIN_COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin-address">Origin Port/Address</Label>
              <Input
                id="origin-address"
                placeholder="e.g. Port of Shanghai, China"
                value={originAddress}
                onChange={(e) => setOriginAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination-address">Destination Address (US)</Label>
            <Input
              id="destination-address"
              placeholder="e.g. Dallas, TX or 123 Main St, Los Angeles, CA"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
            />
          </div>

          {/* Product Details */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-category">Product Category</Label>
              <Select onValueChange={(v) => setCategory(v as Category)} value={category}>
                <SelectTrigger id="product-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-value">Product Value ($)</Label>
              <Input
                id="product-value"
                type="number"
                min="0"
                placeholder="e.g. 5000"
                value={productValue}
                onChange={(e) => setProductValue(e.target.value)}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                placeholder="e.g. 25"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Dimensions (cm)</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  min="0"
                  placeholder="L"
                  value={lengthCm}
                  onChange={(e) => setLengthCm(e.target.value)}
                />
                <Input
                  type="number"
                  min="0"
                  placeholder="W"
                  value={widthCm}
                  onChange={(e) => setWidthCm(e.target.value)}
                />
                <Input
                  type="number"
                  min="0"
                  placeholder="H"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <Button
            onClick={handleCalculate}
            disabled={loading || proLoading}
            className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Calculating...
              </>
            ) : (
              'Get Landed Cost Report'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Report Output */}
      {report && (
        <div className="space-y-6">
          {/* Section 1: Customs & Duties */}
          <Card className="border-slate-200 rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                <Package className="w-5 h-5 text-amber-500" />
                Customs &amp; Duties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-slate-600">Duty Rate:</div>
                <div className="font-medium text-slate-900">{(report.dutyRate * 100).toFixed(1)}%</div>
                <div className="text-slate-600">Duty Amount:</div>
                <div className="font-medium text-amber-600">${report.dutyAmount.toFixed(2)}</div>
                <div className="text-slate-600">MPF Fees:</div>
                <div className="font-medium text-slate-900">${report.mpfFees.toFixed(2)}</div>
                <div className="text-slate-600">Handling/Harbor Fees:</div>
                <div className="font-medium text-slate-900">${report.taxAmount.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Shipping */}
          <Card className="border-slate-200 rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                <Ship className="w-5 h-5 text-blue-500" />
                Shipping Cost
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-slate-600">Weight Type:</div>
                <div className="font-medium text-slate-900">{report.weightType}</div>
                <div className="text-slate-600">Chargeable Weight:</div>
                <div className="font-medium text-slate-900">{report.chargeableWeight.toFixed(2)} kg</div>
                <div className="text-slate-600">Air Freight (est.):</div>
                <div className="font-medium text-blue-600">${report.freightCost.toFixed(2)}</div>
                <div className="text-slate-600">Sea Freight (alt.):</div>
                <div className="font-medium text-slate-500">${report.seaFreightCost.toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Domestic Route */}
          <Card className="border-slate-200 rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                <Truck className="w-5 h-5 text-emerald-500" />
                Domestic Route
              </CardTitle>
            </CardHeader>
            <CardContent>
              {routeLoading ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Estimating route...
                </div>
              ) : report.route ? (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-slate-600">Origin:</div>
                  <div className="font-medium text-slate-900">{originAddress}</div>
                  <div className="text-slate-600">Destination:</div>
                  <div className="font-medium text-slate-900">{destinationAddress}</div>
                  <div className="text-slate-600">Distance:</div>
                  <div className="font-medium text-slate-900">{report.route.distanceMiles.toFixed(1)} miles</div>
                  <div className="text-slate-600">Transit Time:</div>
                  <div className="font-medium text-slate-900">{report.route.durationText}</div>
                  <div className="text-slate-600">Last-Mile Cost:</div>
                  <div className="font-medium text-emerald-600">${report.lastMileCost.toFixed(2)}</div>
                </div>
              ) : routeError ? (
                <p className="text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
                  Route estimate unavailable. Other cost sections are still shown below.
                </p>
              ) : (
                <p className="text-sm text-slate-500">
                  Enter both origin port/address and US destination address to see route details.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Section 4: Total Landed Cost */}
          <Card className="border-emerald-500 rounded-2xl shadow-lg ring-4 ring-emerald-100 bg-emerald-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Total Landed Cost
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4 border-b border-dashed border-slate-300">
                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Grand Total</div>
                <div className="text-4xl font-extrabold text-slate-900">
                  ${report.grandTotal.toFixed(2)}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Product Value:</span>
                  <span className="font-medium">${report.productValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Import Duty:</span>
                  <span className="font-medium text-amber-600">+${report.dutyAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">MPF Fees:</span>
                  <span className="font-medium">+${report.mpfFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Taxes/Fees:</span>
                  <span className="font-medium">+${report.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Air Freight:</span>
                  <span className="font-medium text-blue-600">+${report.freightCost.toFixed(2)}</span>
                </div>
                {report.lastMileCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last-Mile Delivery:</span>
                    <span className="font-medium text-emerald-600">+${report.lastMileCost.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pro Section - Blurred for non-Pro */}
          <div className="relative">
            {!isPro && (
              <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3">
                <Lock className="w-10 h-10 text-slate-400" />
                <p className="text-lg font-semibold text-slate-700">Pro Feature</p>
                <p className="text-sm text-slate-500 text-center max-w-md">
                  Unlock detailed line-item breakdown, PDF export, route map, and historical comparison.
                </p>
                <Link href="/pricing">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white mt-2">
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
            )}

            <div className={!isPro ? 'blur-sm pointer-events-none select-none' : ''}>
              <div className="space-y-6">
                {/* Detailed Breakdown Table */}
                <Card className="border-slate-200 rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Detailed Line-Item Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 text-slate-600 font-medium">Item</th>
                            <th className="text-right py-2 text-slate-600 font-medium">Rate/Unit</th>
                            <th className="text-right py-2 text-slate-600 font-medium">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-2 text-slate-700">Product Value</td>
                            <td className="py-2 text-right text-slate-500">-</td>
                            <td className="py-2 text-right font-medium">${report.productValue.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-700">Import Duty</td>
                            <td className="py-2 text-right text-slate-500">{(report.dutyRate * 100).toFixed(1)}%</td>
                            <td className="py-2 text-right font-medium">${report.dutyAmount.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-700">Merchandise Processing Fee</td>
                            <td className="py-2 text-right text-slate-500">0.3464%</td>
                            <td className="py-2 text-right font-medium">${report.mpfFees.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-700">Harbor/Handling Fees</td>
                            <td className="py-2 text-right text-slate-500">0.5%</td>
                            <td className="py-2 text-right font-medium">${report.taxAmount.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-700">Air Freight ({report.weightType})</td>
                            <td className="py-2 text-right text-slate-500">$8.50/kg x {report.chargeableWeight.toFixed(2)} kg</td>
                            <td className="py-2 text-right font-medium">${report.freightCost.toFixed(2)}</td>
                          </tr>
                          {report.lastMileCost > 0 && (
                            <tr>
                              <td className="py-2 text-slate-700">Last-Mile Delivery</td>
                              <td className="py-2 text-right text-slate-500">{report.route ? `${report.route.distanceMiles.toFixed(0)} mi` : '-'}</td>
                              <td className="py-2 text-right font-medium">${report.lastMileCost.toFixed(2)}</td>
                            </tr>
                          )}
                          <tr className="border-t-2 border-slate-300">
                            <td className="py-2 font-bold text-slate-900">Grand Total</td>
                            <td className="py-2"></td>
                            <td className="py-2 text-right font-bold text-lg text-emerald-700">${report.grandTotal.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Export PDF Placeholder */}
                <Card className="border-slate-200 rounded-2xl shadow-sm">
                  <CardContent className="flex items-center justify-center p-6">
                    <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                      Export as PDF
                    </Button>
                  </CardContent>
                </Card>

                {/* Route Map Placeholder */}
                <Card className="border-slate-200 rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Route Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                      Interactive route map coming soon
                    </div>
                  </CardContent>
                </Card>

                {/* Historical Comparison Placeholder */}
                <Card className="border-slate-200 rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Historical Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                      Historical cost comparison chart coming soon
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
