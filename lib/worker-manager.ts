
class WorkerManager {
    private static instance: WorkerManager;
    private worker: Worker | null = null;
    private listeners: ((event: MessageEvent) => void)[] = [];
    private ready = false;

    private constructor() {
        if (typeof window !== 'undefined') {
            this.initWorker();
        }
    }

    public static getInstance(): WorkerManager {
        if (!WorkerManager.instance) {
            WorkerManager.instance = new WorkerManager();
        }
        return WorkerManager.instance;
    }

    private initWorker() {
        // Double check we are in browser
        if (typeof Worker === 'undefined') return;

        console.log('[WorkerManager] Initializing shared worker instance');
        this.worker = new Worker(new URL('./hooks/ai-worker.ts', import.meta.url), {
            type: 'module'
        });

        this.worker.onmessage = (event) => {
            if (event.data && typeof event.data === 'object' && 'status' in event.data && event.data.status === 'ready') {
                this.ready = true;
            }

            // Broadcast to all listeners
            this.listeners.forEach(listener => listener(event));
        };

        this.worker.onerror = (error) => {
            console.error('[WorkerManager] Worker error:', error);
        };
    }

    public addListener(callback: (event: MessageEvent) => void) {
        this.listeners.push(callback);
    }

    public removeListener(callback: (event: MessageEvent) => void) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public postMessage(message: any) {
        if (this.worker) {
            this.worker.postMessage(message);
        } else {
            console.warn('[WorkerManager] Worker not initialized');
        }
    }

    public isReady() {
        return this.ready;
    }

    public terminate() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
            this.ready = false;
        }
    }
}

export const workerManager = WorkerManager.getInstance();
