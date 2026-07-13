"use client";

import { ChevronDown, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import type { Category, FilterState } from "@/lib/types";
import {
  getAllBrands,
  getAllColors,
  getAllRamOptions,
  getAllStorageOptions,
  getPriceRange,
  getProductsList,
  getCategoriesList,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSiteContent } from "@/store/content-context";

type FiltersProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
};

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.06] py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-white"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-zinc-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function CheckboxFilter({
  label,
  checked,
  onChange,
  count,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/30 focus:ring-offset-0"
      />
      <span className="flex-1 text-sm text-zinc-300">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-zinc-500">{count}</span>
      )}
    </label>
  );
}

function ListItem({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-cyan-400/10 font-semibold text-cyan-300"
          : "text-zinc-300 hover:bg-white/5 hover:text-white"
      )}
    >
      <span className="flex items-center gap-1.5">
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 transition-all",
            active
              ? "text-cyan-400"
              : "-ml-1 w-0 opacity-0 group-hover:ml-0 group-hover:w-3.5 group-hover:opacity-100"
          )}
        />
        {label}
      </span>
      {count !== undefined && (
        <span className={cn("text-xs", active ? "text-cyan-400/80" : "text-zinc-500")}>
          {count}
        </span>
      )}
    </button>
  );
}

export function Filters({
  filters,
  onChange,
  isMobileOpen,
  onMobileClose,
}: FiltersProps) {
  const { content } = useSiteContent();
  const { browse } = content.shop;
  const products = getProductsList();
  const categoryData = getCategoriesList();
  const brands = getAllBrands();
  const ramOptions = getAllRamOptions();
  const storageOptions = getAllStorageOptions();
  const colorOptions = getAllColors();
  const priceRange = getPriceRange();

  const categoryCounts = new Map<string, number>();
  const brandCounts = new Map<string, number>();
  for (const p of products) {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1);
    brandCounts.set(p.brand, (brandCounts.get(p.brand) ?? 0) + 1);
  }

  const toggleArray = <T extends string>(
    arr: T[],
    value: T,
    key: keyof FilterState
  ) => {
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ ...filters, [key]: next });
  };

  const activeCount =
    filters.brands.length +
    filters.categories.length +
    filters.ram.length +
    filters.storage.length +
    filters.colors.length +
    (filters.priceMin > priceRange.min || filters.priceMax < priceRange.max
      ? 1
      : 0);

  const clearAll = () => {
    onChange({
      ...filters,
      brands: [],
      categories: [],
      ram: [],
      storage: [],
      colors: [],
      priceMin: priceRange.min,
      priceMax: priceRange.max,
    });
  };

  const filterContent = (
    <>
      {/* Categories listing */}
      <div className="mb-2">
        <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
          {browse.categoriesHeading}
        </h2>
        <div className="space-y-0.5">
          <ListItem
            label={browse.allProductsLabel}
            count={products.length}
            active={filters.categories.length === 0}
            onClick={() => onChange({ ...filters, categories: [] })}
          />
          {categoryData.map((cat) => (
            <ListItem
              key={cat.id}
              label={cat.name}
              count={categoryCounts.get(cat.id) ?? 0}
              active={filters.categories.includes(cat.id)}
              onClick={() =>
                toggleArray(filters.categories, cat.id as Category, "categories")
              }
            />
          ))}
        </div>
      </div>

      {/* Brands listing */}
      <div className="border-t border-white/[0.06] pt-4">
        <h2 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
          {browse.brandsHeading}
        </h2>
        <div className="space-y-0.5">
          {brands.map((brand) => (
            <ListItem
              key={brand}
              label={brand}
              count={brandCounts.get(brand) ?? 0}
              active={filters.brands.includes(brand)}
              onClick={() => toggleArray(filters.brands, brand, "brands")}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
          <h2 className="text-sm font-semibold text-white">{browse.filtersHeading}</h2>
          {activeCount > 0 && (
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/15 px-2 py-0.5 text-xs font-semibold text-cyan-300">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-zinc-500 transition-colors hover:text-cyan-400"
          >
            {browse.clearAllLabel}
          </button>
        )}
      </div>

      <FilterSection title="Price Range">
        <div className="space-y-3 px-2">
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            step={10}
            value={filters.priceMax}
            onChange={(e) =>
              onChange({ ...filters, priceMax: Number(e.target.value) })
            }
            className="w-full accent-cyan-500"
            aria-label="Maximum price"
          />
          <div className="flex justify-between text-xs text-zinc-400">
            <span>${filters.priceMin}</span>
            <span className="font-medium text-cyan-400">${filters.priceMax}</span>
          </div>
        </div>
      </FilterSection>

      {ramOptions.length > 0 && (
        <FilterSection title="RAM">
          {ramOptions.map((ram) => (
            <CheckboxFilter
              key={ram}
              label={ram}
              checked={filters.ram.includes(ram)}
              onChange={() => toggleArray(filters.ram, ram, "ram")}
            />
          ))}
        </FilterSection>
      )}

      {storageOptions.length > 0 && (
        <FilterSection title="Storage">
          {storageOptions.map((storage) => (
            <CheckboxFilter
              key={storage}
              label={storage}
              checked={filters.storage.includes(storage)}
              onChange={() => toggleArray(filters.storage, storage, "storage")}
            />
          ))}
        </FilterSection>
      )}

      {colorOptions.length > 0 && (
        <FilterSection title="Color" defaultOpen={false}>
          {colorOptions.map((color) => (
            <CheckboxFilter
              key={color}
              label={color}
              checked={filters.colors.includes(color)}
              onChange={() => toggleArray(filters.colors, color, "colors")}
            />
          ))}
        </FilterSection>
      )}
    </>
  );

  return (
    <>
      {/* Desktop/tablet sidebar */}
      <aside className="sticky top-32 hidden max-h-[calc(100vh-9rem)] self-start overflow-y-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 scrollbar-hide md:block">
        {filterContent}
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity",
            isMobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={onMobileClose}
        />
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-full max-w-sm overflow-y-auto bg-dark-elevated border-r border-white/10 p-6 transition-transform duration-500",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Filters</h2>
            <button
              onClick={onMobileClose}
              className="rounded-xl p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {filterContent}
        </div>
      </div>
    </>
  );
}
