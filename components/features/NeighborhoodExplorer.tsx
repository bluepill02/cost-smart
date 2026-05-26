"use client";

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProStatus } from '@/lib/hooks/useProStatus';
import {
  MapPin, Lock, Loader2, Navigation, ChevronDown, ChevronUp, AlertCircle,
  GraduationCap, Heart, Trees, TrainFront, ShoppingCart, Star
} from 'lucide-react';
import Link from 'next/link';

interface PlaceResult {
  name: string;
  distance: number;
  rating?: number;
  userRatingCount?: number;
  formattedAddress?: string;
}

interface CategoryResult {
  category: string;
  places: PlaceResult[];
}

interface ExploreResponse {
  success: boolean;
  data: {
    categories: CategoryResult[];
    neighborhoodScore: number;
  };
  rateLimit: { limit: number; remaining: number };
}

const STORAGE_KEY = 'costsmart_neighborhood_lookups';

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

function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)}km away`;
  }
  return `${meters}m away`;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Schools':
      return <GraduationCap className="w-5 h-5 text-blue-500" />;
    case 'Hospitals/Clinics':
      return <Heart className="w-5 h-5 text-red-500" />;
    case 'Parks/Recreation':
      return <Trees className="w-5 h-5 text-green-500" />;
    case 'Transit Stations':
      return <TrainFront className="w-5 h-5 text-purple-500" />;
    case 'Grocery/Shopping':
      return <ShoppingCart className="w-5 h-5 text-orange-500" />;
    default:
      return <MapPin className="w-5 h-5 text-slate-500" />;
  }
}

function getScoreColor(score: number): string {
  if (score <= 40) return 'text-red-500';
  if (score <= 70) return 'text-amber-500';
  return 'text-emerald-500';
}

export default function NeighborhoodExplorer() {
  const { isPro, isLoading: proLoading, proEmail } = useProStatus();

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
  const [results, setResults] = useState<ExploreResponse | null>(null);
  const [remainingLookups, setRemainingLookups] = useState<number | null>(null);

  const geocodeAddress = useCallback(async () => {
    if (!address.trim()) return;
    setGeocoding(true);
    setError(null);
    try {
      // Try Nominatim first
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
        { headers: { 'User-Agent': 'CostSmart/1.0' } }
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setLatitude(parseFloat(data[0].lat));
        setLongitude(parseFloat(data[0].lon));
      } else {
        // Fall back to our geocode API
        const fallbackRes = await fetch('/api/neighborhood/geocode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, isPro, email: proEmail }),
        });
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (fallbackData.success) {
            setLatitude(fallbackData.data.latitude);
            setLongitude(fallbackData.data.longitude);
          } else {
            setError('Could not find coordinates for this address. Try a more specific address or use manual input.');
          }
        } else {
          setError('Could not find coordinates for this address. Try a more specific address or use manual input.');
        }
      }
    } catch {
      setError('Geocoding failed. Please try again or enter coordinates manually.');
    } finally {
      setGeocoding(false);
    }
  }, [address, isPro, proEmail]);

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

  const explore = useCallback(async () => {
    if (latitude === null || longitude === null) return;
    setLoading(true);
    setError(null);
    setRateLimited(false);
    setResults(null);

    try {
      const res = await fetch('/api/neighborhood/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude,
          longitude,
          isPro,
          email: proEmail,
        }),
      });

      if (res.status === 429) {
        setRateLimited(true);
        setError('Daily lookup limit reached.');
        return;
      }

      if (!res.ok) {
        setError('Something went wrong. Please try again.');
        return;
      }

      const json: ExploreResponse = await res.json();
      if (json.success && json.data) {
        setResults(json);
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
  }, [latitude, longitude, isPro, proEmail]);

  const hasCoordinates = latitude !== null && longitude !== null;

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
              Search Location
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
                    href="/pricing"
                    className="inline-flex items-center gap-1 mt-2 text-emerald-700 font-medium hover:underline"
                  >
                    Upgrade to Pro for more lookups
                  </Link>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={explore}
            disabled={!hasCoordinates || loading || proLoading}
            className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Exploring...
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5 mr-2" />
                Explore Neighborhood
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-8">
          {/* Neighborhood Score */}
          <Card className="border-slate-200 rounded-2xl shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <div className="text-sm text-slate-500 mb-2">Neighborhood Score</div>
              <div className={`text-6xl font-extrabold ${getScoreColor(results.data.neighborhoodScore)}`}>
                {results.data.neighborhoodScore}
                <span className="text-2xl font-normal text-slate-400">/100</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Based on nearby amenities across 5 categories
              </p>
            </CardContent>
          </Card>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.data.categories.map((category) => (
              <Card key={category.category} className="border-slate-200 rounded-2xl shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {getCategoryIcon(category.category)}
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {category.places.length === 0 ? (
                    <p className="text-sm text-slate-400">No places found nearby</p>
                  ) : (
                    <ul className="space-y-2">
                      {category.places.map((place, idx) => (
                        <li key={idx} className="text-sm">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-slate-700 font-medium">{place.name}</span>
                            <span className="text-slate-400 text-xs whitespace-nowrap">
                              {formatDistance(place.distance)}
                            </span>
                          </div>
                          {isPro && place.rating !== undefined && (
                            <div className="flex items-center gap-2 mt-0.5">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              <span className="text-xs text-slate-500">
                                {place.rating.toFixed(1)}
                                {place.userRatingCount !== undefined && (
                                  <span className="ml-1">({place.userRatingCount} reviews)</span>
                                )}
                              </span>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pro Section with Blur Overlay */}
          <div className="relative">
            {!isPro && (
              <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3">
                <Lock className="w-10 h-10 text-slate-400" />
                <p className="text-lg font-semibold text-slate-700">Pro Feature</p>
                <p className="text-sm text-slate-500 text-center max-w-md">
                  Unlock full results with ratings, review counts, and detailed place information for all categories.
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
                {/* Google Maps Embed */}
                <Card className="border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                      Interactive Map View
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}&zoom=14`}
                      className="w-full aspect-video rounded-xl border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Neighborhood Map"
                    />
                  </CardContent>
                </Card>

                {/* Extended Results Note */}
                <Card className="border-slate-200 rounded-2xl shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600">
                      Pro users get access to full place details including ratings, review counts, 
                      addresses, and up to 5 results per category for a comprehensive neighborhood analysis.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Attribution & Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-4 border-t border-slate-100">
            <p>Map and place data provided by Google Maps Platform</p>
            {remainingLookups !== null && (
              <p>{remainingLookups} lookups remaining today</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
