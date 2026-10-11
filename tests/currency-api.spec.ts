import { test, expect } from '@playwright/test';
import { getLatestRates } from '../lib/currency-api';

test.describe('Currency API - getLatestRates', () => {
    let originalFetch: typeof global.fetch;
    let originalConsoleError: typeof console.error;
    let consoleErrorCalls: any[] = [];

    test.beforeAll(() => {
        originalFetch = global.fetch;
        originalConsoleError = console.error;
    });

    test.afterAll(() => {
        global.fetch = originalFetch;
        console.error = originalConsoleError;
    });

    test.beforeEach(() => {
        consoleErrorCalls = [];
        console.error = (...args) => {
            consoleErrorCalls.push(args);
        };
    });

    test.afterEach(() => {
        global.fetch = originalFetch;
        console.error = originalConsoleError;
    });

    test('should return null and log error when response is not ok', async () => {
        global.fetch = async () => {
            return {
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: async () => ({}),
            } as Response;
        };

        const result = await getLatestRates('USD');

        expect(result).toBeNull();
        expect(consoleErrorCalls.length).toBe(1);
        expect(consoleErrorCalls[0][0]).toBe('Currency API Error:');
        expect(consoleErrorCalls[0][1]).toBeInstanceOf(Error);
        expect(consoleErrorCalls[0][1].message).toBe('Failed to fetch rates: Internal Server Error');
    });

    test('should return null and log error on network failure', async () => {
        global.fetch = async () => {
            throw new Error('Network failure');
        };

        const result = await getLatestRates('USD');

        expect(result).toBeNull();
        expect(consoleErrorCalls.length).toBe(1);
        expect(consoleErrorCalls[0][0]).toBe('Currency API Error:');
        expect(consoleErrorCalls[0][1]).toBeInstanceOf(Error);
        expect(consoleErrorCalls[0][1].message).toBe('Network failure');
    });

    test('should return rates on success', async () => {
        const mockData = {
            amount: 1,
            base: 'USD',
            date: '2023-10-10',
            rates: { EUR: 0.95 }
        };

        global.fetch = async (url) => {
            expect(url.toString()).toContain('latest?from=USD');
            return {
                ok: true,
                status: 200,
                json: async () => mockData,
            } as Response;
        };

        const result = await getLatestRates('USD');
        expect(result).toEqual(mockData);
        expect(consoleErrorCalls.length).toBe(0);
    });
});
