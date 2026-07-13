"use client";

import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrowseSidebar } from "@/components/layout/BrowseSidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <BrowseSidebar />
      </Suspense>
      <main className="flex-1 pt-[7.75rem]">{children}</main>
      <Footer />
    </>
  );
}
