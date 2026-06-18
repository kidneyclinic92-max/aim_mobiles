import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product, ProductVariant } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getDefaultVariant(product: Product): ProductVariant {
  return product.variants[0];
}

export function getProductById(
  products: Product[],
  id: string
): Product | undefined {
  return products.find((p) => p.id === id);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export function calculateDiscount(
  price: number,
  originalPrice?: number
): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
