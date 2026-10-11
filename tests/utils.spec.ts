import { test, expect } from '@playwright/test';
import { cn } from '../lib/utils';

test.describe('cn utility function', () => {
  test('should merge standard class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  test('should handle conditional classes with objects', () => {
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
  });

  test('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  test('should handle falsy, null, and undefined inputs', () => {
    expect(cn('class1', null, undefined, false, 0, '', 'class2')).toBe('class1 class2');
  });

  test('should resolve Tailwind CSS conflicts (overriding correctly)', () => {
    // twMerge logic: later classes override earlier ones if they conflict
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    expect(cn('bg-red-500 px-2', 'bg-blue-500')).toBe('px-2 bg-blue-500');
  });

  test('should handle complex combinations', () => {
    const isActive = true;
    expect(
      cn(
        'base-class p-2',
        isActive && 'bg-blue-500 text-white',
        { 'hover:bg-blue-600': isActive },
        ['flex', 'items-center'],
        'p-4' // overrides p-2
      )
    ).toBe('base-class bg-blue-500 text-white hover:bg-blue-600 flex items-center p-4');
  });
});
