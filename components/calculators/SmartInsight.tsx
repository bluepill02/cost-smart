"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Loader2, Target, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAIClassifier } from '@/lib/hooks/useAIClassifier';
import { cn } from '@/lib/utils';

interface SmartInsightProps {
    type: 'loan' | 'investment';
    amount: number;
    purpose: string; // User input
    metrics?: {
        rate?: number;
        term?: number;
        emi?: number;
    };
}

const LOAN_CATEGORIES = [
    'Education',
    'Home/Real Estate',
    'Vehicle/Transport',
    'Business/Startup',
    'Debt Consolidation',
    'Emergency/Medical',
    'Lifestyle/Luxury'
];

export default function SmartInsight({ type, amount, purpose, metrics }: SmartInsightProps) {
    const { classify, result: category, loading } = useAIClassifier();
    const [advice, setAdvice] = useState<{ title: string; text: string; tone: 'neutral' | 'positive' | 'caution' } | null>(null);

    // Debounce classification
    useEffect(() => {
        const timer = setTimeout(() => {
            if (purpose.length > 3) {
                if (type === 'loan') {
                    classify(purpose, LOAN_CATEGORIES);
                }
            }
        }, 800);
        return () => clearTimeout(timer);
    }, [purpose, type, classify]);

    // Generate Advice based on Category & Metrics
    useEffect(() => {
        if (!category) return;

        let newAdvice: { title: string; text: string; tone: 'neutral' | 'positive' | 'caution' } = {
            title: 'Analyzing...',
            text: '',
            tone: 'neutral'
        };

        if (type === 'loan') {
            switch (category) {
                case 'Education':
                    newAdvice = {
                        title: 'Investment in Future',
                        text: 'Education loans often come with tax benefits (Sec 80E in India). Ensure the ROI of the degree justifies the EMI.',
                        tone: 'positive'
                    };
                    break;
                case 'Home/Real Estate':
                    newAdvice = {
                        title: 'Asset Creation',
                        text: 'Home loans are "good debt" as they build an asset. Check for tax deductions on principal (80C) and interest (24b).',
                        tone: 'positive'
                    };
                    break;
                case 'Vehicle/Transport':
                    newAdvice = {
                        title: 'Depreciating Asset',
                        text: 'Cars depreciate fast. Try to keep the loan term short (< 5 years) to avoid owing more than the car is worth.',
                        tone: 'neutral'
                    };
                    break;
                case 'Business/Startup':
                    newAdvice = {
                        title: 'Growth Capital',
                        text: 'Ensure your business profit margin exceeds the loan interest rate. Consider government schemes for MSMEs.',
                        tone: 'positive'
                    };
                    break;
                case 'Debt Consolidation':
                    newAdvice = {
                        title: 'Refinancing Strategy',
                        text: 'Only proceed if this new loan has a significantly lower interest rate than your current debts. Destroy the credit cards you pay off!',
                        tone: 'caution'
                    };
                    break;
                case 'Emergency/Medical':
                    newAdvice = {
                        title: 'Critical Need',
                        text: 'Prioritize liquidity. Once this crisis passes, focus on building an emergency fund to avoid high-interest debt in future.',
                        tone: 'neutral'
                    };
                    break;
                case 'Lifestyle/Luxury':
                    newAdvice = {
                        title: 'Discretionary Spending',
                        text: ' borrowing for lifestyle (vacations, gadgets) is high risk. Ensure this EMI doesn\'t impact your essential savings goals.',
                        tone: 'caution'
                    };
                    break;
            }

            // Metric based overrides
            if (metrics?.rate && metrics.rate > 15) {
                newAdvice.text += ` Warning: ${metrics.rate}% is a high interest rate. Explore secured loan options if possible.`;
                newAdvice.tone = 'caution';
            }
        }

        setAdvice(newAdvice);
    }, [category, type, metrics]);

    if (!purpose || purpose.length <= 3) return null;

    return (
        <Card className={cn(
            "mt-4 border-l-4 transition-all duration-500 animate-in fade-in slide-in-from-top-2",
            advice?.tone === 'positive' && "border-l-emerald-500 bg-emerald-50/50",
            advice?.tone === 'caution' && "border-l-amber-500 bg-amber-50/50",
            advice?.tone === 'neutral' && "border-l-blue-500 bg-blue-50/50",
            !advice && loading && "border-l-slate-300 bg-slate-50"
        )}>
            <CardContent className="p-4 flex gap-3 items-start">
                <div className="mt-1">
                    {loading ? (
                        <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                    ) : advice?.tone === 'positive' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : advice?.tone === 'caution' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                    ) : (
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className={cn("font-bold text-sm",
                            advice?.tone === 'positive' ? "text-emerald-800" :
                            advice?.tone === 'caution' ? "text-amber-800" : "text-blue-800"
                        )}>
                            {loading ? 'AI Analyzing Intent...' : `${category} • ${advice?.title}`}
                        </h4>
                        {!loading && category && (
                            <span className="text-[10px] uppercase tracking-wider font-bold bg-white/50 px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">
                                AI Insight
                            </span>
                        )}
                    </div>
                    {!loading && advice && (
                        <p className="text-sm text-slate-700 leading-snug">
                            {advice.text}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
