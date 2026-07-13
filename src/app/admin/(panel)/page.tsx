import Link from "next/link";
import {
  ClipboardList,
  FileText,
  Home,
  Package,
  Settings,
  ShoppingBag,
  Store,
} from "lucide-react";

const sections = [
  {
    title: "Storefront",
    items: [
      { href: "/admin/site", label: "Site Settings", icon: Settings, desc: "Brand, logo, announcement, SEO, footer" },
      { href: "/admin/navigation", label: "Navigation", icon: Store, desc: "Menus and footer links" },
      { href: "/admin/commerce", label: "Commerce", icon: ShoppingBag, desc: "Shipping, tax, delivery" },
    ],
  },
  {
    title: "Pages",
    items: [
      { href: "/admin/home", label: "Home Page", icon: Home, desc: "Hero carousel, sections, trust signals, testimonials" },
      { href: "/admin/shop", label: "Shop Page", icon: Store, desc: "Titles, sort tabs, browse sidebar, search" },
      { href: "/admin/about", label: "About Page", icon: FileText, desc: "Story, stats, values" },
      { href: "/admin/contact", label: "Contact Page", icon: FileText, desc: "Contact info and form copy" },
      { href: "/admin/warranty", label: "Warranty Page", icon: FileText, desc: "Coverage and claims" },
    ],
  },
  {
    title: "Orders",
    items: [
      { href: "/admin/orders", label: "Orders", icon: ClipboardList, desc: "Approve orders & send confirmation emails" },
    ],
  },
  {
    title: "Catalog",
    items: [
      { href: "/admin/products", label: "Products", icon: Package, desc: "18 products — full editor" },
      { href: "/admin/categories", label: "Categories", icon: ShoppingBag, desc: "Category cards and filters" },
    ],
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-zinc-500">
          Manage all pages and content across your storefront.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {section.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-cyan-500/30 hover:bg-white/[0.04]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition-colors group-hover:bg-cyan-500/20">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-white">{item.label}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
