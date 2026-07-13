"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { calculateDiscount, cn, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImageGallery } from "./ImageGallery";
import { SpecsTable } from "./SpecsTable";
import { Reviews } from "./Reviews";
import { ProductCard } from "@/components/shop/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useCart } from "@/store/cart-context";
import { useWishlist } from "@/store/wishlist-context";
import { useToast } from "@/store/toast-context";
import {
  getFrequentlyBoughtTogether,
  getRelatedProducts,
} from "@/lib/products";

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews">("specs");

  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const discount = calculateDiscount(selectedVariant.price, product.originalPrice);
  const inWishlist = isInWishlist(product.id);
  const related = getRelatedProducts(product);
  const bundle = getFrequentlyBoughtTogether(product);

  const handleAddToCart = () => {
    if (!selectedVariant.inStock) {
      showToast("This variant is out of stock", "error");
      return;
    }
    addItem(product.id, selectedVariant.id, selectedColor.name, quantity);
    showToast(`${product.name} added to cart`);
    openCart();
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    showToast(
      inWishlist ? "Removed from wishlist" : "Added to wishlist",
      "info"
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-zinc-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="transition-colors hover:text-cyan-400">Home</Link></li>
          <li>/</li>
          <li><Link href="/shop" className="transition-colors hover:text-cyan-400">Shop</Link></li>
          <li>/</li>
          <li className="text-zinc-300 capitalize">{product.category}</li>
          <li>/</li>
          <li className="text-white truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <AnimatedSection>
          <ImageGallery images={product.images} name={product.name} />
        </AnimatedSection>

        <AnimatedSection delay={100} className="text-center">
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isBestSeller && <Badge variant="bestseller">Best Seller</Badge>}
            {discount && <Badge variant="sale">-{discount}%</Badge>}
          </div>

          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            {product.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-zinc-600"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-zinc-400">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="mt-4 text-zinc-400 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">
              {formatPrice(selectedVariant.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-zinc-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color selector */}
          {product.colors.length > 1 && (
            <div className="mt-8">
              <p className="text-sm font-medium text-zinc-300 mb-3">
                Color: <span className="text-white">{selectedColor.name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition-all",
                      selectedColor.name === color.name
                        ? "border-cyan-500 scale-110 shadow-lg shadow-cyan-500/20"
                        : "border-white/20 hover:border-white/40"
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Variant selector */}
          {product.variants.length > 1 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-zinc-300 mb-3">Storage</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={!variant.inStock}
                    className={cn(
                      "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                      selectedVariant.id === variant.id
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                        : "border-white/10 text-zinc-300 hover:border-white/20",
                      !variant.inStock && "opacity-40 cursor-not-allowed line-through"
                    )}
                  >
                    {variant.storage}
                    {variant.ram !== "N/A" && ` / ${variant.ram}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-zinc-400 hover:text-white"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-zinc-400 hover:text-white"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!selectedVariant.inStock}
              className="flex-1 sm:flex-none"
            >
              <ShoppingBag className="h-4 w-4" />
              {selectedVariant.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>

            <button
              onClick={handleWishlist}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl border transition-all",
                inWishlist
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
              )}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
            <Truck className="h-4 w-4 text-cyan-400" />
            Free shipping on orders over $100
          </div>
        </AnimatedSection>
      </div>

      {/* Tabs */}
      <AnimatedSection className="mt-16">
        <div className="flex gap-1 border-b border-white/10 mb-8">
          {(["specs", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px",
                activeTab === tab
                  ? "border-cyan-500 text-cyan-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              )}
            >
              {tab === "specs" ? "Specifications" : `Reviews (${product.reviewCount})`}
            </button>
          ))}
        </div>

        {activeTab === "specs" ? (
          <SpecsTable specs={product.specs} />
        ) : (
          <Reviews
            reviews={product.reviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        )}
      </AnimatedSection>

      {/* Frequently bought together */}
      {bundle.length > 0 && (
        <AnimatedSection className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Frequently Bought <span className="text-gradient">Together</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {bundle.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <AnimatedSection className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            You May Also <span className="text-gradient">Like</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
