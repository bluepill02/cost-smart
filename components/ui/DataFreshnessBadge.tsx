'use client';

import React from 'react';
import { formatLastUpdated, isRBIDataStale } from '@/lib/rbi-data';
import { isTaxDataCurrent, FISCAL_YEAR_INFO } from '@/lib/tax-data';

interface DataFreshnessBadgeProps {
    dataType: 'rbi' | 'tax' | 'currency' | 'custom';
    lastUpdated?: string;
    dataSource?: string;
    className?: string;
    variant?: 'default' | 'compact' | 'detailed';
}

export function DataFreshnessBadge({ 
    dataType, 
    lastUpdated, 
    dataSource,
    className = '',
    variant = 'default'
}: DataFreshnessBadgeProps) {
    const getStatusInfo = (): {
        date: string;
        source: string;
        status: 'fresh' | 'warning' | 'stale';
        icon: string;
        updateFreq: string;
        fiscalYear?: string;
    } => {
        switch (dataType) {
            case 'rbi':
                const rbiStale = isRBIDataStale();
                return {
                    date: formatLastUpdated(),
                    source: 'Reserve Bank of India',
                    status: rbiStale ? 'warning' : 'fresh',
                    icon: '🏦',
                    updateFreq: 'Updated Quarterly'
                };
            
            case 'tax':
                const taxCurrent = isTaxDataCurrent();
                return {
                    date: new Date(FISCAL_YEAR_INFO.lastUpdated).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    source: 'CBDT / Income Tax Department',
                    status: taxCurrent ? 'fresh' : 'warning',
                    icon: '📊',
                    fiscalYear: FISCAL_YEAR_INFO.currentFY,
                    updateFreq: 'Updated Annually'
                };
            
            case 'currency':
                return {
                    date: new Date().toLocaleDateString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    source: 'Frankfurter API',
                    status: 'fresh',
                    icon: '💱',
                    updateFreq: 'Updated Hourly'
                };
            
            case 'custom':
                return {
                    date: lastUpdated ? new Date(lastUpdated).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }) : 'Unknown',
                    source: dataSource || 'Official Sources',
                    status: 'fresh',
                    icon: '✓',
                    updateFreq: 'Regularly Updated'
                };
        }
    };

    const info = getStatusInfo();
    
    const statusColors: Record<'fresh' | 'warning' | 'stale', string> = {
        fresh: 'bg-green-50 text-green-700 border-green-200',
        warning: 'bg-amber-50 text-amber-700 border-amber-200',
        stale: 'bg-red-50 text-red-700 border-red-200'
    };

    const statusDotColors: Record<'fresh' | 'warning' | 'stale', string> = {
        fresh: 'bg-green-500',
        warning: 'bg-amber-500',
        stale: 'bg-red-500'
    };

    if (variant === 'compact') {
        return (
            <div className={`inline-flex items-center gap-1.5 text-xs ${className}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDotColors[info.status]}`} />
                <span className="text-slate-600">Updated {info.date}</span>
            </div>
        );
    }

    if (variant === 'detailed') {
        return (
            <div className={`rounded-lg border p-4 ${statusColors[info.status]} ${className}`}>
                <div className="flex items-start gap-3">
                    <span className="text-2xl">{info.icon}</span>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`w-2 h-2 rounded-full ${statusDotColors[info.status]} animate-pulse`} />
                            <span className="font-semibold text-sm">Data Verified</span>
                        </div>
                        <p className="text-sm opacity-90">
                            <strong>Last Updated:</strong> {info.date}
                        </p>
                        <p className="text-xs opacity-75 mt-1">
                            <strong>Source:</strong> {info.source}
                        </p>
                        {info.fiscalYear && (
                            <p className="text-xs opacity-75 mt-1">
                                <strong>Fiscal Year:</strong> {info.fiscalYear}
                            </p>
                        )}
                        <p className="text-xs opacity-60 mt-2 italic">
                            {info.updateFreq}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Default variant
    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusColors[info.status]} ${className}`}>
            <span className={`w-2 h-2 rounded-full ${statusDotColors[info.status]}`} />
            <span className="text-xs font-medium">
                Updated {info.date}
            </span>
            <span className="text-xs opacity-60">• {info.source}</span>
        </div>
    );
}

// Convenience components for specific use cases
export function RBIDataBadge({ variant = 'default', className = '' }: Omit<DataFreshnessBadgeProps, 'dataType'>) {
    return <DataFreshnessBadge dataType="rbi" variant={variant} className={className} />;
}

export function TaxDataBadge({ variant = 'default', className = '' }: Omit<DataFreshnessBadgeProps, 'dataType'>) {
    return <DataFreshnessBadge dataType="tax" variant={variant} className={className} />;
}

export function CurrencyDataBadge({ variant = 'default', className = '' }: Omit<DataFreshnessBadgeProps, 'dataType'>) {
    return <DataFreshnessBadge dataType="currency" variant={variant} className={className} />;
}
