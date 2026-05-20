"use client";

import React, { useState } from 'react';
import { Sparkles, Loader2, Lock, ShieldCheck, Gift, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCalculatorInsights } from '@/lib/use-calculator-features';
import AdContainer from '@/components/ads/AdContainer';
import { trackEvent } from '@/lib/gtag';

interface PremiumAIAdvisorProps {
  calculatorType: 'loan-calculator' | 'investment-calculator' | 'tax-calculator' | 'salary-calculator';
  values: Record<string, number | string>;
  result: Record<string, any>;
  currency?: string;
  locale?: string;
}

export default function PremiumAIAdvisor({
  calculatorType,
  values,
  result,
  currency = 'USD',
  locale = 'en-US'
}: PremiumAIAdvisorProps) {
  const { insights, loading, error, getInsights } = useCalculatorInsights({ calculatorType });
  const [unlocked, setUnlocked] = useState(false);
  const [credits, setCredits] = useState(1); // 1 free credit initially

  const handleGenerate = async () => {
    if (credits <= 0 && !unlocked) {
      trackEvent({ action: 'generate_premium_report_blocked', category: 'PremiumAI', label: calculatorType });
      return;
    }
    
    trackEvent({ action: 'generate_premium_report_start', category: 'PremiumAI', label: calculatorType });
    const data = await getInsights(values, result);
    if (data) {
      if (credits > 0) {
        setCredits(prev => prev - 1);
        trackEvent({ action: 'deduct_credit', category: 'PremiumAI', label: calculatorType });
      }
      setUnlocked(true);
      trackEvent({ action: 'generate_premium_report_success', category: 'PremiumAI', label: calculatorType });
    } else {
      trackEvent({ action: 'generate_premium_report_failed', category: 'PremiumAI', label: calculatorType });
    }
  };

  const handleAdUnlock = () => {
    trackEvent({ action: 'click_sponsored_link_recharge', category: 'PremiumAI', label: calculatorType });
    // Simulate ad click/unlock behavior that triggers monetization
    setLoadingSimulated(true);
    setTimeout(() => {
      setLoadingSimulated(false);
      setCredits(1);
      setUnlocked(false);
      trackEvent({ action: 'sponsored_link_recharge_success', category: 'PremiumAI', label: calculatorType });
    }, 1500);
  };

  const [loadingSimulated, setLoadingSimulated] = useState(false);

  return (
    <Card className="border-2 border-transparent bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 relative overflow-hidden shadow-lg rounded-2xl p-[1px] before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500 before:rounded-2xl before:-z-10 mt-6">
      <div className="bg-white dark:bg-slate-900 rounded-[15px] p-6 h-full">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1.5 rounded-lg text-white">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                  AI Financial Co-Pilot
                </CardTitle>
                <CardDescription className="text-xs">
                  Premium tax planning & interest optimization report
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
              <Gift className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                {credits > 0 ? `${credits} Free Audit` : '0 Audits Left'}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          {!unlocked ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Unlock professional scenarios to minimize interest load, accelerate retirement goals, or harvest up to 30% tax savings using our advanced GPT-4 financial logic.
              </p>

              {credits > 0 ? (
                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-5 rounded-xl transition duration-300 shadow-md shadow-indigo-500/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Consulting Expert Models...
                    </>
                  ) : (
                    'Generate Premium AI Audit (Free)'
                  )}
                </Button>
              ) : (
                <div className="space-y-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/50 rounded-xl p-4">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">AI Credits Exhausted</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Support this free calculator by unlocking 1 new premium credit instantly.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      onClick={handleAdUnlock}
                      disabled={loadingSimulated}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs py-4 rounded-lg font-semibold"
                    >
                      {loadingSimulated ? (
                        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      ) : (
                        'Unlock with Sponsored Link'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
              {/* Premium Top Sponsor Placement */}
              <div className="border border-slate-100 rounded-lg p-2 dark:border-slate-800">
                <AdContainer slotId="5012879463" size="leaderboard" />
              </div>

              {/* Diagnosis section */}
              <div className="bg-indigo-50/30 dark:bg-indigo-950/10 border-l-4 border-indigo-500 p-4 rounded-r-xl">
                <h4 className="font-bold text-sm text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5 mb-1.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />
                  Strategic Financial Diagnosis
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {insights?.diagnosis}
                </p>
              </div>

              {/* Optimization section */}
              <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                <h4 className="font-bold text-sm text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5 mb-1.5">
                  📈 Compound Optimization Path
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {insights?.optimization}
                </p>
              </div>

              {/* Actionable tips section */}
              <div className="bg-purple-50/30 dark:bg-purple-950/10 border-l-4 border-purple-500 p-4 rounded-r-xl">
                <h4 className="font-bold text-sm text-purple-950 dark:text-purple-300 flex items-center gap-1.5 mb-1.5">
                  💡 Tax Deductions & Wealth Actions
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {insights?.actionableTips}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Real-time GPT-4 Financial Audit
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setUnlocked(false);
                    trackEvent({ action: 'reset_scenario', category: 'PremiumAI', label: calculatorType });
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  <RefreshCw className="w-3 h-3 mr-1" /> Reset Scenario
                </Button>
              </div>

              {/* Premium Bottom Sponsor Placement */}
              <div className="border border-slate-100 rounded-lg p-2 dark:border-slate-800">
                <AdContainer slotId="7084920153" size="square" />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl p-3 flex items-start gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold">Error loading AI report:</span> {error}. Falling back to default insights.
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
