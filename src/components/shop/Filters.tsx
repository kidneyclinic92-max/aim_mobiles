"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import type { Category, FilterState } from "@/lib/types";
import {
  getAllBrands,
  getAllColors,
  getAllRamOptions,
  getAllStorageOptions,
  getPriceRange,
  categories as categoryData,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
    <div className="border-b border-white/5 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-white"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform",
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
      <span className="flex-1 text-sm text-gray-300">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-gray-600">{count}</span>
      )}
    </label>
  );
}

export function Filters({
  filters,
  onChange,
  isMobileOpen,
  onMobileClose,
}: FiltersProps) {
  const brands = getAllBrands();
  const ramOptions = getAllRamOptions();
  const storageOptions = getAllStorageOptions();
  const colorOptions = getAllColors();
  const priceRange = getPriceRange();

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

  const content = (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
          <h2 className="text-sm font-semibold text-white">Filters</h2>
          {activeCount > 0 && (
            <span className="rounded-none border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs text-white">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-gray-500 hover:text-cyan-400"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Category">
        {categoryData.map((cat) => (
          <CheckboxFilter
            key={cat.id}
            label={cat.name}
            checked={filters.categories.includes(cat.id)}
            onChange={() =>
              toggleArray(filters.categories, cat.id as Category, "categories")
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Brand">
        {brands.map((brand) => (
          <CheckboxFilter
            key={brand}
            label={brand}
            checked={filters.brands.includes(brand)}
            onChange={() => toggleArray(filters.brands, brand, "brands")}
          />
        ))}
      </FilterSection>

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
          <div className="flex justify-between text-xs text-gray-400">
            <span>${filters.priceMin}</span>
            <span className="text-cyan-400 font-medium">${filters.priceMax}</span>
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
      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
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
              className="rounded-xl p-2 text-gray-400 hover:bg-white/5"
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {content}
        </div>
      </div>
    </>
  );
}
