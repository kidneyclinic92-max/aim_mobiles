import nodemailer from "nodemailer";
import type { Order } from "@/lib/orders/types";
import { formatPrice } from "@/lib/utils";

const GMAIL_USER = process.env.GMAIL_USER ?? "";
const GMAIL_PASS = (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s+/g, "");

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let transporter: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter | null {
  if (!GMAIL_USER || !GMAIL_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_PASS },
    });
  }
  return transporter;
}

export function isEmailConfigured(): boolean {
  return Boolean(GMAIL_USER && GMAIL_PASS);
}

export async function sendOrderApprovedEmail(order: Order): Promise<void> {
  const tx = getTransport();
  if (!tx) {
    throw new Error("Gmail is not configured (GMAIL_USER / GMAIL_APP_PASSWORD)");
  }

  const customerName = `${order.shipping.firstName} ${order.shipping.lastName}`.trim();
  const subject = `Your Aim Mobiles order ${order.id} is confirmed`;

  const itemLines = order.items
    .map(
      (item) =>
        `  • ${item.productName} (${item.color}) × ${item.quantity} — ${formatPrice(item.lineTotal)}`
    )
    .join("\n");

  const text = [
    `Hi ${customerName},`,
    "",
    `Great news — your order has been approved and confirmed!`,
    "",
    `Order number: ${order.id}`,
    "",
    "Items:",
    itemLines,
    "",
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Shipping: ${order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}`,
    `Tax: ${formatPrice(order.tax)}`,
    `Total: ${formatPrice(order.total)}`,
    "",
    "Shipping to:",
    `${order.shipping.address}`,
    `${order.shipping.city}, ${order.shipping.state} ${order.shipping.zip}`,
    `${order.shipping.country}`,
    "",
    "Estimated delivery: 3–5 business days",
    "",
    "Thank you for shopping with Aim Mobiles!",
    "",
    "— Aim Mobiles Team",
  ].join("\n");

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(item.productName)}</td>
        <td style="padding:8px 8px;border-bottom:1px solid #eee;color:#666">${escapeHtml(item.color)}</td>
        <td style="padding:8px 8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${escapePrice(item.lineTotal)}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111">
      <h1 style="color:#0891b2;font-size:22px">Order Confirmed ✓</h1>
      <p>Hi ${escapeHtml(customerName)},</p>
      <p>Your order <strong>${escapeHtml(order.id)}</strong> has been approved and is being prepared for shipment.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin:20px 0">
        <thead>
          <tr style="text-align:left;color:#666;font-size:12px">
            <th style="padding-bottom:8px">Product</th>
            <th style="padding-bottom:8px">Color</th>
            <th style="padding-bottom:8px;text-align:center">Qty</th>
            <th style="padding-bottom:8px;text-align:right">Price</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <table style="width:100%;font-size:14px;margin-bottom:20px">
        <tr><td style="color:#666;padding:4px 0">Subtotal</td><td style="text-align:right">${escapePrice(order.subtotal)}</td></tr>
        <tr><td style="color:#666;padding:4px 0">Shipping</td><td style="text-align:right">${order.shippingCost === 0 ? "Free" : escapePrice(order.shippingCost)}</td></tr>
        <tr><td style="color:#666;padding:4px 0">Tax</td><td style="text-align:right">${escapePrice(order.tax)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold">Total</td><td style="text-align:right;font-weight:bold;color:#0891b2">${escapePrice(order.total)}</td></tr>
      </table>
      <p style="font-size:14px;color:#666">
        <strong>Shipping to:</strong><br/>
        ${escapeHtml(order.shipping.address)}<br/>
        ${escapeHtml(order.shipping.city)}, ${escapeHtml(order.shipping.state)} ${escapeHtml(order.shipping.zip)}<br/>
        ${escapeHtml(order.shipping.country)}
      </p>
      <p style="font-size:13px;color:#888;margin-top:24px">Estimated delivery: 3–5 business days</p>
      <p style="font-size:12px;color:#aaa;margin-top:32px">— Aim Mobiles</p>
    </div>
  `;

  await tx.sendMail({
    from: `"Aim Mobiles" <${GMAIL_USER}>`,
    to: order.shipping.email,
    subject,
    text,
    html,
  });
}

function escapePrice(amount: number): string {
  return escapeHtml(formatPrice(amount));
}
