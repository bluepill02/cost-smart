import { test, expect } from '@playwright/test';
import { deleteHistoryItem, getHistory, HistoryItem } from '../lib/history-manager';

test.describe('history-manager - deleteHistoryItem', () => {
  let originalWindow: typeof global.window;
  let dispatchedEvents: Event[] = [];

  test.beforeEach(() => {
    originalWindow = global.window;
    dispatchedEvents = [];

    const mockStorage: Record<string, string> = {};
    const mockLocalStorage = {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, value: string) => { mockStorage[key] = value; },
      removeItem: (key: string) => { delete mockStorage[key]; },
      clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
    };

    global.window = {
      localStorage: mockLocalStorage,
      dispatchEvent: (event: Event) => {
        dispatchedEvents.push(event);
        return true;
      },
    } as unknown as typeof global.window;
  });

  test.afterEach(() => {
    global.window = originalWindow;
  });

  test('should delete an item from history successfully', () => {
    const item1: HistoryItem = { id: '1', title: 'Test 1', type: 'solar', summary: '1', date: 123, link: '/1' };
    const item2: HistoryItem = { id: '2', title: 'Test 2', type: 'solar', summary: '2', date: 124, link: '/2' };

    global.window.localStorage.setItem('costsmart_history', JSON.stringify([item1, item2]));

    deleteHistoryItem('1');

    const history = getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].id).toBe('2');

    expect(dispatchedEvents.length).toBe(1);
    expect(dispatchedEvents[0].type).toBe('history-updated');
  });

  test('should handle empty history gracefully', () => {
    global.window.localStorage.setItem('costsmart_history', JSON.stringify([]));

    deleteHistoryItem('1');

    const history = getHistory();
    expect(history).toHaveLength(0);
    expect(dispatchedEvents.length).toBe(1);
    expect(dispatchedEvents[0].type).toBe('history-updated');
  });

  test('should not change history if id does not exist', () => {
    const item1: HistoryItem = { id: '1', title: 'Test 1', type: 'solar', summary: '1', date: 123, link: '/1' };

    global.window.localStorage.setItem('costsmart_history', JSON.stringify([item1]));

    deleteHistoryItem('999');

    const history = getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].id).toBe('1');
    expect(dispatchedEvents.length).toBe(1);
  });

  test('should return early and do nothing if window is undefined', () => {
    global.window = undefined as unknown as typeof global.window;

    expect(() => deleteHistoryItem('1')).not.toThrow();
  });
});
