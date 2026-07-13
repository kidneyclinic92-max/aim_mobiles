"use client";

import { useState } from "react";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSiteContent } from "@/store/content-context";
import type { Product } from "@/lib/types";
import { QuickViewModal } from "@/components/shop/QuickViewModal";

export function FeaturedCarousel() {
  const { content } = useSiteContent();
  const products = getFeaturedProducts();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const section = content.home.featured;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center">
          <SectionHeader
            title={section.title}
            highlight={section.highlight}
            description={section.description}
          />
        </AnimatedSection>

        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="flex gap-5 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory sm:gap-6 sm:px-6 lg:px-8">
            {products.map((product, i) => (
              <div key={product.id} className="w-[290px] shrink-0 snap-start sm:w-[300px]">
                <AnimatedSection delay={i * 80}>
                  <ProductCard product={product} onQuickView={setQuickView} />
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
