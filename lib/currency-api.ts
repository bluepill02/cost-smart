export interface ExchangeRates {
    amount: number;
    base: string;
    date: string;
    rates: Record<string, number>;
}

const API_BASE = 'https://api.frankfurter.app';

export async function getLatestRates(base: string = 'USD'): Promise<ExchangeRates | null> {
    try {
        const res = await fetch(`${API_BASE}/latest?from=${base}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch rates: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Currency API Error:", error);
        return null;
    }
}

export async function getHistoricalRates(
    base: string,
    target: string,
    days: number = 30
): Promise<{ date: string; rate: number }[]> {
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        // Format YYYY-MM-DD
        const startStr = startDate.toISOString().split('T')[0];

        const res = await fetch(
            `${API_BASE}/${startStr}..?from=${base}&to=${target}`,
            { next: { revalidate: 86400 } } // Cache history for 24h
        );

        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();

        // Transform { rates: { "2023-01-01": { "EUR": 0.9 } } } -> [{date, rate}]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Object.entries(data.rates).map(([date, rates]: [string, any]) => ({
            date,
            rate: rates[target]
        }));

    } catch (error) {
        console.error("Historical API Error:", error);
        return [];
    }
}
