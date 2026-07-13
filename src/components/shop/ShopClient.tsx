"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { getProductsList, getPriceRange, getCategoriesList } from "@/lib/products";
import { useSiteContent } from "@/store/content-context";
import type { FilterState, Product, SortOption } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Filters } from "./Filters";
import { QuickViewModal } from "./QuickViewModal";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

const sortTabs: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Relevance" },
  { value: "newest", label: "New" },
  { value: "price-desc", label: "Highest Price" },
  { value: "price-asc", label: "Lowest Price" },
];

function sortProducts(items: Product[], sort: SortOption, bestSellerOnly = false): Product[] {
  let sorted = bestSellerOnly ? items.filter((p) => p.isBestSeller) : [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    default:
      return sorted.sort(
        (a, b) =>
          (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating
      );
  }
}

function filterProducts(items: Product[], filters: FilterState): Product[] {
  return items.filter((p) => {
    if (
      filters.search &&
      !p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !p.brand.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
    if (filters.categories.length && !filters.categories.includes(p.category))
      return false;
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
    if (filters.ram.length && !p.variants.some((v) => filters.ram.includes(v.ram)))
      return false;
    if (
      filters.storage.length &&
      !p.variants.some((v) => filters.storage.includes(v.storage))
    )
      return false;
    if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c.name)))
      return false;
    return true;
  });
}

export function ShopClient() {
  const searchParams = useSearchParams();
  const { content } = useSiteContent();
  const products = getProductsList();
  const categories = getCategoriesList();
  const priceRange = getPriceRange();
  const categoryParam = searchParams.get("category");
  const sortParam = searchParams.get("sort");
  const brandParam = searchParams.get("brand");

  const pageTitle = useMemo(() => {
    if (sortParam === "newest") return "New Arrivals";
    if (sortParam === "bestseller") return "Deals";
    if (brandParam) return brandParam;
    if (categoryParam) {
      const cat = categories.find((c) => c.id === categoryParam);
      return cat?.name ?? "Shop";
    }
    return content.shop.title;
  }, [sortParam, categoryParam, brandParam, categories, content.shop.title]);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    brands: brandParam ? [brandParam] : [],
    categories: categoryParam ? [categoryParam as FilterState["categories"][0]] : [],
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    ram: [],
    storage: [],
    colors: [],
  });
  const [sort, setSort] = useState<SortOption>("featured");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const bestSellerOnly = sortParam === "bestseller";
  const newOnly = sortParam === "newest";

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      categories: categoryParam ? [categoryParam as FilterState["categories"][0]] : [],
      brands: brandParam ? [brandParam] : [],
    }));
    if (sortParam === "newest") setSort("newest");
    else if (sortParam === "bestseller") setSort("featured");
  }, [categoryParam, sortParam, brandParam]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let items = filterProducts(products, filters);
    if (newOnly) items = items.filter((p) => p.isNew);
    return sortProducts(items, sort, bestSellerOnly);
  }, [filters, sort, products, bestSellerOnly, newOnly]);

  const handleQuickView = useCallback((product: Product) => {
    setQuickView(product);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-4 flex items-center justify-center gap-1.5 text-sm text-zinc-500">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-zinc-300">{pageTitle}</span>
        </nav>

        <h1 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">{pageTitle}</h1>

        {/* Sort tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-b border-white/[0.08] pb-4">
          {sortTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSort(tab.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                sort === tab.value
                  ? "border border-cyan-400/30 bg-cyan-400/15 text-cyan-300"
                  : "border border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="ml-auto flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-white md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="mt-8 md:grid md:grid-cols-[240px_1fr] md:gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
          <Filters
            filters={filters}
            onChange={setFilters}
            isMobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          <div className="min-w-0 flex-1">
            <p className="mb-5 text-sm text-zinc-500">
              <span className="font-semibold text-white">{filtered.length}</span> products
            </p>

            {loading ? (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] py-20 text-center">
                <p className="text-lg font-medium text-zinc-300">No products found</p>
                <p className="mt-1 text-sm text-zinc-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onQuickView={handleQuickView} variant="grid" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
