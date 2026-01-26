"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink, History, ArrowRight, LayoutDashboard } from 'lucide-react';
import { getHistory, deleteHistoryItem, HistoryItem } from '@/lib/history-manager';

// Simple date formatter if date-fns is not available/heavy,
// but let's try a simple native one first to avoid deps if not needed.
function formatDate(timestamp: number) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(new Date(timestamp));
}

export default function DashboardPage() {
    const [items, setItems] = useState<HistoryItem[]>([]);
    const [mounted, setMounted] = useState(false);

    const loadHistory = () => {
        setItems(getHistory());
    };

    useEffect(() => {
        setMounted(true);
        loadHistory();

        const handleUpdate = () => loadHistory();
        window.addEventListener('history-updated', handleUpdate);
        return () => window.removeEventListener('history-updated', handleUpdate);
    }, []);

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        deleteHistoryItem(id);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            <LayoutDashboard className="w-8 h-8 text-emerald-600" />
                            My Finance Hub
                        </h1>
                        <p className="text-slate-500 mt-1">Your saved scenarios and recent calculations.</p>
                    </div>
                    {items.length > 0 && (
                        <div className="text-sm text-slate-400">
                            {items.length} Saved Item{items.length !== 1 ? 's' : ''}
                        </div>
                    )}
                </div>

                {items.length === 0 ? (
                    <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                <History className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-700">No Saved Scenarios Yet</h3>
                            <p className="text-slate-500 max-w-md mt-2 mb-6">
                                Use our calculators to plan your loans, investments, or solar savings.
                                Click "Save Scenario" on any result to pin it here.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/home-loan-calculator">
                                    <Button variant="outline">Home Loan</Button>
                                </Link>
                                <Link href="/solar-roi">
                                    <Button variant="outline">Solar ROI</Button>
                                </Link>
                                <Link href="/">
                                    <Button>Explore All Tools</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-emerald-200">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                                            {item.type}
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(item.id, e)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                            aria-label="Delete item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <CardTitle className="mt-2 text-lg line-clamp-1" title={item.title}>
                                        {item.title}
                                    </CardTitle>
                                    <CardDescription>
                                        Saved on {formatDate(item.date)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-3">
                                    <p className="text-sm text-slate-600 line-clamp-2 min-h-[2.5rem]">
                                        {item.summary}
                                    </p>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Link href={item.link} className="w-full">
                                        <Button variant="ghost" className="w-full justify-between group-hover:text-emerald-600 group-hover:bg-emerald-50">
                                            View Details
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
