"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { calculateDiscount, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/store/cart-context";
import { useWishlist } from "@/store/wishlist-context";
import { useToast } from "@/store/toast-context";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  onQuickView?: (product: Product) => void;
  variant?: "default" | "grid";
};

export function ProductCard({ product, onQuickView, variant = "default" }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const discount = calculateDiscount(product.price, product.originalPrice);
  const inWishlist = isInWishlist(product.id);
  const defaultVariant = product.variants[0];
  const defaultColor = product.colors[0].name;
  const isGrid = variant === "grid";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant.inStock) {
      showToast("Out of stock", "error");
      return;
    }
    addItem(product.id, defaultVariant.id, defaultColor);
    showToast("Added to bag");
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(inWishlist ? "Removed from wishlist" : "Added to wishlist", "info");
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  if (isGrid) {
    return (
      <article className="group relative">
        <Link href={`/product/${product.id}`} className="block">
          {product.isNew && (
            <span className="mb-2 inline-block rounded-none border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              New
            </span>
          )}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white/[0.03]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            {discount && (
              <span className="absolute right-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                -{discount}%
              </span>
            )}
          </div>
          <div className="mt-3 text-center">
            <h3 className="text-sm font-medium text-zinc-200 line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
              {product.name}
            </h3>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-base font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group glass-card-hover card-shine relative overflow-hidden">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-elevated/80 via-transparent to-transparent z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_100%,rgba(0,212,255,0.15),transparent_70%)]" />

          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
            {discount && <Badge variant="sale">-{discount}%</Badge>}
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2.5 opacity-0 transition-all duration-400 group-hover:opacity-100">
            <button
              onClick={handleQuickView}
              className="flex h-11 w-11 items-center justify-center rounded-none border border-white/10 bg-white/[0.06] text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/10 hover:border-white/20"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={handleWishlist}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-none border backdrop-blur-md transition-all hover:scale-110",
                inWishlist
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.06] text-white hover:bg-white/10 hover:border-white/20"
              )}
              aria-label="Wishlist"
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex h-11 w-11 items-center justify-center rounded-none border border-white/10 bg-white/[0.06] text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/10 hover:border-white/20"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
            {product.brand}
          </p>
          <h3 className="mt-1.5 text-base font-semibold text-white line-clamp-2 leading-snug transition-colors group-hover:text-cyan-300">
            {product.name}
          </h3>
          <div className="mt-2.5 flex items-center gap-2">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-zinc-300">{product.rating}</span>
            <span className="text-xs text-zinc-600">({product.reviewCount.toLocaleString()})</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
