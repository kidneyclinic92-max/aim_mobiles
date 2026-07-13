import type { Metadata } from "next";
import { getSiteContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getSiteContent();
  return {
    title: contact.metaTitle,
    description: contact.metaDescription,
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
