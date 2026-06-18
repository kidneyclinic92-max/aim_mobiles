"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/store/cart-context";
import { ToastProvider } from "@/store/toast-context";
import { WishlistProvider } from "@/store/wishlist-context";
import { ContentProvider } from "@/store/content-context";
import { CartSidebar } from "@/components/layout/CartSidebar";
import { ToastContainer } from "@/components/ui/Toast";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ContentProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartSidebar />
            <ToastContainer />
          </WishlistProvider>
        </CartProvider>
      </ContentProvider>
    </ToastProvider>
  );
}
