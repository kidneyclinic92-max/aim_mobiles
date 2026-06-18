"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { getProductsList } from "@/lib/products";
import { useWishlist } from "@/store/wishlist-context";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { QuickViewModal } from "@/components/shop/QuickViewModal";

export default function WishlistPage() {
  const { items } = useWishlist();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const wishlistProducts = getProductsList().filter((p) => items.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/5">
            <Heart className="h-12 w-12 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">Your wishlist is empty</h1>
          <p className="mt-2 text-gray-400">
            Save items you love by clicking the heart icon.
          </p>
          <Link href="/shop" className="mt-8 inline-block">
            <Button size="lg">Explore Products</Button>
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AnimatedSection className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">
          My <span className="text-gradient">Wishlist</span>
        </h1>
        <p className="mt-2 text-gray-400">
          {wishlistProducts.length} saved{" "}
          {wishlistProducts.length === 1 ? "item" : "items"}
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wishlistProducts.map((product, i) => (
          <AnimatedSection key={product.id} delay={i * 80}>
            <ProductCard product={product} onQuickView={setQuickView} />
          </AnimatedSection>
        ))}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
