"use client";

import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { getRecommendations } from "@/lib/affiliate-data";
import AmazonProductCard from "./AmazonProductCard";

interface AmazonRecommendationsProps {
  calculatorSlug: string;
}

export default function AmazonRecommendations({ calculatorSlug }: AmazonRecommendationsProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  const products = useMemo(() => getRecommendations(calculatorSlug), [calculatorSlug]);

  if (products.length === 0) return null;

  return (
    <section ref={ref} className="mt-12 py-8">
      {inView && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Recommended Tools &amp; Resources
            </h2>
            <p className="text-xs text-slate-400">
              As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <AmazonProductCard key={product.title} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
