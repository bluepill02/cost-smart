import { ShoppingCart } from "lucide-react";
import type { AffiliateProduct } from "@/lib/affiliate-data";

interface AmazonProductCardProps {
  product: AffiliateProduct;
}

export default function AmazonProductCard({ product }: AmazonProductCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1">
          {product.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          {product.description}
        </p>
      </div>
      <a
        href={product.amazonUrl}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
      >
        <ShoppingCart className="w-4 h-4" />
        View on Amazon
      </a>
    </div>
  );
}
