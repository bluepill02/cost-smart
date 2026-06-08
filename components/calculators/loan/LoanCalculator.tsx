"use client";

import dynamic from 'next/dynamic';
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calculator, TrendingDown, PiggyBank, Save, Printer, Share2, Check as CheckIcon } from 'lucide-react';
import { buildShareableURL } from '@/lib/shareable-url';
import AdContainer from '@/components/ads/AdContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { saveHistoryItem } from '@/lib/history-manager';
import { formatCurrency } from '@/lib/formatters';
import SmartInsight from '@/components/calculators/SmartInsight';
import PremiumAIAdvisor from '@/components/calculators/PremiumAIAdvisor';

// Lazy load Recharts components
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const RechartsTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });

interface LoanCalculatorProps {
    currency?: string;
    locale?: string;
    defaultPrincipal?: number;
    defaultRate?: number;
    maxPrincipal?: number;
}

export default function LoanCalculator({
    currency = 'USD',
    locale = 'en-US',
    defaultPrincipal = 250000,
    defaultRate = 6.5,
    maxPrincipal = 1000000
}: LoanCalculatorProps) {
    // If currency is INR, assume different default if not provided, but parent component usually controls this.
    // However, default props above are already US-centric ($250k, 6.5%).
    const [principal, setPrincipal] = useState<number>(defaultPrincipal);
    const [rate, setRate] = useState<number>(defaultRate);
    const [years, setYears] = useState<number>(30);
    const [extraPayment, setExtraPayment] = useState<number>(0);
    const [purpose, setPurpose] = useState('');

    const searchParams = useSearchParams();
    const [shareState, setShareState] = useState<'idle' | 'copied'>('idle');

    React.useEffect(() => {
      const p = searchParams.get('principal');
      const r = searchParams.get('rate');
      const y = searchParams.get('years');
      const e = searchParams.get('extra');
      if (p) {
        const v = parseFloat(p);
        if (isFinite(v) && v >= 100 && v <= 100000000) setPrincipal(v);
      }
      if (r) {
        const v = parseFloat(r);
        if (isFinite(v) && v >= 0.1 && v <= 30) setRate(v);
      }
      if (y) {
        const v = parseInt(y, 10);
        if (isFinite(v) && v >= 1 && v <= 50) setYears(v);
      }
      if (e) {
        const v = parseFloat(e);
        if (isFinite(v) && v >= 0 && v <= 1000000) setExtraPayment(v);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleShare = async () => {
      const url = buildShareableURL(window.location.pathname, {
        principal,
        rate,
        years,
        extra: extraPayment,
      });
      try {
        await navigator.clipboard.writeText(url);
        setShareState('copied');
        setTimeout(() => setShareState('idle'), 2500);
      } catch {}
    };

    const calculation = useMemo(() => {
        const r = rate / 100 / 12;
        const n = years * 12;

        // Standard EMI
        const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPaymentStandard = emi * n;
        const totalInterestStandard = totalPaymentStandard - principal;

        // With Extra Payment
        let balance = principal;
        let monthsWithExtra = 0;
        let totalInterestWithExtra = 0;

        while (balance > 0 && monthsWithExtra < n * 2) { // Safety break
            const interestForMonth = balance * r;
            const principalForMonth = (emi + extraPayment) - interestForMonth;

            totalInterestWithExtra += interestForMonth;
            balance -= principalForMonth;
            monthsWithExtra++;

            if (balance < 0) {
                 // Adjust last payment
                 // (Simplified for estimation)
            }
        }

        const totalPaymentWithExtra = principal + totalInterestWithExtra;
        const savings = totalInterestStandard - totalInterestWithExtra;
        const timeSavedMonths = n - monthsWithExtra;

        return {
            emi,
            totalPaymentStandard,
            totalInterestStandard,
            totalInterestWithExtra,
            totalPaymentWithExtra,
            savings,
            monthsWithExtra,
            timeSavedMonths
        };
    }, [principal, rate, years, extraPayment]);

    const chartData = [
        { name: 'Principal', value: principal, color: '#10b981' }, // emerald-500
        { name: 'Interest', value: calculation.totalInterestWithExtra, color: '#f59e0b' }, // amber-500
    ];

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        saveHistoryItem({
            type: 'loan',
            title: `Loan: ${formatCurrency(principal, currency, locale)}`,
            summary: `${years}yr Term @ ${rate}% | Monthly: ${formatCurrency(calculation.emi + extraPayment, currency, locale)}`,
            link: `/loan-calculator?p=${principal}&r=${rate}&y=${years}&e=${extraPayment}` // In future, handle URL params
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <>
        <div className="grid lg:grid-cols-2 gap-8 print:hidden">
            {/* Inputs */}
            <Card className="border-slate-200 shadow-md h-fit">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-emerald-600" />
                        Loan Parameters
                    </CardTitle>
                    <CardDescription>Adjust the values to see how interest accumulates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="principal">Loan Amount ({currency === 'USD' ? '$' : (currency === 'INR' ? '₹' : currency)})</Label>
                            <Input
                                id="principal"
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(Number(e.target.value))}
                                className="text-lg font-bold"
                            />
                            <Slider
                                value={[principal]}
                                min={1000}
                                max={maxPrincipal}
                                step={1000}
                                onValueChange={(v) => setPrincipal(v[0])}
                                className="pt-2"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="rate">Interest Rate (%)</Label>
                                <Input
                                    id="rate"
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    step="0.1"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="years">Term (Years)</Label>
                                <Input
                                    id="years"
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="purpose">Loan Purpose (Optional)</Label>
                            <Input
                                id="purpose"
                                placeholder="e.g. Buying a new car, Home renovation..."
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                            />
                        </div>

                        <SmartInsight
                            type="loan"
                            amount={principal}
                            purpose={purpose}
                            metrics={{ rate, term: years, emi: calculation.emi }}
                        />

                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="extra" className="text-emerald-700 font-semibold flex items-center gap-2">
                                    <TrendingDown className="w-4 h-4" />
                                    Pay Extra Monthly?
                                </Label>
                                <span className="text-sm font-bold text-emerald-600">+{formatCurrency(extraPayment, currency, locale)}</span>
                            </div>
                            <Slider
                                value={[extraPayment]}
                                min={0}
                                max={principal * 0.05} // Cap at 5% of principal
                                step={50}
                                onValueChange={(v) => setExtraPayment(v[0])}
                            />
                            <p className="text-xs text-slate-500">
                                Paying even a little extra directly reduces your principal, slashing total interest.
                            </p>
                        </div>
                    </div>

                </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">

                <div className="flex justify-end gap-2">
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSave}
                        className={saved ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}
                     >
                        {saved ? "Saved to Dashboard" : <><Save size={16} className="mr-2"/> Save Scenario</>}
                     </Button>
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.print()}
                        className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
                     >
                        <Printer size={16} className="mr-2" /> Print Report
                     </Button>
                     <button
                       onClick={handleShare}
                       className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 border border-slate-200 hover:border-emerald-300 rounded-xl px-3 py-1.5 transition-all hover:bg-emerald-50"
                     >
                       {shareState === 'copied' ? (
                         <><CheckIcon className="w-4 h-4 text-emerald-600" /><span className="text-emerald-600">Link Copied!</span></>
                       ) : (
                         <><Share2 className="w-4 h-4" />Share Calculation</>
                       )}
                     </button>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-slate-900 text-white border-none">
                        <CardContent className="p-6">
                            <div className="text-slate-400 text-sm font-medium mb-1">Monthly Payment</div>
                            <div className="text-3xl font-bold">
                                {formatCurrency(calculation.emi + extraPayment, currency, locale)}
                            </div>
                            {extraPayment > 0 && (
                                <div className="text-xs text-emerald-400 mt-1">
                                    (Base: {formatCurrency(calculation.emi, currency, locale)} + Extra: {formatCurrency(extraPayment, currency, locale)})
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="bg-emerald-50 border-emerald-100">
                        <CardContent className="p-6">
                            <div className="text-emerald-800 text-sm font-medium mb-1">Total Interest</div>
                            <div className="text-3xl font-bold text-emerald-700">
                                {formatCurrency(calculation.totalInterestWithExtra, currency, locale)}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Dynamically placed in-content ad slot */}
                <div className="my-4 print:hidden">
                    <AdContainer slotId="4057982103" size="square" />
                </div>

                {/* Savings Highlight */}
                {extraPayment > 0 && calculation.savings > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4 animate-in fade-in zoom-in duration-300">
                        <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                            <PiggyBank size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-amber-900">Smart Move!</h4>
                            <p className="text-amber-800 text-sm mt-1">
                                By paying <strong>{formatCurrency(extraPayment, currency, locale)}</strong> extra per month, you will save <strong className="text-emerald-700">{formatCurrency(calculation.savings, currency, locale)}</strong> in interest and be debt-free <strong>{(calculation.timeSavedMonths / 12).toFixed(1)} years</strong> earlier.
                            </p>
                        </div>
                    </div>
                )}

                {/* Breakdown Chart */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Total Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <RechartsTooltip formatter={(value: any) => formatCurrency(Number(value), currency, locale)} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Premium AI Advisor with Monetized Placements */}
                <PremiumAIAdvisor
                    calculatorType="loan-calculator"
                    values={{ principal, rate, years, extraPayment, purpose }}
                    result={{
                        emi: calculation.emi,
                        totalInterest: calculation.totalInterestWithExtra,
                        totalPayment: calculation.totalPaymentWithExtra,
                        savings: calculation.savings,
                        timeSavedMonths: calculation.timeSavedMonths
                    }}
                    currency={currency}
                    locale={locale}
                />

            </div>
        </div>

        {/* Print-friendly report layout */}
        <div className="hidden print:block print:bg-white p-8 max-w-[210mm] mx-auto text-slate-900 font-sans">
             <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
                 <div>
                     <h1 className="text-3xl font-bold text-slate-900">True Cost Loan Report</h1>
                     <p className="text-slate-500 mt-1">CostSmart Calculator Hub</p>
                 </div>
                 <div className="text-right">
                     <div className="text-2xl font-bold text-emerald-600">CostSmart</div>
                     <p className="text-sm text-slate-400 mt-1">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                 </div>
             </div>

             <div className="mb-8">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-3">Executive Summary</h2>
                 <div className="grid grid-cols-3 gap-6">
                     <div className="bg-slate-50 p-4 rounded border border-slate-100">
                         <div className="text-xs text-slate-500 mb-1">Loan Principal</div>
                         <div className="text-xl font-bold text-slate-900">{formatCurrency(principal, currency, locale)}</div>
                     </div>
                     <div className="bg-slate-50 p-4 rounded border border-slate-100">
                         <div className="text-xs text-slate-500 mb-1">Interest Rate</div>
                         <div className="text-xl font-bold text-slate-900">{rate}%</div>
                     </div>
                     <div className="bg-emerald-50 p-4 rounded border border-emerald-100">
                         <div className="text-xs text-emerald-800 mb-1">Monthly EMI</div>
                         <div className="text-xl font-bold text-emerald-700">{formatCurrency(calculation.emi + extraPayment, currency, locale)}</div>
                     </div>
                 </div>
             </div>

             <div className="mb-8">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-3">Detailed Financial Breakdown</h2>
                 <table className="w-full text-sm text-left border-collapse">
                     <thead>
                         <tr className="border-b border-slate-200 bg-slate-50">
                             <th className="py-2 px-3 font-semibold text-slate-600">Metric</th>
                             <th className="py-2 px-3 font-semibold text-slate-600 text-right">Value</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         <tr>
                             <td className="py-3 px-3 text-slate-500">Base Monthly EMI</td>
                             <td className="py-3 px-3 font-medium text-right">{formatCurrency(calculation.emi, currency, locale)}</td>
                         </tr>
                         {extraPayment > 0 && (
                             <tr className="bg-emerald-50/30">
                                 <td className="py-3 px-3 text-emerald-700 font-semibold">Extra Monthly Payment</td>
                                 <td className="py-3 px-3 font-bold text-emerald-700 text-right">+{formatCurrency(extraPayment, currency, locale)}</td>
                             </tr>
                         )}
                         <tr>
                             <td className="py-3 px-3 text-slate-500">Total Interest Payable</td>
                             <td className="py-3 px-3 font-medium text-right">{formatCurrency(calculation.totalInterestWithExtra, currency, locale)}</td>
                         </tr>
                         <tr>
                             <td className="py-3 px-3 text-slate-500">Total Payment (Principal + Interest)</td>
                             <td className="py-3 px-3 font-semibold text-right">{formatCurrency(calculation.totalPaymentWithExtra, currency, locale)}</td>
                         </tr>
                         {extraPayment > 0 && (
                             <tr className="bg-amber-50/50 font-medium">
                                 <td className="py-3 px-3 text-amber-800 font-semibold">Total Savings Realised</td>
                                 <td className="py-3 px-3 text-emerald-700 font-bold text-right">{formatCurrency(calculation.savings, currency, locale)}</td>
                             </tr>
                         )}
                         {extraPayment > 0 && (
                             <tr className="bg-amber-50/50 font-medium">
                                 <td className="py-3 px-3 text-amber-800 font-semibold">Time Saved</td>
                                 <td className="py-3 px-3 text-slate-900 font-bold text-right">{(calculation.timeSavedMonths / 12).toFixed(1)} Years Earlier</td>
                             </tr>
                         )}
                     </tbody>
                 </table>
             </div>

             <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm text-slate-600 mb-8">
                 <h3 className="font-bold text-slate-800 mb-2">Smart Insights</h3>
                 <p className="leading-relaxed">
                     {extraPayment > 0 ? (
                         `Making extra payments of ${formatCurrency(extraPayment, currency, locale)} per month directly targets your outstanding principal. This reduces the base amount on which compounding interest is calculated. As a result, you save ${formatCurrency(calculation.savings, currency, locale)} over the course of the loan and retire your debt ${(calculation.timeSavedMonths / 12).toFixed(1)} years sooner.`
                     ) : (
                         "Interest accumulates over the life of your loan. By adding even a small extra monthly payment (e.g., $50-$100) directed straight to the principal, you can significantly compress your payment term and save thousands in compound interest charges."
                     )}
                 </p>
             </div>

             <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
                 <p>Generated by CostSmart Loan Calculator. Estimates are based on standard amortization formulas.</p>
                 <p className="mt-1">Visit https://cost-smart-five.vercel.app for live updates.</p>
             </div>
        </div>
        </>
    );
}
