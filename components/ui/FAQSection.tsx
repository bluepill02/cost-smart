'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getFAQSchema, FAQItem, getDefaultFAQs, DEFAULT_FAQS } from '@/lib/seo-utils';

interface FAQSectionProps {
    faqs?: FAQItem[];
    calculatorType?: keyof typeof DEFAULT_FAQS;
    title?: string;
    className?: string;
}

export function FAQSection({ 
    faqs, 
    calculatorType = 'general',
    title = 'Frequently Asked Questions',
    className = ''
}: FAQSectionProps) {
    const faqItems = faqs || getDefaultFAQs(calculatorType);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate FAQ schema for SEO
    const faqSchema = getFAQSchema(faqItems);

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            
            <section className={`bg-white rounded-2xl border border-slate-200 p-6 md:p-8 ${className}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    {title}
                </h2>
                
                <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                        <div 
                            key={index}
                            className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-emerald-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-semibold text-slate-900 pr-4">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                )}
                            </button>
                            
                            <div
                                className={`transition-all duration-300 ease-in-out ${
                                    openIndex === index 
                                        ? 'max-h-96 opacity-100' 
                                        : 'max-h-0 opacity-0'
                                } overflow-hidden`}
                            >
                                <div className="p-4 text-slate-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default FAQSection;
