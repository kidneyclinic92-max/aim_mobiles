"use client";

import Link from "next/link";
import Image from "next/image";
import { AtSign, Camera, Mail, MapPin, MessageCircle, Phone, Play } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useSiteContent } from "@/store/content-context";

const socialIcons = [AtSign, Camera, MessageCircle, Play];

export function Footer() {
  const { content } = useSiteContent();
  const { site, navigation, footer } = content;

  const brandParts = site.name.match(/^(.+?)(Mobiles?)$/i);
  const brandPrefix = brandParts?.[1] ?? site.name.slice(0, 3);
  const brandSuffix = brandParts?.[2] ?? site.name.slice(3);

  return (
    <footer className="relative mt-auto border-t border-white/[0.06] bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-zinc-700/50">
                <Image
                  src="/assets/icon.jpg"
                  alt={site.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="text-lg font-bold text-zinc-100">
                {brandPrefix}{brandSuffix}
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              {site.description}
            </p>
            <div className="flex gap-2">
              {navigation.social.map((social, i) => {
                const Icon = socialIcons[i] ?? AtSign;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-cyan-400/30 hover:bg-white/[0.06] hover:text-cyan-300"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">Shop</h3>
            <ul className="space-y-2.5 text-center">
              {navigation.footerShop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">Support</h3>
            <ul className="space-y-2.5 text-center">
              {navigation.footerSupport.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2.5 text-center text-sm text-zinc-400">
              <p className="flex items-center justify-center gap-2.5"><Phone className="h-4 w-4 text-zinc-400" />{site.phone}</p>
              <p className="flex items-center justify-center gap-2.5"><Mail className="h-4 w-4 text-zinc-400" />{site.email}</p>
              <p className="flex items-center justify-center gap-2.5"><MapPin className="h-4 w-4 text-zinc-400" />{site.location}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">{footer.newsletterTitle}</h3>
            <p className="mb-4 text-center text-sm text-zinc-400">{footer.newsletterDescription}</p>
            <form className="space-y-3">
              <Input type="email" placeholder={footer.newsletterPlaceholder} aria-label="Email" />
              <Button type="submit" className="w-full" size="sm">{footer.newsletterButton}</Button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} {site.copyright}</p>
          <div className="flex gap-6 text-xs text-zinc-500">
            {navigation.legal.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-zinc-300">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
