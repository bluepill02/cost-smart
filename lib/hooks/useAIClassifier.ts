
"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { workerManager } from '../worker-manager';

// Define the worker type for better type safety if extending later
type WorkerMessage = {
    status: 'ready' | 'initiate' | 'progress' | 'complete' | 'error';
    output?: string;
    data?: string;
    id?: string;
};

// We use a Web Worker to run the heavy AI model off the main thread
export function useAIClassifier() {
    const [ready, setReady] = useState<boolean | null>(() => workerManager.isReady());
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const requestIdRef = useRef<string | null>(null);

    useEffect(() => {
        // We still need to listen for 'ready' in case it wasn't ready on mount
        // validation: if ready is already true, this is redundant but harmless as setReady(true) won't re-render

        const onMessage = (event: MessageEvent<WorkerMessage>) => {
            const { status, id, output, data } = event.data;

            // Global ready status
            if (status === 'ready') {
                setReady(true);
                return;
            }

            // For task-specific messages, check ID
            if (id && id !== requestIdRef.current) {
                return;
            }

            switch (status) {
                case 'complete':
                    if (output) setResult(output);
                    setLoading(false);
                    requestIdRef.current = null;
                    break;
                case 'error':
                    console.error('Worker reported error:', data);
                    setLoading(false);
                    requestIdRef.current = null;
                    break;
            }
        };

        workerManager.addListener(onMessage);

        // Clean up listener, but NOT the worker
        return () => {
            workerManager.removeListener(onMessage);
        };
    }, []);

    const classify = useCallback((text: string, labels: string[]) => {
        const id = Math.random().toString(36).substring(7);
        requestIdRef.current = id;
        setLoading(true);
        workerManager.postMessage({
            text,
            labels,
            id
        });
    }, []);

    return { ready, classify, result, loading };
}
