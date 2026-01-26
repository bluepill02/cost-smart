import { getMarketIndices } from '@/lib/market-data';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default async function MarketTicker() {
    const data = await getMarketIndices();

    if (!data || data.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {data.map((item) => {
                const isPositive = item.regularMarketChangePercent > 0;
                const isNeutral = item.regularMarketChangePercent === 0;

                return (
                    <Card key={item.symbol} className="border-slate-200 shadow-sm">
                        <CardContent className="p-4">
                            <div className="text-xs text-slate-500 font-medium truncate" title={item.shortName}>
                                {item.shortName}
                            </div>
                            <div className="flex items-end justify-between mt-1">
                                <span className="text-lg font-bold text-slate-900">
                                    {item.currency === 'INR' ? '₹' : (item.currency === 'USD' ? '$' : '')}
                                    {item.regularMarketPrice.toLocaleString()}
                                </span>
                                <span className={`text-xs font-bold flex items-center ${
                                    isPositive ? 'text-emerald-600' :
                                    isNeutral ? 'text-slate-500' : 'text-red-600'
                                }`}>
                                    {isPositive ? <TrendingUp size={12} className="mr-1" /> :
                                     isNeutral ? <Minus size={12} className="mr-1" /> :
                                     <TrendingDown size={12} className="mr-1" />}
                                    {Math.abs(item.regularMarketChangePercent).toFixed(2)}%
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
