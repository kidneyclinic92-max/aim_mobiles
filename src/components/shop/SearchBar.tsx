"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useSiteContent } from "@/store/content-context";
import type { Product } from "@/lib/types";

type SearchBarProps = {
  autoFocus?: boolean;
  onClose?: () => void;
  className?: string;
};

export function SearchBar({ autoFocus, onClose, className }: SearchBarProps) {
  const { content } = useSiteContent();
  const placeholder = content.shop.searchPlaceholder;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (query.trim().length >= 2) {
      setResults(searchProducts(query));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  return (
    <div ref={containerRef} className={`relative ${className || ""}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-white placeholder:text-zinc-500 backdrop-blur-sm transition-all focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/15"
          aria-label="Search products"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-500 hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul
          className="absolute top-full left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-dark-elevated shadow-2xl backdrop-blur-xl"
          role="listbox"
        >
          {results.map((product) => (
            <li key={product.id} role="option">
              <Link
                href={`/product/${product.id}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                  onClose?.();
                }}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/5"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/5">
                  <Image
                    src={product.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-zinc-500">{product.brand}</p>
                </div>
                <span className="text-sm font-semibold text-cyan-400">
                  {formatPrice(product.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-white/10 bg-dark-elevated p-6 text-center shadow-2xl">
          <p className="text-sm text-zinc-400">No products found for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
