import { test, expect } from '@playwright/test';
import { ShareableURLManager, ShareableData } from '../lib/shareable-url';

test.describe('ShareableURLManager.decode', () => {
    let consoleErrorOriginal: any;

    test.beforeEach(() => {
        // Suppress console.error in tests since we expect errors during decoding tests
        consoleErrorOriginal = console.error;
        console.error = () => {};
    });

    test.afterEach(() => {
        console.error = consoleErrorOriginal;
    });

    test('successfully decodes valid encoded data', () => {
        const validData: ShareableData = {
            calculator: 'test-calc',
            inputs: { val: 1 },
            timestamp: 1234567890
        };
        const encoded = btoa(JSON.stringify(validData));
        const decoded = ShareableURLManager.decode(encoded);
        expect(decoded).toEqual(validData);
    });

    test('returns null for invalid base64 string', () => {
        const invalidBase64 = 'invalid-base64-string!!';
        const decoded = ShareableURLManager.decode(invalidBase64);
        expect(decoded).toBeNull();
    });

    test('returns null for valid base64 but invalid JSON', () => {
        const invalidJson = '{ bad json }';
        const encoded = btoa(invalidJson);
        const decoded = ShareableURLManager.decode(encoded);
        expect(decoded).toBeNull();
    });

    test('returns null for valid JSON missing calculator property', () => {
        const missingCalculator = { inputs: { val: 1 } };
        const encoded = btoa(JSON.stringify(missingCalculator));
        const decoded = ShareableURLManager.decode(encoded);
        expect(decoded).toBeNull();
    });

    test('returns null for valid JSON missing inputs property', () => {
        const missingInputs = { calculator: 'test-calc' };
        const encoded = btoa(JSON.stringify(missingInputs));
        const decoded = ShareableURLManager.decode(encoded);
        expect(decoded).toBeNull();
    });

    test('returns null for empty string', () => {
        const decoded = ShareableURLManager.decode('');
        expect(decoded).toBeNull();
    });
});
