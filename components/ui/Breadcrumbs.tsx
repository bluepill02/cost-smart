'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbSchema, BreadcrumbItem } from '@/lib/seo-utils';

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
    // Always prepend Home
    const allItems: BreadcrumbItem[] = [
        { name: 'Home', url: '/' },
        ...items
    ];

    // Generate breadcrumb schema for SEO
    const breadcrumbSchema = getBreadcrumbSchema(allItems);

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            
            <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
                {allItems.map((item, index) => {
                    const isLast = index === allItems.length - 1;
                    const isFirst = index === 0;
                    
                    return (
                        <React.Fragment key={index}>
                            {/* Separator */}
                            {!isFirst && (
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                            
                            {/* Breadcrumb Item */}
                            {isLast ? (
                                <span className="text-slate-600 font-medium" aria-current="page">
                                    {item.name}
                                </span>
                            ) : (
                                <Link 
                                    href={item.url || '/'}
                                    className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition-colors"
                                >
                                    {isFirst && <Home className="w-4 h-4" />}
                                    <span>{item.name}</span>
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>
        </>
    );
}

// Utility function to generate breadcrumbs from pathname
export function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
    const segments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const isLast = index === segments.length - 1;
        
        // Format segment name (capitalize, replace hyphens with spaces)
        const name = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        items.push({
            name,
            url: isLast ? undefined : currentPath
        });
    });
    
    return items;
}

export default Breadcrumbs;
