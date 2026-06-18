"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/site", label: "Site Settings", icon: Settings },
  { href: "/admin/navigation", label: "Navigation", icon: Store },
  { href: "/admin/home", label: "Home Page", icon: Home },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/categories", label: "Categories", icon: ShoppingBag },
  { href: "/admin/shop", label: "Shop Page", icon: Store },
  { href: "/admin/about", label: "About Page", icon: FileText },
  { href: "/admin/contact", label: "Contact Page", icon: FileText },
  { href: "/admin/warranty", label: "Warranty Page", icon: FileText },
  { href: "/admin/commerce", label: "Commerce", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/cms/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#08080c]">
      <div className="border-b border-white/10 p-5">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-black text-white">
            A
          </div>
          <div>
            <p className="text-sm font-bold text-white">Aim Mobiles</p>
            <p className="text-xs text-zinc-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-white"
        >
          <Store className="h-4 w-4" />
          View Storefront
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
