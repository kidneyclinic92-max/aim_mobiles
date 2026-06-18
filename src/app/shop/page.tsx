import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our full collection of premium smartphones, earbuds, smartwatches, and accessories.",
};

function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 h-10 w-64 animate-pulse rounded-xl bg-white/5" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopClient />
    </Suspense>
  );
}
