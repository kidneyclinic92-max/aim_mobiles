import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/AboutPageContent";
import { getSiteContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getSiteContent();
  return {
    title: about.metaTitle,
    description: about.metaDescription,
  };
}

export default function AboutPage() {
  return <AboutPageContent />;
}
