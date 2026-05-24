import { Metadata } from "next";
import { getProductsByCategory } from "@/lib/affiliate-data";
import AmazonProductCard from "@/components/affiliate/AmazonProductCard";
import { CANONICAL_DOMAIN } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: "Recommended Tools & Resources | CostSmart",
  description:
    "Curated Amazon product recommendations for home buyers, investors, freelancers, and business owners. Tools, books, and resources to help you make smarter financial decisions.",
  alternates: {
    canonical: "https://cost-smart-five.vercel.app/recommended-tools",
  },
  openGraph: {
    title: 'Recommended Tools & Resources | CostSmart',
    description: 'Curated Amazon product recommendations for home buyers, investors, freelancers, and business owners. Tools, books, and resources to help you make smarter financial decisions.',
    url: `${CANONICAL_DOMAIN}/recommended-tools`,
    type: 'website',
    images: [{ url: `${CANONICAL_DOMAIN}/og-image.png`, width: 1200, height: 630, alt: 'Recommended Tools & Resources' }],
  },
};

export default function RecommendedToolsPage() {
  const productsByCategory = getProductsByCategory();
  const categories = Object.keys(productsByCategory).sort();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Recommended Tools &amp; Resources
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Curated products to help you on your financial journey. From investing
          books to home renovation tools, we have picked the best for you.
        </p>
        <p className="text-xs text-slate-400 mt-3">
          As an Amazon Associate, we earn from qualifying purchases. This helps
          us keep CostSmart free for everyone.
        </p>
      </div>

      {categories.map((category) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsByCategory[category].map((product) => (
              <AmazonProductCard key={product.title} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
