"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { QuickViewModal } from "@/components/shop/QuickViewModal";

type ProductSectionProps = {
  title: string;
  highlight: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
};

export function ProductSection({
  title,
  highlight,
  products,
  viewAllHref = "/shop",
  viewAllLabel = "View all",
}: ProductSectionProps) {
  const [quickView, setQuickView] = useState<Product | null>(null);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center">
          <SectionHeader title={title} highlight={highlight} />
          <Link href={viewAllHref} className="mt-6 inline-block">
            <Button variant="secondary" size="sm">
              {viewAllLabel} <ArrowRight className="h-4 w-4" />
            </Button>
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
