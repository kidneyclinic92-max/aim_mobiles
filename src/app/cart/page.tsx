"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/store/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function CartPage() {
  const { getLineItems, subtotal, updateQuantity, removeItem, itemCount } =
    useCart();

  const lineItems = getLineItems();
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 9.99) : 0;
  const tax = subtotal * 0.08;

  if (lineItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/5 mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
          <p className="mt-2 text-gray-400">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link href="/shop" className="mt-8 inline-block">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="text-center text-3xl font-bold text-white">
          Shopping Cart
          <span className="ml-2 text-lg font-normal text-gray-400">
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
        </h1>
      </AnimatedSection>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {lineItems.map(({ item, product, variant, lineTotal }) => (
            <AnimatedSection key={`${item.productId}-${item.variantId}-${item.color}`}>
              <div className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:gap-6">
                <Link
                  href={`/product/${product.id}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white/5 sm:h-28 sm:w-28"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                      <Link
                        href={`/product/${product.id}`}
                        className="text-base font-semibold text-white hover:text-cyan-400"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-400">
                        {item.color}
                        {variant.storage !== "N/A" && ` · ${variant.storage}`}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(item.productId, item.variantId, item.color)
                      }
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-xl border border-white/10 bg-white/5">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.variantId,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="p-2 text-gray-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.variantId,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="p-2 text-gray-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {formatPrice(lineTotal)}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={100}>
          <div className="glass-card p-6 sticky top-24">
            <h2 className="mb-4 text-center text-lg font-semibold text-white">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-400">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
                <span>Total</span>
                <span>{formatPrice(subtotal + shipping + tax)}</span>
              </div>
            </div>
            <Link href="/checkout" className="mt-6 block">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
