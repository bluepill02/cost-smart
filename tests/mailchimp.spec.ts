import { test, expect } from '@playwright/test';
import { getSubscriberHash } from '../lib/mailchimp';

test.describe('getSubscriberHash', () => {
    test('generates correct MD5 hash for a standard email', () => {
        const hash = getSubscriberHash('test@example.com');
        expect(hash).toBe('55502f40dc8b7c769880b10874abc9d0');
    });

    test('is case-insensitive', () => {
        const hash1 = getSubscriberHash('test@example.com');
        const hash2 = getSubscriberHash('TEST@EXAMPLE.COM');
        const hash3 = getSubscriberHash('TeSt@ExAmPlE.cOm');
        expect(hash2).toBe(hash1);
        expect(hash3).toBe(hash1);
    });

    test('handles empty strings', () => {
        const hash = getSubscriberHash('');
        expect(hash).toBe('d41d8cd98f00b204e9800998ecf8427e'); // MD5 of empty string
    });

    test('does not trim whitespace automatically', () => {
        const expected = getSubscriberHash(' test@example.com ');
        expect(expected).not.toBe('55502f40dc8b7c769880b10874abc9d0');
    });
});
