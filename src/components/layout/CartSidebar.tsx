"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/store/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartSidebar() {
  const {
    isOpen,
    closeCart,
    getLineItems,
    subtotal,
    updateQuantity,
    removeItem,
    itemCount,
  } = useCart();

  const lineItems = getLineItems();
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 9.99) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.div
            className="fixed top-0 right-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-dark-elevated"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">
                  Your Cart
                  {itemCount > 0 && (
                    <span className="ml-2 text-sm font-normal text-zinc-400">
                      ({itemCount} {itemCount === 1 ? "item" : "items"})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {lineItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5">
                    <ShoppingBag className="h-10 w-10 text-zinc-600" />
                  </div>
                  <p className="text-lg font-medium text-zinc-300">Your cart is empty</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Discover our latest tech
                  </p>
                  <Link href="/shop" onClick={closeCart}>
                    <Button className="mt-6">Browse Products</Button>
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lineItems.map(({ item, product, variant, lineTotal }) => (
                    <li
                      key={`${item.productId}-${item.variantId}-${item.color}`}
                      className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs text-zinc-500">{product.brand}</p>
                            <p className="text-sm font-medium text-white line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-zinc-400">
                              {item.color}
                              {variant.storage !== "N/A" && ` · ${variant.storage}`}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.productId, item.variantId, item.color)
                            }
                            className="shrink-0 rounded-lg p-1 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                            aria-label={`Remove ${product.name} from cart`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.color,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 text-zinc-400 transition-colors hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm text-white">
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
                              className="p-1.5 text-zinc-400 transition-colors hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-white">
                            {formatPrice(lineTotal)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lineItems.length > 0 && (
              <div className="space-y-4 border-t border-white/10 p-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-400">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 text-base font-semibold text-white">
                    <span>Total</span>
                    <span>{formatPrice(subtotal + shipping)}</span>
                  </div>
                </div>
                <Link href="/checkout" onClick={closeCart} className="block">
                  <Button className="w-full">Checkout</Button>
                </Link>
                <Link href="/cart" onClick={closeCart} className="block">
                  <Button variant="ghost" className="w-full">View Full Cart</Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
