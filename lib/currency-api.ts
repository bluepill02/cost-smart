export interface ExchangeRates {
    amount: number;
    base: string;
    date: string;
    rates: Record<string, number>;
}

const API_BASE = 'https://api.frankfurter.dev/v1';

const FALLBACK_USD_RATES: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.1,
    CAD: 1.36,
    AUD: 1.52,
    JPY: 149.5,
    CHF: 0.88,
    CNY: 7.24,
};

export function getFallbackRates(base: string = 'USD'): ExchangeRates {
    const baseToUsd = FALLBACK_USD_RATES[base] ?? 1;
    const rates = Object.fromEntries(
        Object.entries(FALLBACK_USD_RATES)
            .filter(([currency]) => currency !== base)
            .map(([currency, usdRate]) => [currency, usdRate / baseToUsd]),
    );

    return {
        amount: 1,
        base,
        date: new Date().toISOString().slice(0, 10),
        rates,
    };
}

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
        return getFallbackRates(base);
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
        const endStr = endDate.toISOString().split('T')[0];

        const res = await fetch(
            `${API_BASE}/${startStr}..${endStr}?from=${base}&to=${target}`,
            { next: { revalidate: 86400 } } // Cache history for 24h
        );

        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();

        // Transform { rates: { "2023-01-01": { "EUR": 0.9 } } } -> [{date, rate}]
        return Object.entries(data.rates).flatMap(([date, rates]) => {
            const rate = (rates as Record<string, number>)[target];
            return typeof rate === 'number' ? [{ date, rate }] : [];
        });

    } catch (error) {
        console.error("Historical API Error:", error);
        return [];
    }
}
