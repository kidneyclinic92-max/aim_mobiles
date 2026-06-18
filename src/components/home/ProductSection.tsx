"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useState } from "react";
import { QuickViewModal } from "@/components/shop/QuickViewModal";

type ProductSectionProps = {
  title: string;
  highlight: string;
  subtitle: string;
  products: Product[];
  viewAllHref?: string;
};

export function ProductSection({
  title,
  highlight,
  subtitle,
  products,
  viewAllHref = "/shop",
}: ProductSectionProps) {
  const [quickView, setQuickView] = useState<Product | null>(null);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center">
          <SectionHeader eyebrow={subtitle} title={title} highlight={highlight} />
          <Link
            href={viewAllHref}
            className="mt-6 inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 90}>
              <ProductCard product={product} onQuickView={setQuickView} />
            </AnimatedSection>
          ))}
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
