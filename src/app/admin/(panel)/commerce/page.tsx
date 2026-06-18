"use client";

import { AdminField, AdminNumberField, AdminSection, AdminSaveBar } from "@/components/admin/AdminForm";
import { useAdminContent } from "@/hooks/useAdminContent";

export default function AdminCommercePage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { commerce } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Commerce Settings</h1>
        <p className="mt-1 text-zinc-500">Shipping, tax, and delivery configuration.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <AdminSection title="Pricing Rules">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminNumberField
            label="Free Shipping Threshold ($)"
            value={commerce.freeShippingThreshold}
            onChange={(v) => update((c) => ({ ...c, commerce: { ...c.commerce, freeShippingThreshold: v } }))}
          />
          <AdminNumberField
            label="Shipping Cost ($)"
            value={commerce.shippingCost}
            step={0.01}
            onChange={(v) => update((c) => ({ ...c, commerce: { ...c.commerce, shippingCost: v } }))}
          />
          <AdminNumberField
            label="Tax Rate (decimal, e.g. 0.08 = 8%)"
            value={commerce.taxRate}
            step={0.01}
            onChange={(v) => update((c) => ({ ...c, commerce: { ...c.commerce, taxRate: v } }))}
          />
          <AdminField
            label="Delivery Estimate"
            value={commerce.deliveryEstimate}
            onChange={(v) => update((c) => ({ ...c, commerce: { ...c.commerce, deliveryEstimate: v } }))}
          />
        </div>
      </AdminSection>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
