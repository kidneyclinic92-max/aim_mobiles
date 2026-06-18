"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getActiveProducts } from "@/lib/cms/content-access";
import type { CartItem, Product, ProductVariant } from "@/lib/types";
import { getProductById } from "@/lib/utils";

const CART_KEY = "aim-mobiles-cart";

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (
    productId: string,
    variantId: string,
    color: string,
    quantity?: number
  ) => void;
  removeItem: (productId: string, variantId: string, color: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getLineItems: () => {
    item: CartItem;
    product: Product;
    variant: ProductVariant;
    lineTotal: number;
  }[];
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (productId: string, variantId: string, color: string, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.productId === productId &&
            i.variantId === variantId &&
            i.color === color
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === productId &&
            i.variantId === variantId &&
            i.color === color
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { productId, variantId, color, quantity }];
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, variantId: string, color: string) => {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.productId === productId &&
              i.variantId === variantId &&
              i.color === color
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (
      productId: string,
      variantId: string,
      color: string,
      quantity: number
    ) => {
      if (quantity < 1) {
        removeItem(productId, variantId, color);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId &&
          i.variantId === variantId &&
          i.color === color
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const getLineItems = useCallback(() => {
    return items
      .map((item) => {
        const product = getProductById(getActiveProducts(), item.productId);
        if (!product) return null;
        const variant = product.variants.find((v) => v.id === item.variantId);
        if (!variant) return null;
        return {
          item,
          product,
          variant,
          lineTotal: variant.price * item.quantity,
        };
      })
      .filter(Boolean) as CartContextType["getLineItems"] extends () => infer R
      ? R
      : never;
  }, [items]);

  const subtotal = useMemo(
    () => getLineItems().reduce((sum, li) => sum + li.lineTotal, 0),
    [getLineItems]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((o) => !o),
        getLineItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
