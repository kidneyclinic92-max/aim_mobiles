import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSiteContent } from "@/lib/cms/store";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const content = await getSiteContent();
  return content.products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const content = await getSiteContent();
  const product = content.products.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const content = await getSiteContent();
  const product = content.products.find((p) => p.id === id);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
