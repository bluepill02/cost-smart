import { GoogleGenAI } from '@google/genai';

/**
 * Shared Gemini AI client configured for Vertex AI.
 * Requires GOOGLE_CLOUD_PROJECT env var; GOOGLE_CLOUD_LOCATION defaults to us-central1.
 */
function createClient(): GoogleGenAI {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  if (!project) {
    throw new Error(
      'GOOGLE_CLOUD_PROJECT environment variable is required. ' +
      'Set it to your GCP project ID to use Vertex AI.'
    );
  }
  return new GoogleGenAI({
    vertexai: true,
    project,
    location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
  });
}

let _ai: GoogleGenAI | null = null;

/** Lazily-initialized Gemini client. Throws if GOOGLE_CLOUD_PROJECT is not set. */
const ai = new Proxy({} as GoogleGenAI, {
  get(_target, prop) {
    if (!_ai) {
      _ai = createClient();
    }
    return (_ai as unknown as Record<string | symbol, unknown>)[prop];
  },
});

/** Default model for all Gemini calls - cheapest, highest rate limits, multimodal */
export const GEMINI_MODEL = 'gemini-2.0-flash';

export default ai;
