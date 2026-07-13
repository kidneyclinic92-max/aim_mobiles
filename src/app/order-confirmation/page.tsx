"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Suspense } from "react";

type OrderData = {
  orderId: string;
  status?: string;
  total: number;
  shipping: { firstName: string; lastName: string; email: string };
  date: string;
};

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order");
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("lastOrder");
      if (stored) setOrder(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  const orderId = order?.orderId || orderParam || "AM-UNKNOWN";

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <AnimatedSection>
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle className="h-10 w-10 text-emerald-400" />
        </div>

        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {order?.status === "pending" ? "Order Received!" : "Order Confirmed!"}
        </h1>
        <p className="mt-4 text-zinc-400">
          {order?.status === "pending"
            ? "Thank you for your order. Our team will review it shortly. You'll receive a confirmation email once it's approved."
            : "Thank you for your purchase. Your order has been placed successfully."}
        </p>

        <div className="mt-8 glass-card p-6 text-left">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Package className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">Order Details</h2>
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">Order Number</dt>
              <dd className="font-mono font-medium text-cyan-400">{orderId}</dd>
            </div>
            {order && (
              <>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Total Paid</dt>
                  <dd className="font-medium text-white">
                    {formatPrice(order.total)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Email</dt>
                  <dd className="text-white">{order.shipping.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Estimated Delivery</dt>
                  <dd className="text-white">3–5 business days</dd>
                </div>
              </>
            )}
          </dl>
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          {order?.status === "pending"
            ? "A confirmation email will be sent to your inbox after admin approval."
            : "A confirmation email has been sent to your inbox. You can track your order using the link below."}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href={`/track-order?order=${orderId}`}>
            <Button>
              Track Order
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="secondary">Continue Shopping</Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
