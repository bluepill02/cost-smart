"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useProStatus } from '@/lib/hooks/useProStatus';
import {
  Sun, MapPin, Zap, DollarSign, Lock, Leaf, TrendingUp,
  Loader2, Navigation, ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface RoofSegmentStat {
  pitchDegrees?: number;
  azimuthDegrees?: number;
  stats?: { areaMeters2?: number; sunshineQuantiles?: number[] };
  center?: { latitude: number; longitude: number };
  planeHeightAtCenterMeters?: number;
}

interface MoneyAmount {
  currencyCode?: string;
  units?: string;
}

interface SavingsPeriod {
  savingsYear1?: MoneyAmount;
  savingsYear20?: MoneyAmount;
  savingsLifetime?: MoneyAmount;
}

interface FinancialAnalysis {
  monthlyBill?: MoneyAmount;
  panelConfigIndex?: number;
  financialDetails?: {
    initialAcKwhPerYear?: number;
    remainingLifetimeUtilityBill?: MoneyAmount;
    federalIncentive?: MoneyAmount;
    stateIncentive?: MoneyAmount;
    utilityIncentive?: MoneyAmount;
    costOfElectricityWithoutSolar?: MoneyAmount;
    netMeteringAllowed?: boolean;
    solarPercentage?: number;
  };
  leasingSavings?: {
    leasesAllowed?: boolean;
    annualLeasingCost?: MoneyAmount;
    savings?: SavingsPeriod;
  };
  cashPurchaseSavings?: {
    outOfPocketCost?: MoneyAmount;
    upfrontCost?: MoneyAmount;
    rebateValue?: MoneyAmount;
    paybackYears?: number;
    savings?: SavingsPeriod;
  };
  financedPurchaseSavings?: {
    annualLoanPayment?: MoneyAmount;
    loanInterestRate?: number;
    savings?: SavingsPeriod;
  };
}

interface SolarPanelConfig {
  panelsCount?: number;
  yearlyEnergyDcKwh?: number;
}

interface SolarData {
  imageryDate?: { year: number; month: number; day: number };
  regionCode?: string;
  solarPotential: {
    maxArrayPanelsCount?: number;
    maxArrayAreaMeters2?: number;
    maxSunshineHoursPerYear?: number;
    carbonOffsetFactorKgPerMwh?: number;
    panelCapacityWatts?: number;
    panelHeightMeters?: number;
    panelWidthMeters?: number;
    panelLifetimeYears?: number;
    wholeRoofStats?: { areaMeters2?: number; sunshineQuantiles?: number[] };
    roofSegmentStats?: RoofSegmentStat[];
    solarPanelConfigs?: SolarPanelConfig[];
    financialAnalyses?: FinancialAnalysis[];
  };
  center?: { latitude: number; longitude: number };
}

interface ApiResponse {
  success: boolean;
  data: SolarData;
  rateLimit: { limit: number; remaining: number };
}

const STORAGE_KEY = 'costsmart_solar_lookups';

function getLookupCount(): { count: number; date: string } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const today = new Date().toISOString().split('T')[0];
      if (parsed.date === today) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return { count: 0, date: new Date().toISOString().split('T')[0] };
}

function incrementLookupCount(): void {
  try {
    const current = getLookupCount();
    const today = new Date().toISOString().split('T')[0];
    const updated = { count: current.date === today ? current.count + 1 : 1, date: today };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export default function SolarAnalyzer() {
  const { isPro, isLoading: proLoading } = useProStatus();

  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');

  const [geocoding, setGeocoding] = useState(false);
  const [geolocating, setGeolocating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [results, setResults] = useState<SolarData | null>(null);
  const [remainingLookups, setRemainingLookups] = useState<number | null>(null);

  const geocodeAddress = useCallback(async () => {
    if (!address.trim()) return;
    setGeocoding(true);
    setError(null);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
        { headers: { 'User-Agent': 'CostSmart/1.0' } }
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setLatitude(parseFloat(data[0].lat));
        setLongitude(parseFloat(data[0].lon));
      } else {
        setError('Could not find coordinates for this address. Try a more specific address or use manual input.');
      }
    } catch {
      setError('Geocoding failed. Please try again or enter coordinates manually.');
    } finally {
      setGeocoding(false);
    }
  }, [address]);

  const useMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser. Please enter coordinates manually.');
      return;
    }
    setGeolocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setGeolocating(false);
      },
      (err) => {
        setGeolocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location permission denied. Please enter your address or coordinates manually.');
        } else {
          setError('Could not get your location. Please try again or enter coordinates manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const applyManualCoords = useCallback(() => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setError('Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180.');
      return;
    }
    setLatitude(lat);
    setLongitude(lng);
    setError(null);
  }, [manualLat, manualLng]);

  const analyze = useCallback(async () => {
    if (latitude === null || longitude === null) return;
    setLoading(true);
    setError(null);
    setRateLimited(false);
    setResults(null);

    try {
      const res = await fetch('/api/solar/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude,
          longitude,
          isPro,
          subscriptionId: null,
        }),
      });

      if (res.status === 429) {
        setRateLimited(true);
        setError('Daily lookup limit reached.');
        return;
      }

      if (res.status === 404) {
        setError('No solar data available for this location. Try a different address.');
        return;
      }

      if (!res.ok) {
        setError('Something went wrong. Please try again.');
        return;
      }

      const json: ApiResponse = await res.json();
      if (json.success && json.data) {
        setResults(json.data);
        setRemainingLookups(json.rateLimit.remaining);
        incrementLookupCount();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, isPro]);

  const hasCoordinates = latitude !== null && longitude !== null;

  // Derived values from results
  const panelCount = results?.solarPotential?.maxArrayPanelsCount ?? 0;
  const panelCapacity = results?.solarPotential?.panelCapacityWatts ?? 400;
  const totalCapacityKw = (panelCount * panelCapacity) / 1000;
  const roofArea = results?.solarPotential?.wholeRoofStats?.areaMeters2 ??
    results?.solarPotential?.maxArrayAreaMeters2 ?? 0;

  // Get annual energy from optimal config (last config)
  const configs = results?.solarPotential?.solarPanelConfigs ?? [];
  const optimalConfig = configs.length > 0 ? configs[configs.length - 1] : null;
  const annualEnergyKwh = optimalConfig?.yearlyEnergyDcKwh ?? 0;
  const avgElectricityRate = 0.13;
  const annualSavings = annualEnergyKwh * avgElectricityRate;
  const installationCostPerWatt = 2.77;
  const totalInstallCost = totalCapacityKw * 1000 * installationCostPerWatt;
  const paybackYears = annualSavings > 0 ? totalInstallCost / annualSavings : 0;
  const co2OffsetKg = annualEnergyKwh * 0.42;
  const monthlyProduction = annualEnergyKwh / 12;

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="border-slate-200 rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
            <MapPin className="w-5 h-5 text-emerald-500" />
            Enter Your Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Enter your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') geocodeAddress(); }}
              className="flex-1"
            />
            <Button
              onClick={geocodeAddress}
              disabled={!address.trim() || geocoding}
              variant="outline"
              className="whitespace-nowrap"
            >
              {geocoding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Find Location
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={useMyLocation}
              disabled={geolocating}
              variant="outline"
              className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
            >
              {geolocating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Navigation className="w-4 h-4 mr-2" />}
              Use My Location
            </Button>
            <button
              type="button"
              onClick={() => setShowManualInput(!showManualInput)}
              className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
            >
              Manual coordinates {showManualInput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {showManualInput && (
            <div className="flex flex-col sm:flex-row gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <Input
                placeholder="Latitude (e.g. 37.7749)"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                type="number"
                step="any"
                className="flex-1"
              />
              <Input
                placeholder="Longitude (e.g. -122.4194)"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                type="number"
                step="any"
                className="flex-1"
              />
              <Button onClick={applyManualCoords} variant="outline">
                Apply
              </Button>
            </div>
          )}

          {hasCoordinates && (
            <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
              <MapPin className="w-4 h-4" />
              Coordinates: {latitude!.toFixed(4)}, {longitude!.toFixed(4)}
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p>{error}</p>
                {rateLimited && !isPro && (
                  <Link
                    href="/pro"
                    className="inline-flex items-center gap-1 mt-2 text-emerald-700 font-medium hover:underline"
                  >
                    <Zap className="w-3 h-3" /> Upgrade to Pro for 30 lookups/day
                  </Link>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={analyze}
            disabled={!hasCoordinates || loading || proLoading}
            className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Sun className="w-5 h-5 mr-2" />
                Analyze Solar Potential
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Dashboard */}
      {results && (
        <div className="space-y-8">
          {/* Free Tier Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-slate-200 rounded-2xl shadow-sm">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Sun className="w-8 h-8 text-amber-500 mb-3" />
                <div className="text-sm text-slate-500 mb-1">Roof Usable Area</div>
                <div className="text-3xl font-bold text-slate-900">
                  {roofArea.toFixed(0)} <span className="text-base font-normal text-slate-500">m²</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 rounded-2xl shadow-sm">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <TrendingUp className="w-8 h-8 text-blue-500 mb-3" />
                <div className="text-sm text-slate-500 mb-1">Recommended Panels</div>
                <div className="text-3xl font-bold text-slate-900">
                  {panelCount} <span className="text-base font-normal text-slate-500">panels</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 rounded-2xl shadow-sm">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Zap className="w-8 h-8 text-emerald-500 mb-3" />
                <div className="text-sm text-slate-500 mb-1">Total Capacity</div>
                <div className="text-3xl font-bold text-slate-900">
                  {totalCapacityKw.toFixed(1)} <span className="text-base font-normal text-slate-500">kW</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 rounded-2xl shadow-sm">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Sun className="w-8 h-8 text-orange-500 mb-3" />
                <div className="text-sm text-slate-500 mb-1">Annual Production</div>
                <div className="text-3xl font-bold text-slate-900">
                  {annualEnergyKwh.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-base font-normal text-slate-500">kWh</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-500 rounded-2xl shadow-lg ring-4 ring-emerald-100 bg-emerald-50">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <DollarSign className="w-8 h-8 text-emerald-600 mb-3" />
                <div className="text-sm text-emerald-800 font-medium mb-1">Est. Annual Savings</div>
                <div className="text-3xl font-extrabold text-emerald-700">
                  ${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 rounded-2xl shadow-sm">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-500 mb-3" />
                <div className="text-sm text-slate-500 mb-1">Payback Period</div>
                <div className="text-3xl font-bold text-slate-900">
                  {paybackYears.toFixed(1)} <span className="text-base font-normal text-slate-500">years</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pro Tier Section */}
          <div className="relative">
            {!isPro && (
              <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3">
                <Lock className="w-10 h-10 text-slate-400" />
                <p className="text-lg font-semibold text-slate-700">Pro Feature</p>
                <p className="text-sm text-slate-500 text-center max-w-md">
                  Unlock detailed financial analysis, roof segments, CO2 offset, and monthly production estimates.
                </p>
                <Link href="/pro">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white mt-2">
                    <Zap className="w-4 h-4 mr-2" /> Upgrade to Pro
                  </Button>
                </Link>
              </div>
            )}

            <div className={!isPro ? 'blur-sm pointer-events-none select-none' : ''}>
              <div className="space-y-6">
                {/* Financial Analysis */}
                {results.solarPotential.financialAnalyses && results.solarPotential.financialAnalyses.length > 0 && (
                  <Card className="border-slate-200 rounded-2xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <DollarSign className="w-5 h-5 text-emerald-500" />
                        Financial Analysis
                        <Badge variant="secondary" className="ml-2">Pro</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {results.solarPotential.financialAnalyses[0]?.cashPurchaseSavings && (
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <h4 className="font-semibold text-slate-700 mb-2">Cash Purchase</h4>
                            <div className="space-y-1 text-sm">
                              <p className="text-slate-600">
                                Upfront: ${Number(results.solarPotential.financialAnalyses[0].cashPurchaseSavings.outOfPocketCost?.units ?? 0).toLocaleString()}
                              </p>
                              <p className="text-slate-600">
                                Payback: {results.solarPotential.financialAnalyses[0].cashPurchaseSavings.paybackYears?.toFixed(1) ?? 'N/A'} years
                              </p>
                              <p className="text-emerald-700 font-medium">
                                20yr Savings: ${Number(results.solarPotential.financialAnalyses[0].cashPurchaseSavings.savings?.savingsYear20?.units ?? 0).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}

                        {results.solarPotential.financialAnalyses[0]?.leasingSavings && (
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <h4 className="font-semibold text-slate-700 mb-2">Lease</h4>
                            <div className="space-y-1 text-sm">
                              <p className="text-slate-600">
                                Annual Cost: ${Number(results.solarPotential.financialAnalyses[0].leasingSavings.annualLeasingCost?.units ?? 0).toLocaleString()}
                              </p>
                              <p className="text-emerald-700 font-medium">
                                20yr Savings: ${Number(results.solarPotential.financialAnalyses[0].leasingSavings.savings?.savingsYear20?.units ?? 0).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}

                        {results.solarPotential.financialAnalyses[0]?.financedPurchaseSavings && (
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <h4 className="font-semibold text-slate-700 mb-2">Financed</h4>
                            <div className="space-y-1 text-sm">
                              <p className="text-slate-600">
                                Annual Payment: ${Number(results.solarPotential.financialAnalyses[0].financedPurchaseSavings.annualLoanPayment?.units ?? 0).toLocaleString()}
                              </p>
                              <p className="text-slate-600">
                                Interest Rate: {((results.solarPotential.financialAnalyses[0].financedPurchaseSavings.loanInterestRate ?? 0) * 100).toFixed(1)}%
                              </p>
                              <p className="text-emerald-700 font-medium">
                                20yr Savings: ${Number(results.solarPotential.financialAnalyses[0].financedPurchaseSavings.savings?.savingsYear20?.units ?? 0).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Roof Segments */}
                {results.solarPotential.roofSegmentStats && results.solarPotential.roofSegmentStats.length > 0 && (
                  <Card className="border-slate-200 rounded-2xl shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Sun className="w-5 h-5 text-amber-500" />
                        Roof Segments
                        <Badge variant="secondary" className="ml-2">Pro</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {results.solarPotential.roofSegmentStats.map((seg, i) => (
                          <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <div className="text-sm font-medium text-slate-700 mb-1">Segment {i + 1}</div>
                            <div className="space-y-0.5 text-xs text-slate-600">
                              <p>Pitch: {seg.pitchDegrees?.toFixed(1) ?? 'N/A'} degrees</p>
                              <p>Azimuth: {seg.azimuthDegrees?.toFixed(0) ?? 'N/A'} degrees</p>
                              <p>Area: {seg.stats?.areaMeters2?.toFixed(1) ?? 'N/A'} m²</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CO2 Offset & Monthly Production */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-slate-200 rounded-2xl shadow-sm">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Leaf className="w-8 h-8 text-green-500 mb-3" />
                      <div className="text-sm text-slate-500 mb-1">Annual CO2 Offset</div>
                      <div className="text-3xl font-bold text-green-700">
                        {co2OffsetKg.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-base font-normal text-slate-500">kg</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Based on 0.42 kg CO2/kWh US grid average</div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 rounded-2xl shadow-sm">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Zap className="w-8 h-8 text-yellow-500 mb-3" />
                      <div className="text-sm text-slate-500 mb-1">Monthly Production (avg)</div>
                      <div className="text-3xl font-bold text-slate-900">
                        {monthlyProduction.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-base font-normal text-slate-500">kWh</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-4 border-t border-slate-100">
            <p>Solar data provided by Google Solar API. Data &copy; Google</p>
            {remainingLookups !== null && (
              <p>{remainingLookups} lookups remaining today</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
