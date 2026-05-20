import React from 'react';
import AdContainer from '@/components/ads/AdContainer';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareResultButton from '@/components/features/ShareResultButton';
import Link from 'next/link';
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  date: string;
  readingTime: string;
  category: string;
  author: string;
  description?: string;
  slug?: string;
  relatedPosts?: { title: string; href: string; tag: string }[];
}

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

export const BlogLayout = ({
  children,
  title,
  date,
  readingTime,
  category,
  author,
  description,
  slug,
  relatedPosts,
}: BlogLayoutProps) => {
  const canonicalUrl = slug ? `${CANONICAL_DOMAIN}/blog/${slug}` : CANONICAL_DOMAIN;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description:
      description ||
      `Learn about ${title.toLowerCase()} with practical examples and expert insights.`,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CostSmart',
      logo: {
        '@type': 'ImageObject',
        url: `${CANONICAL_DOMAIN}/favicon.ico`,
      },
    },
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: category,
    wordCount: readingTime.includes('min') ? parseInt(readingTime) * 200 : 800,
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Teal reading progress bar */}
      <ReadingProgress />

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-sm text-slate-400">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
          <span>›</span>
          <span className="text-slate-600 truncate max-w-[200px]">{title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          {/* Category tag */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-widest">
              <Tag className="w-3 h-3" />
              {category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-5 leading-tight tracking-tight">
            {title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {author.charAt(0)}
              </div>
              <span className="font-medium text-slate-700">{author}</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <time dateTime={date} className="text-slate-500">{formatDate(date)}</time>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{readingTime}</span>
            </div>
            <div className="ml-auto">
              <ShareResultButton
                title={title}
                text={`${title} — read on CostSmart`}
                url={canonicalUrl}
              />
            </div>
          </div>
        </header>

        {/* Top Ad */}
        <div className="mb-10">
          <AdContainer slotId="1475703853" />
        </div>

        {/* Article body */}
        <div className="prose prose-slate prose-lg max-w-none
          prose-headings:font-black prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-li:text-slate-600
          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-800
          prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-1 prose-blockquote:not-italic
        ">
          {children}
        </div>

        {/* Bottom share row */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <span className="text-sm text-slate-500">Found this useful? Share it:</span>
          <ShareResultButton
            title={title}
            text={`${title} — read on CostSmart`}
            url={canonicalUrl}
          />
        </div>

        {/* Bottom Ad */}
        <div className="mt-10">
          <AdContainer slotId="1475703853" />
        </div>

        {/* Related posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-10 bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h2 className="font-black text-slate-900 text-lg mb-4">Related Articles</h2>
            <div className="space-y-3">
              {relatedPosts.map(post => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="flex items-center justify-between group p-3 bg-white rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0">{post.tag}</span>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors truncate">{post.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 flex-shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/blog" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                View all articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* CTA to calculators */}
        <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white text-center">
          <div className="font-black text-lg mb-1">Put This Knowledge to Work</div>
          <p className="text-emerald-100 text-sm mb-4">Use our free calculators to run your own numbers.</p>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            Browse 35+ Free Calculators <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </>
  );
};

export default BlogLayout;
