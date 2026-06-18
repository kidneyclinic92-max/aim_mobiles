"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/cart-context";
import { useToast } from "@/store/toast-context";
import { useEffect } from "react";

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const variant = product.variants[0];
  const color = product.colors[0].name;

  const handleAddToCart = () => {
    addItem(product.id, variant.id, color);
    showToast(`${product.name} added to cart`);
    openCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-dark-elevated shadow-2xl animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-xl bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/70"
          aria-label="Close quick view"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-white/5">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              {product.brand}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">{product.name}</h2>

            <div className="mt-2 flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm text-gray-300">{product.rating}</span>
              <span className="text-sm text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              {product.shortDescription}
            </p>

            <p className="mt-4 text-2xl font-bold text-white">
              {formatPrice(variant.price)}
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-6">
              <Button onClick={handleAddToCart} className="w-full">
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
              <Link href={`/product/${product.id}`} onClick={onClose}>
                <Button variant="outline" className="w-full">
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
