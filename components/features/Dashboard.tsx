"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Trash2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getHistory, clearHistory, HistoryItem } from '@/lib/history-manager';

interface DashboardProps {
    hideIfEmpty?: boolean;
}

export default function Dashboard({ hideIfEmpty = false }: DashboardProps) {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        setHistory(getHistory());

        const handleUpdate = () => setHistory(getHistory());
        window.addEventListener('history-updated', handleUpdate);
        return () => window.removeEventListener('history-updated', handleUpdate);
    }, []);

    if (!mounted) return null; // Hydration safe

    if (history.length === 0) {
        if (hideIfEmpty) return null;

        return (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Your Dashboard</h3>
                <p className="text-slate-500 text-sm mb-4">You haven&apos;t used any tools yet. Start calculating to see your history here.</p>
                <Button variant="outline" asChild>
                    <Link href="#calculators">Browse Tools</Link>
                </Button>
            </div>
        );
    }

    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    Recent Activity
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={clearHistory} className="text-slate-400 hover:text-red-500 h-8 px-2">
                    <Trash2 size={16} />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {history.map((item) => (
                        <div key={item.id} className="group flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                            <div>
                                <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-0.5">
                                    {item.type}
                                </div>
                                <div className="font-medium text-slate-900 text-sm">{item.title}</div>
                                <div className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-xs">{item.summary}</div>
                            </div>
                            <Button asChild variant="ghost" size="icon" className="shrink-0 text-slate-400 group-hover:text-emerald-600">
                                <Link href={item.link}>
                                    <ArrowRight size={16} />
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
