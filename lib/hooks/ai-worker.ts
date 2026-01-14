
import { pipeline, env } from '@xenova/transformers';

// Skip local checks for this demo to rely on CDN
env.allowLocalModels = false;
env.useBrowserCache = true;

class TextClassifier {
    static task = 'zero-shot-classification';
    static model = 'Xenova/mobilebert-uncased-mnli'; // Small, fast
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static instance: any = null;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    static async getInstance(progress_callback: Function | undefined = undefined) {
        if (this.instance === null) {
            // @ts-expect-error - pipeline signature issues in this version
            this.instance = await pipeline(this.task, this.model, {
                progress_callback
            });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const { text, labels, id } = event.data;

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        const classifier = await TextClassifier.getInstance((_data: any) => {
            // Can post progress back
        });

        // Run classification
        const result = await classifier(text, labels);

        // Result format: { labels: ['Electronics', 'Clothing'], scores: [0.9, 0.1] }
        // We just want the top label
        const topLabel = result.labels[0];

        self.postMessage({
            status: 'complete',
            output: topLabel,
            id
        });

    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        self.postMessage({
            status: 'error',
            data: message,
            id
        });
    }
});

// Signal ready
self.postMessage({ status: 'ready' });
