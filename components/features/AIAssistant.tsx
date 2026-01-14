'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAIClassifier } from '@/lib/hooks/useAIClassifier';

export function AIAssistant() {
    const [query, setQuery] = useState('');
    const { classify, result, loading, ready } = useAIClassifier();
    const router = useRouter();

    const handleAsk = () => {
        if (!query.trim()) return;

        // Define labels that map to our routes
        const labels = ['solar', 'import', 'general'];
        classify(query, labels);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleAsk();
    };

    // Handle the result
    if (result && !loading) {
        if (result === 'solar') {
             router.push('/solar-roi');
        } else if (result === 'import') {
             router.push('/import-duty');
        } else {
             // General fallback or maybe an alert?
             // Ideally we'd show a message, but for now let's just default to scrolling to tools
             router.push('#calculators');
        }
    }

    return (
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-none shadow-2xl text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <CardContent className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-medium mb-4 border border-indigo-500/30">
                        <Sparkles size={14} />
                        <span>AI Assistant</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Not sure where to start?</h3>
                    <p className="text-slate-400">
                        Tell us what you want to calculate, and our AI will guide you to the right tool.
                    </p>
                </div>

                <div className="w-full md:w-auto flex-1 max-w-md relative">
                    <div className="flex gap-2">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g. 'How much can I save with solar panels?'"
                            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-12 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <Button
                            onClick={handleAsk}
                            disabled={!ready || loading || !query.trim()}
                            className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                        </Button>
                    </div>
                    {!ready && <p className="text-xs text-slate-500 mt-2">Initializing AI model...</p>}
                </div>
            </CardContent>
        </Card>
    );
}
