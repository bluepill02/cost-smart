import yahooFinance from 'yahoo-finance2';

export interface MarketData {
    symbol: string;
    shortName: string;
    regularMarketPrice: number;
    regularMarketChangePercent: number;
    currency: string;
}

const CACHE_REVALIDATE = 300; // 5 minutes

export async function getMarketIndices(): Promise<MarketData[]> {
    const symbols = [
        '^NSEI', // NIFTY 50
        '^BSESN', // SENSEX
        '^GSPC', // S&P 500
        'BTC-USD', // Bitcoin
        'ETH-USD', // Ethereum
        'GC=F', // Gold Futures
        'INR=X' // USD/INR
    ];

    try {
        const results = await Promise.all(
            symbols.map(async (symbol) => {
                try {
                    // Suppress validation errors often caused by API drift
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const quote: any = await yahooFinance.quote(symbol, { validateResult: false });
                    return {
                        symbol,
                        shortName: quote.shortName || symbol,
                        regularMarketPrice: quote.regularMarketPrice || 0,
                        regularMarketChangePercent: quote.regularMarketChangePercent || 0,
                        currency: quote.currency || 'USD'
                    };
                } catch (err) {
                    console.error(`Failed to fetch ${symbol}`, err);
                    return null;
                }
            })
        );

        return results.filter((item): item is MarketData => item !== null);
    } catch (error) {
        console.error("Market Data Fetch Error:", error);
        return [];
    }
}
