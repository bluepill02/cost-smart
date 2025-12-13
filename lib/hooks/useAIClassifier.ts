
"use client";

import { useEffect, useState, useRef } from 'react';

// Define the worker type for better type safety if extending later
type WorkerMessage = {
    status: 'ready' | 'initiate' | 'progress' | 'complete' | 'error';
    output?: any;
    data?: any;
};

// We use a Web Worker to run the heavy AI model off the main thread
export function useAIClassifier() {
    const [ready, setReady] = useState<boolean | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const worker = useRef<Worker | null>(null);

    useEffect(() => {
        if (!worker.current) {
            // Create the worker relative to the public folder
            // We need to create the actual worker file as well
            worker.current = new Worker(new URL('./ai-worker.ts', import.meta.url), {
                type: 'module'
            });
        }

        const onMessage = (event: MessageEvent<WorkerMessage>) => {
            switch (event.data.status) {
                case 'ready':
                    setReady(true);
                    break;
                case 'complete':
                    setResult(event.data.output);
                    setLoading(false);
                    break;
            }
        };

        worker.current.addEventListener('message', onMessage);

        return () => {
            worker.current?.removeEventListener('message', onMessage);
            worker.current?.terminate();
            worker.current = null;
        };
    }, []);

    const classify = (text: string, labels: string[]) => {
        if (worker.current) {
            setLoading(true);
            worker.current.postMessage({
                text,
                labels
            });
        }
    };

    return { ready, classify, result, loading };
}
