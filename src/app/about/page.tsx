import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Aim Mobiles — our mission to deliver premium mobile technology with exceptional service.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
