import type { Product } from "@/lib/types";
import type { SiteContent } from "./types";
import { getDefaultContent } from "./defaults";

let contentCache: SiteContent | null = null;

export function setContentCache(content: SiteContent | null) {
  contentCache = content;
}

export function getContent(): SiteContent {
  return contentCache ?? getDefaultContent();
}

export function getActiveProducts(): Product[] {
  return getContent().products;
}

export function getActiveCategories() {
  return getContent().categories;
}

export function getActiveBrands(): string[] {
  return getContent().brands;
}

export function getProductByIdFromContent(id: string): Product | undefined {
  return getActiveProducts().find((p) => p.id === id);
}
