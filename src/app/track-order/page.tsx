"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  MapPin,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Suspense } from "react";

const trackingSteps = [
  { status: "Order Placed", date: "Jun 8, 2026", completed: true },
  { status: "Processing", date: "Jun 8, 2026", completed: true },
  { status: "Shipped", date: "Jun 9, 2026", completed: true },
  { status: "Out for Delivery", date: "Jun 11, 2026", completed: true, active: true },
  { status: "Delivered", date: "Estimated Jun 12", completed: false },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get("order") || "";
  const [orderId, setOrderId] = useState(initialOrder);
  const [tracked, setTracked] = useState(!!initialOrder);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setTracked(true);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
          <Truck className="h-8 w-8 text-cyan-400" />
        </div>
        <h1 className="text-4xl font-bold text-white">
          Track Your <span className="text-gradient">Order</span>
        </h1>
        <p className="mt-4 text-gray-400">
          Enter your order number to see real-time shipping updates.
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <form onSubmit={handleTrack} className="glass-card p-6 flex gap-3">
          <Input
            placeholder="Order number (e.g. AM-ABC123)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1"
            aria-label="Order number"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Search className="h-4 w-4" />
                Track
              </>
            )}
          </Button>
        </form>
      </AnimatedSection>

      {tracked && (
        <AnimatedSection className="mt-10">
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-mono text-lg font-semibold text-cyan-400">
                  {orderId.toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-sm font-medium text-emerald-400 flex items-center gap-1 justify-end">
                  <Truck className="h-4 w-4" />
                  Out for Delivery
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
              <ul className="space-y-6">
                {trackingSteps.map((step) => (
                  <li key={step.status} className="relative flex items-start gap-4 pl-10">
                    <div
                      className={`absolute left-2.5 flex h-3 w-3 -translate-x-1/2 rounded-full ${
                        step.completed
                          ? step.active
                            ? "bg-cyan-500 shadow-lg shadow-cyan-500/50 animate-pulse"
                            : "bg-emerald-500"
                          : "bg-white/20"
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          step.completed ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {step.status}
                      </p>
                      <p className="text-xs text-gray-500">{step.date}</p>
                    </div>
                    {step.completed && !step.active && (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-xl bg-white/[0.02] p-4 flex items-start gap-3">
              <MapPin className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">
                  Delivery Address
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  123 Tech Boulevard, San Francisco, CA 94105
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-white/[0.02] p-4 flex items-start gap-3">
              <Package className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">
                  Carrier: Aim Express
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Tracking: AE{orderId.replace(/[^A-Z0-9]/gi, "").slice(0, 12)}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
