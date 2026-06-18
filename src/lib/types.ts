export type Category =
  | "smartphones"
  | "earbuds"
  | "cases"
  | "chargers"
  | "smartwatches"
  | "accessories";

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductVariant = {
  id: string;
  storage: string;
  ram: string;
  price: number;
  inStock: boolean;
};

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  colors: ProductColor[];
  variants: ProductVariant[];
  specs: Record<string, string>;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  tags: string[];
};

export type CartItem = {
  productId: string;
  variantId: string;
  color: string;
  quantity: number;
};

export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export type FilterState = {
  search: string;
  brands: string[];
  categories: Category[];
  priceMin: number;
  priceMax: number;
  ram: string[];
  storage: string[];
  colors: string[];
};
