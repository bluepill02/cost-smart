import React from 'react';
import {  Sun, BatteryCharging, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SubsidyResult } from '@/lib/subsidy-engine';

interface SolarData {
    city_name: string;
    country: string;
    avg_daily_sunlight_hours: number;
    avg_electricity_cost_per_kwh: number;
}

interface PrintSolarReportProps {
    cityData: SolarData;
    systemSize: number;
    savings20Year: number;
    paybackPeriod: number;
    monthlyBill: number;
    subsidy?: SubsidyResult;
}

export default function PrintSolarReport({ cityData, systemSize, savings20Year, paybackPeriod, monthlyBill, subsidy }: PrintSolarReportProps) {
    const currency = cityData.country === 'India' ? '₹' : '$';
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="hidden print:block print:bg-white p-8 max-w-[210mm] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Solar Potential Report</h1>
                    <p className="text-slate-500 mt-1">Prepared for property in <span className="font-semibold text-emerald-700">{cityData.city_name}</span></p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600 flex items-center justify-end gap-2">
                        <Sun className="w-6 h-6" /> CostSmart
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{date}</p>
                </div>
            </div>

            {/* Executive Summary */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-3">Executive Summary</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-4 rounded border border-slate-100">
                        <div className="text-sm text-slate-500 mb-1">Recommended System</div>
                        <div className="text-2xl font-bold text-slate-900">{systemSize.toFixed(1)} kW</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded border border-slate-100">
                        <div className="text-sm text-slate-500 mb-1">Payback Period</div>
                        <div className="text-2xl font-bold text-slate-900">{paybackPeriod.toFixed(1)} Years</div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded border border-emerald-100">
                        <div className="text-sm text-emerald-800 mb-1">20-Year Savings</div>
                        <div className="text-2xl font-bold text-emerald-700">{currency}{savings20Year.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>
                </div>
            </div>

            {/* Detailed Analysis */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-3">Input Parameters</h2>
                <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-slate-100">
                        <tr className="py-2">
                            <td className="py-2 text-slate-500">Current Monthly Bill</td>
                            <td className="py-2 font-medium">{currency}{monthlyBill}</td>
                        </tr>
                        <tr className="py-2">
                            <td className="py-2 text-slate-500">Electricity Rate</td>
                            <td className="py-2 font-medium">{currency}{cityData.avg_electricity_cost_per_kwh}/kWh</td>
                        </tr>
                        <tr className="py-2">
                            <td className="py-2 text-slate-500">Daily Peak Sun Hours</td>
                            <td className="py-2 font-medium">{cityData.avg_daily_sunlight_hours} hours</td>
                        </tr>
                        <tr className="py-2">
                            <td className="py-2 text-slate-500">Location</td>
                            <td className="py-2 font-medium">{cityData.city_name}, {cityData.country}</td>
                        </tr>
                        {subsidy && subsidy.subsidyAmount > 0 && (
                            <tr className="py-2 bg-emerald-50/50">
                                <td className="py-2 pl-2 text-emerald-800 font-medium">Govt. Subsidy Eligible</td>
                                <td className="py-2 font-bold text-emerald-700">
                                    {currency}{subsidy.subsidyAmount.toLocaleString()}
                                    <span className="block text-[10px] font-normal text-emerald-600">{subsidy.schemeName}</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Projection Note */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm text-slate-600 mb-8">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <BatteryCharging className="w-4 h-4" />
                    Why Solar Works Here
                </h3>
                <p className="leading-relaxed">
                    {cityData.city_name} receives an average of <strong>{cityData.avg_daily_sunlight_hours} hours</strong> of sunlight per day.
                    With current electricity rates at {currency}{cityData.avg_electricity_cost_per_kwh}/kWh,
                    switching to solar replaces a permanent rental cost (utility bill) with a temporary investment cost (solar system).
                    After the {paybackPeriod.toFixed(1)}-year payback period, your energy production is essentially free.
                </p>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
                <p>Generated by CostSmart Solar Calculator. Estimates are based on average irradiance data and standard installation costs.</p>
                <p className="mt-1">Visit https://costsmart.app for live updates.</p>
            </div>
        </div>
    );
}
