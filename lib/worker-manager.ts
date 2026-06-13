
class WorkerManager {
    private static instance: WorkerManager;
    private listeners: ((event: MessageEvent) => void)[] = [];
    private ready = false;

    private constructor() {
        // Worker-based AI classification has been replaced by server-side Gemini.
        // This class is retained as a no-op to avoid breaking components that reference it.
        this.ready = true;
    }

    public static getInstance(): WorkerManager {
        if (!WorkerManager.instance) {
            WorkerManager.instance = new WorkerManager();
        }
        return WorkerManager.instance;
    }

    public addListener(callback: (event: MessageEvent) => void) {
        this.listeners.push(callback);
    }

    public removeListener(callback: (event: MessageEvent) => void) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public postMessage(_message: any) {
        // No-op: client-side classification has been replaced by server-side Gemini.
    }

    public isReady() {
        return this.ready;
    }

    public terminate() {
        this.ready = false;
    }
}

export const workerManager = WorkerManager.getInstance();
