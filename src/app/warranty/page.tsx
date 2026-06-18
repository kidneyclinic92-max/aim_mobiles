import type { Metadata } from "next";
import { WarrantyPageContent } from "@/components/pages/WarrantyPageContent";

export const metadata: Metadata = {
  title: "Warranty",
  description:
    "Aim Mobiles warranty coverage — 2-year protection on all devices with hassle-free claims.",
};

export default function WarrantyPage() {
  return <WarrantyPageContent />;
}
