import { test, expect } from '@playwright/test';
import { maskEmailForLog } from '../lib/mailchimp';

test.describe('maskEmailForLog', () => {
  test('masks a standard email address', () => {
    expect(maskEmailForLog('user123@example.com')).toBe('us***@example.com');
    expect(maskEmailForLog('john.doe@gmail.com')).toBe('jo***@gmail.com');
  });

  test('handles short local parts', () => {
    expect(maskEmailForLog('a@example.com')).toBe('a***@example.com');
    expect(maskEmailForLog('ab@example.com')).toBe('ab***@example.com');
  });

  test('handles missing domain part', () => {
    expect(maskEmailForLog('invalid-email')).toBe('***');
    expect(maskEmailForLog('another-invalid')).toBe('***');
  });

  test('handles empty string', () => {
    expect(maskEmailForLog('')).toBe('***');
  });

  test('handles multiple @ symbols by splitting at the first one', () => {
    expect(maskEmailForLog('user@domain@example.com')).toBe('us***@domain');
  });
});
