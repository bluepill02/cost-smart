'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, Target, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProFeatureWrapper from '@/components/premium/ProFeatureWrapper';

const spendingData = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 3800 },
  { month: 'Mar', amount: 4500 },
  { month: 'Apr', amount: 3600 },
  { month: 'May', amount: 4100 },
  { month: 'Jun', amount: 3400 },
];

const categoryData = [
  { name: 'Housing', value: 35 },
  { name: 'Food', value: 20 },
  { name: 'Transport', value: 15 },
  { name: 'Utilities', value: 12 },
  { name: 'Entertainment', value: 10 },
  { name: 'Other', value: 8 },
];

const COLORS = ['#10b981', '#059669', '#047857', '#065f46', '#34d399', '#6ee7b7'];

const savingsGoals = [
  { name: 'Emergency Fund', progress: 72 },
  { name: 'Vacation Savings', progress: 45 },
  { name: 'Home Down Payment', progress: 28 },
];

const aiInsights = [
  'Your grocery spending decreased 12% this month - great progress toward your savings goal.',
  'Consider switching your energy plan. Based on your usage, you could save Rs 1,200/month.',
  'Your subscription costs are 23% above the average for your income bracket.',
  'Setting up auto-transfers on payday could boost your savings rate by 15%.',
];

export default function ProAnalyticsPreview() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Unlock Advanced Insights</h2>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
          Get deeper visibility into your finances with Pro analytics. Track spending patterns,
          set savings goals, and receive AI-powered recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Spending Trends */}
        <ProFeatureWrapper featureName="advanced-analytics">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Monthly Spending Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </ProFeatureWrapper>

        {/* Category Breakdown */}
        <ProFeatureWrapper featureName="advanced-analytics">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-emerald-600" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2">
                {categoryData.slice(0, 4).map((item, index) => (
                  <span key={item.name} className="text-xs text-slate-600 flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    {item.name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </ProFeatureWrapper>

        {/* Savings Goal Tracker */}
        <ProFeatureWrapper featureName="advanced-analytics">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Savings Goal Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savingsGoals.map((goal) => (
                  <div key={goal.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 font-medium">{goal.name}</span>
                      <span className="text-emerald-600 font-semibold">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div
                        className="bg-emerald-500 h-2.5 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ProFeatureWrapper>

        {/* AI-Powered Insights */}
        <ProFeatureWrapper featureName="advanced-analytics">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-slate-700 bg-emerald-50 rounded-lg p-2.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ProFeatureWrapper>
      </div>
    </div>
  );
}
