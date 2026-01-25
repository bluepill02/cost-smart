"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatters';
import { INDIAN_STATES_STAMP_DUTY } from '@/lib/pseo-data/stamp-duty';
import ShareButton from '@/components/features/ShareButton';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function PropertyRegistrationCalculator() {
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [selectedStateSlug, setSelectedStateSlug] = useState<string>('maharashtra');
  const [gender, setGender] = useState<'male' | 'female' | 'joint'>('male');

  const stateData = useMemo(() =>
    INDIAN_STATES_STAMP_DUTY.find(s => s.slug === selectedStateSlug) || INDIAN_STATES_STAMP_DUTY[0],
  [selectedStateSlug]);

  const results = useMemo(() => {
    let stampRate = stateData.stampDutyRate;
    let regRate = stateData.registrationRate;

    // Apply gender concessions if any
    if (gender === 'female') {
      stampRate = Math.max(0, stampRate - stateData.femaleConcession);
    } else if (gender === 'joint' && stateData.femaleConcession > 0) {
      // Often joint ownership gets half the concession, but for simplicity in this MVP we'll apply full or half based on common norms.
      // Let's assume average concession for joint.
      stampRate = Math.max(0, stampRate - (stateData.femaleConcession / 2));
    }

    const stampAmount = (propertyValue * stampRate) / 100;
    const regAmount = (propertyValue * regRate) / 100;
    const total = stampAmount + regAmount;

    return { stampRate, regRate, stampAmount, regAmount, total };
  }, [propertyValue, stateData, gender]);

  return (
    <Card className="w-full bg-white shadow-xl rounded-2xl overflow-hidden border-slate-100">
      <CardHeader className="bg-indigo-600 text-white p-6">
        <CardTitle className="text-2xl font-bold">Registration Fee Calculator</CardTitle>
        <CardDescription className="text-indigo-100">
          State-wise breakdown of Stamp Duty & Registration Charges
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select value={selectedStateSlug} onValueChange={setSelectedStateSlug}>
              <SelectTrigger id="state">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES_STAMP_DUTY.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>{s.state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500">{stateData.description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property-value">Property Market Value</Label>
            <Input
              id="property-value"
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Owner Gender</Label>
            <Select value={gender} onValueChange={(val: any) => setGender(val)}>
              <SelectTrigger id="gender">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="joint">Joint (Male + Female)</SelectItem>
              </SelectContent>
            </Select>
            {stateData.femaleConcession > 0 && (
              <p className="text-xs text-emerald-600 font-medium">
                * {stateData.state} offers a concession for female owners!
              </p>
            )}
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100">
              <div className="flex items-center gap-2">
                 <span className="text-slate-600">Stamp Duty ({results.stampRate}%)</span>
                 <TooltipProvider>
                   <Tooltip>
                     <TooltipTrigger><Info size={14} className="text-slate-400" /></TooltipTrigger>
                     <TooltipContent>Tax levied on property transactions.</TooltipContent>
                   </Tooltip>
                 </TooltipProvider>
              </div>
              <span className="font-semibold">{formatCurrency(results.stampAmount)}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-emerald-100 shadow-sm ring-1 ring-emerald-500/20">
              <div className="flex items-center gap-2">
                 <span className="text-emerald-800 font-medium">Registration Fee ({results.regRate}%)</span>
                 <TooltipProvider>
                   <Tooltip>
                     <TooltipTrigger><Info size={14} className="text-emerald-400" /></TooltipTrigger>
                     <TooltipContent>Fee for recording the deed in government records.</TooltipContent>
                   </Tooltip>
                 </TooltipProvider>
              </div>
              <span className="font-bold text-emerald-700">{formatCurrency(results.regAmount)}</span>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-2">
               <div className="flex justify-between items-end">
                 <span className="text-lg font-bold text-slate-800">Total Charges</span>
                 <span className="text-2xl font-bold text-indigo-600">{formatCurrency(results.total)}</span>
               </div>
            </div>
          </div>

          <div className="mt-8">
            <ShareButton
               title="Property Charges Estimate"
               text={`Registration charges in ${stateData.state} are approx ${formatCurrency(results.total)}.`}
               url="https://costsmart.app/in/property-registration-cost-calculator"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
