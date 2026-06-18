import type { Product } from "./types";
import {
  getActiveProducts,
  getActiveCategories,
  getActiveBrands,
} from "./cms/content-access";

export { products, categories, brands } from "./products-data";

export function getFeaturedProducts(): Product[] {
  return getActiveProducts().filter((p) => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return getActiveProducts().filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return getActiveProducts().filter((p) => p.isNew);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getActiveProducts()
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getFrequentlyBoughtTogether(product: Product): Product[] {
  return getActiveProducts()
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === "cases" ||
          p.category === "chargers" ||
          p.category === "accessories")
    )
    .slice(0, 3);
}

export function getAllBrands(): string[] {
  const fromProducts = [...new Set(getActiveProducts().map((p) => p.brand))].sort();
  const fromContent = getActiveBrands();
  return [...new Set([...fromContent, ...fromProducts])].sort();
}

export function getAllRamOptions(): string[] {
  const rams = new Set<string>();
  getActiveProducts().forEach((p) =>
    p.variants.forEach((v) => {
      if (v.ram !== "N/A") rams.add(v.ram);
    })
  );
  return [...rams].sort();
}

export function getAllStorageOptions(): string[] {
  const storages = new Set<string>();
  getActiveProducts().forEach((p) =>
    p.variants.forEach((v) => {
      if (v.storage !== "N/A") storages.add(v.storage);
    })
  );
  return [...storages].sort();
}

export function getAllColors(): string[] {
  const colors = new Set<string>();
  getActiveProducts().forEach((p) => p.colors.forEach((c) => colors.add(c.name)));
  return [...colors].sort();
}

export function getPriceRange(): { min: number; max: number } {
  const prices = getActiveProducts().map((p) => p.price);
  if (!prices.length) return { min: 0, max: 1000 };
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return getActiveProducts()
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    )
    .slice(0, 6);
}

export function getProductsList(): Product[] {
  return getActiveProducts();
}

export function getCategoriesList() {
  return getActiveCategories();
}
