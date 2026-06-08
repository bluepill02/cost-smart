'use client';

import { useState } from 'react';
import { HeartPulse, Loader2, Lock, Sparkles, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AnalysisData {
  score: number;
  sentiment: string;
  confidenceScores: { positive: number; neutral: number; negative: number } | null;
  keyPhrases: string[];
  positiveIndicators: string[];
  negativeIndicators: string[];
  recommendations: string[];
}

function getScoreColor(score: number): string {
  if (score >= 70) return '#10b981'; // green
  if (score >= 40) return '#f59e0b'; // yellow/amber
  return '#ef4444'; // red
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 30) return 'Needs Attention';
  return 'Critical';
}

function ScoreGauge({ score, animated }: { score: number; animated: boolean }) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const circumference = 2 * Math.PI * 60;
  const progress = animated ? (score / 100) * circumference : 0;
  const offset = circumference - progress;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="w-40 h-40 -rotate-90" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>{score}</span>
          <span className="text-xs text-gray-500">/ 100</span>
        </div>
      </div>
      <Badge
        className="mt-2"
        style={{ backgroundColor: color, color: 'white', border: 'none' }}
      >
        {label}
      </Badge>
    </div>
  );
}

function SentimentChart({ confidenceScores }: { confidenceScores: { positive: number; neutral: number; negative: number } }) {
  const data = [
    { name: 'Positive', value: Math.round(confidenceScores.positive * 100), color: '#10b981' },
    { name: 'Neutral', value: Math.round(confidenceScores.neutral * 100), color: '#6b7280' },
    { name: 'Negative', value: Math.round(confidenceScores.negative * 100), color: '#ef4444' },
  ];

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const SAMPLE_TEXTS = [
  {
    label: 'Healthy Portfolio',
    text: 'My SIP investments have grown 15% this year. Emergency fund covers 6 months of expenses. No outstanding debt. Monthly savings rate is 35% of income. Retirement corpus is on track with diversified mutual funds and PPF contributions.',
  },
  {
    label: 'Stress Indicators',
    text: 'Credit card overdue for 3 months. Minimum payment only. Two personal loans with high interest rates. Insufficient funds alert from bank. Late fee charges on electricity bill. Overdraft facility used frequently. No savings this quarter.',
  },
  {
    label: 'Mixed Signals',
    text: 'Salary increment of 12% received but EMI commitments take 45% of income. Started a new SIP of 5000 per month. Credit card outstanding balance cleared. Still have a personal loan of 3 lakh at 14% interest. Planning to build an emergency fund.',
  },
];

export default function FinancialHealthAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisData | null>(null);
  const [animated, setAnimated] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setAnimated(false);
    setUpgradeMessage(null);

    try {
      // Get subscription info from localStorage
      const subscriptionId = typeof window !== 'undefined' ? localStorage.getItem('subscriptionId') : null;
      const userIsPro = !!subscriptionId;

      const res = await fetch('/api/azure/financial-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          isPro: userIsPro,
          subscriptionId: subscriptionId || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Analysis failed. Please try again.');
        return;
      }

      setResult(data.data);
      setUpgradeMessage(data.upgradeMessage || null);

      // Trigger animation after a short delay
      setTimeout(() => setAnimated(true), 100);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (text: string) => {
    setInputText(text);
    setResult(null);
    setError(null);
    setUpgradeMessage(null);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Input Card */}
      <Card className="border-rose-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-600" />
            Financial Health Analyzer
            <Badge variant="outline" className="ml-2 text-xs">
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Describe your financial situation
            </label>
            <textarea
              className="w-full h-36 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
              placeholder="Paste bank statement descriptions, financial goals, spending patterns, or any financial notes. The AI will analyze sentiment and extract key financial indicators..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={5000}
            />
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500">
                Include details about savings, debts, investments, and spending habits for accurate analysis
              </p>
              <span className="text-xs text-gray-400">
                {inputText.length}/5000
              </span>
            </div>
          </div>

          {/* Sample Texts */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Try a sample:</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_TEXTS.map((sample) => (
                <button
                  key={sample.label}
                  onClick={() => handleSampleClick(sample.text)}
                  className="text-xs px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full border border-rose-200 hover:bg-rose-100 transition-colors"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={loading || !inputText.trim()}
            className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <HeartPulse className="w-4 h-4" />
            )}
            Analyze Financial Health
          </Button>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <>
          {/* Score Card */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-center">Your Financial Health Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ScoreGauge score={result.score} animated={animated} />
              <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
                {result.score >= 70
                  ? 'Your financial indicators suggest a healthy financial position. Keep up the good habits!'
                  : result.score >= 40
                    ? 'Your finances show mixed signals. There are areas that could benefit from attention.'
                    : 'Your financial indicators suggest stress areas that need immediate attention.'}
              </p>
            </CardContent>
          </Card>

          {/* Pro Content - Sentiment Chart */}
          {result.confidenceScores ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Sentiment Breakdown
                  <Badge variant="secondary" className="text-xs capitalize">
                    {result.sentiment}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SentimentChart confidenceScores={result.confidenceScores} />
              </CardContent>
            </Card>
          ) : (
            <Card className="border-purple-200 bg-purple-50/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Sentiment Chart - Pro Only</p>
                    <p className="text-xs text-gray-600">
                      Upgrade to see the full positive/neutral/negative sentiment distribution chart.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pro Content - Key Phrases */}
          {result.keyPhrases.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Financial Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Positive Indicators */}
                {result.positiveIndicators.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Positive Indicators</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.positiveIndicators.map((phrase, i) => (
                        <Badge key={i} className="bg-green-100 text-green-800 border-green-200">
                          {phrase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Negative Indicators */}
                {result.negativeIndicators.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-700">Stress Indicators</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.negativeIndicators.map((phrase, i) => (
                        <Badge key={i} className="bg-red-100 text-red-800 border-red-200">
                          {phrase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Key Phrases */}
                <div>
                  <span className="text-sm font-medium text-gray-700 block mb-2">All Detected Phrases</span>
                  <div className="flex flex-wrap gap-2">
                    {result.keyPhrases.map((phrase, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            !result.confidenceScores && (
              <Card className="border-purple-200 bg-purple-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Key Phrases & Indicators - Pro Only</p>
                      <p className="text-xs text-gray-600">
                        Upgrade to see extracted financial entities, positive/negative indicators, and phrase analysis.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )}

          {/* Pro Content - Recommendations */}
          {result.recommendations.length > 0 ? (
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                      <span className="w-6 h-6 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            !result.confidenceScores && (
              <Card className="border-purple-200 bg-purple-50/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Personalized Recommendations - Pro Only</p>
                      <p className="text-xs text-gray-600">
                        Upgrade to get actionable recommendations based on your financial indicators.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )}

          {/* Upgrade Banner for Free Users */}
          {upgradeMessage && (
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-rose-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Unlock Full Analysis</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {upgradeMessage}
                    </p>
                    <a
                      href="/pricing"
                      className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Upgrade to Pro
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
