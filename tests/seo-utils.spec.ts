import { test, expect } from '@playwright/test';
import { getCalculatorSchema, CANONICAL_DOMAIN } from '../lib/seo-utils';

test.describe('SEO Utils - getCalculatorSchema', () => {
    test('returns correct basic schema structure', () => {
        const schema = getCalculatorSchema('Test Calc', 'A test description', '/test-path');

        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('SoftwareApplication');
        expect(schema.name).toBe('Test Calc');
        expect(schema.description).toBe('A test description');
        expect(schema.operatingSystem).toBe('Web');
        expect(schema.offers).toEqual({
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        });
    });

    test('forms URL correctly with CANONICAL_DOMAIN', () => {
        const schema = getCalculatorSchema('Test Calc', 'A test description', '/test-path');
        expect(schema.url).toBe(`${CANONICAL_DOMAIN}/test-path`);
    });

    test('uses default category FinanceApplication when none is provided', () => {
        const schema = getCalculatorSchema('Test Calc', 'A test description', '/test-path');
        expect(schema.applicationCategory).toBe('FinanceApplication');
    });

    test('uses provided category when one is passed', () => {
        const schema = getCalculatorSchema('Test Calc', 'A test description', '/test-path', 'BusinessApplication');
        expect(schema.applicationCategory).toBe('BusinessApplication');
    });
});
