import { test, expect } from '@playwright/test';
import { ShareableURLManager, ShareableData } from '../lib/shareable-url';

test.describe('ShareableURLManager.encode', () => {

  test('successfully encodes valid data', () => {
    const data: ShareableData = {
      calculator: 'sip',
      inputs: { amount: 1000, rate: 12, years: 10 },
      results: { totalInvestment: 120000, expectedReturn: 112339 }
    };

    const before = Date.now();
    const encoded = ShareableURLManager.encode(data);
    const after = Date.now();

    // Check it's a non-empty string
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);

    // Decode to verify contents
    const decodedStr = atob(encoded);
    const parsed = JSON.parse(decodedStr);

    expect(parsed.calculator).toBe('sip');
    expect(parsed.inputs).toEqual({ amount: 1000, rate: 12, years: 10 });
    expect(parsed.results).toEqual({ totalInvestment: 120000, expectedReturn: 112339 });

    // Check that timestamp was added and is fresh
    expect(parsed.timestamp).toBeDefined();
    expect(parsed.timestamp).toBeGreaterThanOrEqual(before);
    expect(parsed.timestamp).toBeLessThanOrEqual(after);
  });

  test('handles edge cases with empty inputs and no results', () => {
    const data: ShareableData = {
      calculator: 'empty-calc',
      inputs: {}
    };

    const encoded = ShareableURLManager.encode(data);
    const decodedStr = atob(encoded);
    const parsed = JSON.parse(decodedStr);

    expect(parsed.calculator).toBe('empty-calc');
    expect(parsed.inputs).toEqual({});
    expect(parsed.results).toBeUndefined();
    expect(parsed.timestamp).toBeDefined();
  });

  test('throws error on circular reference', () => {
    // Create an object with a circular reference which causes JSON.stringify to throw
    const circularInputs: any = {};
    circularInputs.self = circularInputs;

    const data: ShareableData = {
      calculator: 'error-calc',
      inputs: circularInputs
    };

    // The method catches the error, logs it, and throws a new specific Error
    expect(() => {
      ShareableURLManager.encode(data);
    }).toThrow('Failed to create shareable link');
  });

});
