export interface HistoryItem {
    id: string;
    type: 'solar' | 'import' | 'currency' | 'loan' | 'inflation';
    title: string;
    summary: string;
    date: number;
    link: string;
}

const HISTORY_KEY = 'costsmart_history';

export function getHistory(): HistoryItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const item = window.localStorage.getItem(HISTORY_KEY);
        return item ? JSON.parse(item) : [];
    } catch {
        return [];
    }
}

export function saveHistoryItem(item: Omit<HistoryItem, 'id' | 'date'>) {
    if (typeof window === 'undefined') return;

    try {
        const current = getHistory();
        const newItem: HistoryItem = {
            ...item,
            id: crypto.randomUUID(),
            date: Date.now()
        };

        // Keep max 10 items, add new to top
        const updated = [newItem, ...current].slice(0, 10);
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

        // Dispatch event for live updates if needed
        window.dispatchEvent(new Event('history-updated'));
    } catch (err) {
        console.error("Failed to save history", err);
    }
}

export function clearHistory() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new Event('history-updated'));
}
