import { test, expect } from '@playwright/test';
import { submitLeadCapture } from '../lib/lead-capture-api';

// Create a suite for the lead capture API
test.describe('submitLeadCapture', () => {
  let originalFetch: typeof global.fetch;
  let originalConsoleError: typeof console.error;
  let fetchCalls: unknown[][] = [];
  let consoleErrorCalls: unknown[][] = [];

  test.beforeEach(() => {
    // Save original implementations
    originalFetch = global.fetch;
    originalConsoleError = console.error;
    fetchCalls = [];
    consoleErrorCalls = [];

    // Mock fetch
    global.fetch = async (...args: unknown[]) => {
      fetchCalls.push(args);
      return { ok: true, json: async () => ({}) } as Response;
    };

    // Mock console.error
    console.error = (...args: unknown[]) => {
      consoleErrorCalls.push(args);
    };
  });

  test.afterEach(() => {
    // Restore original implementations
    global.fetch = originalFetch;
    console.error = originalConsoleError;
  });

  test('successfully submits lead data with minimum required fields', async () => {
    submitLeadCapture({
      email: 'test@example.com',
      formSource: 'test-form',
    });

    // Wait for microtasks to finish since fetch is fire-and-forget
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(fetchCalls.length).toBe(1);
    expect(fetchCalls[0][0]).toBe('/api/lead-capture');
    const init = fetchCalls[0][1] as RequestInit;
    expect(init.method).toBe('POST');
    const headers = init.headers as Record<string, string>;
    expect(headers['Content-Type']).toBe('application/json');

    const body = JSON.parse(init.body as string);
    expect(body.email).toBe('test@example.com');
    expect(body.formSource).toBe('test-form');
    // timestamp is automatically added
    expect(body.timestamp).toBeDefined();
    // Default URL and referrer when window is undefined in node environment
    expect(body.pageUrl).toBe('');
    expect(body.referrer).toBe('');
    // No errors logged
    expect(consoleErrorCalls.length).toBe(0);
  });

  test('submits all provided fields correctly', async () => {
    const fullData = {
      email: 'full@example.com',
      name: 'John Doe',
      formSource: 'hero-form',
      pageUrl: 'https://example.com/page',
      referrer: 'https://google.com',
      utmParams: {
        utm_source: 'google',
        utm_campaign: 'spring_sale'
      },
      calculatorContext: {
        calculatorName: 'solar-roi',
        resultSummary: 'Positive ROI in 5 years'
      }
    };

    submitLeadCapture(fullData);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(fetchCalls.length).toBe(1);
    const init = fetchCalls[0][1] as RequestInit;
    const body = JSON.parse(init.body as string);

    expect(body.email).toBe('full@example.com');
    expect(body.name).toBe('John Doe');
    expect(body.formSource).toBe('hero-form');
    expect(body.pageUrl).toBe('https://example.com/page');
    expect(body.referrer).toBe('https://google.com');
    expect(body.utmParams).toEqual({
      utm_source: 'google',
      utm_campaign: 'spring_sale'
    });
    expect(body.calculatorContext).toEqual({
      calculatorName: 'solar-roi',
      resultSummary: 'Positive ROI in 5 years'
    });
  });

  test('handles fetch errors gracefully (fire and forget)', async () => {
    // Override fetch to throw an error
    global.fetch = async () => {
      throw new Error('Network error');
    };

    submitLeadCapture({
      email: 'error@example.com',
      formSource: 'error-form',
    });

    // Wait for catch block to execute
    await new Promise(resolve => setTimeout(resolve, 0));

    // Verify error was logged and not thrown
    expect(consoleErrorCalls.length).toBe(1);
    expect(consoleErrorCalls[0][0]).toBe('[lead-capture-api] Submit error:');
    const err = consoleErrorCalls[0][1] as Error;
    expect(err.message).toBe('Network error');
  });

  test('handles data preparation errors', async () => {
    // To trigger catch block before fetch, we can pass null to cause a TypeError
    // (e.g., trying to access data.email when data is null)
    // We suppress type checking to intentionally pass bad data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const badData = null as any;

    // Should not throw, but catch and log
    expect(() => {
      submitLeadCapture(badData);
    }).not.toThrow();

    expect(consoleErrorCalls.length).toBe(1);
    expect(consoleErrorCalls[0][0]).toBe('[lead-capture-api] Error preparing lead data:');
    // Fetch should not be called
    expect(fetchCalls.length).toBe(0);
  });
});
