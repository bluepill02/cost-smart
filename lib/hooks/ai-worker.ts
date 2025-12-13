
import { pipeline, env } from '@xenova/transformers';

// Skip local checks for this demo to rely on CDN
env.allowLocalModels = false;
env.useBrowserCache = true;

class TextClassifier {
    static task = 'zero-shot-classification';
    static model = 'Xenova/mobilebert-uncased-mnli'; // Small, fast
    static instance: any = null;

    static async getInstance(progress_callback: Function | undefined = undefined) {
        if (this.instance === null) {
            // @ts-ignore
            this.instance = await pipeline(this.task, this.model, {
                progress_callback
            });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const { text, labels } = event.data;

    try {
        const classifier = await TextClassifier.getInstance((data: any) => {
            // Can post progress back
        });

        // Run classification
        const result = await classifier(text, labels);

        // Result format: { labels: ['Electronics', 'Clothing'], scores: [0.9, 0.1] }
        // We just want the top label
        const topLabel = result.labels[0];

        self.postMessage({
            status: 'complete',
            output: topLabel
        });

    } catch (e: any) {
        self.postMessage({
            status: 'error',
            data: e.message
        });
    }
});

// Signal ready
self.postMessage({ status: 'ready' });
