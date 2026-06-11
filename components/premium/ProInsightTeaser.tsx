'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProInsightTeaser() {
  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
      <CardContent className="py-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-500 font-medium mb-1">Did you know?</p>
            <p className="text-lg font-bold text-slate-900">
              Based on your activity, Pro users discover an average of{' '}
              <span className="text-emerald-600">23% more</span> savings opportunities.
            </p>

            {/* Blurred details area */}
            <div className="mt-4 relative">
              <div className="blur-sm select-none pointer-events-none opacity-60">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center border border-slate-100">
                    <p className="text-xs text-slate-500">Monthly Saved</p>
                    <p className="text-sm font-bold text-emerald-600">Rs 3,450</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-slate-100">
                    <p className="text-xs text-slate-500">Insights Found</p>
                    <p className="text-sm font-bold text-emerald-600">12</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-slate-100">
                    <p className="text-xs text-slate-500">Goals on Track</p>
                    <p className="text-sm font-bold text-emerald-600">4/5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/pricing">
                  Upgrade to Pro
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
