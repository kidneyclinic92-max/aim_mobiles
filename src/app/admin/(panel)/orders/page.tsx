"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle, Clock, Mail, Package, XCircle } from "lucide-react";
import type { Order } from "@/lib/orders/types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "text-amber-400 bg-amber-500/10" },
  approved: { label: "Approved", icon: CheckCircle, className: "text-emerald-400 bg-emerald-500/10" },
  rejected: { label: "Rejected", icon: XCircle, className: "text-red-400 bg-red-500/10" },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to load orders");
      setOrders(await res.json());
    } catch {
      setError("Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionId(id);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Action failed");

      if (action === "approve") {
        setSuccess(`Order ${id} approved — confirmation email sent to customer.`);
      } else {
        setSuccess(`Order ${id} rejected.`);
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setActionId(null);
    }
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="mt-1 text-zinc-500">
            Review customer orders and approve to send confirmation emails.
          </p>
        </div>
        {pendingCount > 0 && (
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-400">
            {pendingCount} pending
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {loading ? (
        <p className="text-zinc-500">Loading orders…</p>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <Package className="mx-auto h-10 w-10 text-zinc-600" />
          <p className="mt-4 text-zinc-400">No orders yet.</p>
          <p className="mt-1 text-sm text-zinc-600">Orders placed at checkout will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;
            const isProcessing = actionId === order.id;

            return (
              <div
                key={order.id}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-cyan-400">
                        {order.id}
                      </span>
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", status.className)}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">
                      {order.shipping.firstName} {order.shipping.lastName} · {order.shipping.email}
                    </p>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{formatPrice(order.total)}</p>
                    <p className="text-xs text-zinc-500">{order.items.length} item(s)</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                  {order.items.map((item) => (
                    <li key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
                      <span className="text-zinc-300">
                        {item.productName} <span className="text-zinc-600">× {item.quantity}</span>
                      </span>
                      <span className="text-zinc-400">{formatPrice(item.lineTotal)}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-3 text-xs text-zinc-500">
                  Ship to: {order.shipping.address}, {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                </p>

                {order.emailSentAt && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-500/80">
                    <Mail className="h-3 w-3" />
                    Email sent {new Date(order.emailSentAt).toLocaleString()}
                  </p>
                )}

                {order.status === "pending" && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                    <button
                      onClick={() => handleAction(order.id, "approve")}
                      disabled={isProcessing}
                      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                      {isProcessing ? "Approving…" : "Approve & Send Email"}
                    </button>
                    <button
                      onClick={() => handleAction(order.id, "reject")}
                      disabled={isProcessing}
                      className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
