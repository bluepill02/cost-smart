import React from 'react';
import AdContainer from '@/components/ads/AdContainer';

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  date: string;
  readingTime: string;
  category: string;
  author: string;
}

export const BlogLayout = ({ children, title, date, readingTime, category, author }: BlogLayoutProps) => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium mb-4 uppercase tracking-wider">
          <span>{category}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
          <span>By {author}</span>
          <span>|</span>
          <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
      </header>

      {/* Top Ad */}
      <div className="mb-10">
        <AdContainer slotId="1475703853" />
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
        {children}
      </div>

      {/* Bottom Ad */}
      <div className="mt-12">
        <AdContainer slotId="1475703853" />
      </div>
    </article>
  );
};

export default BlogLayout;
