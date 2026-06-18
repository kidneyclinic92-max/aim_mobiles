import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { addOrder, getOrders } from "@/lib/orders/store";
import type { CreateOrderPayload, Order } from "@/lib/orders/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderPayload;

    if (!body.items?.length || !body.shipping?.email) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const email = body.shipping.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const order: Order = {
      id: `AM-${Date.now().toString(36).toUpperCase()}`,
      status: "pending",
      items: body.items,
      shipping: { ...body.shipping, email },
      subtotal: body.subtotal,
      shippingCost: body.shippingCost,
      tax: body.tax,
      total: body.total,
      createdAt: new Date().toISOString(),
    };

    await addOrder(order);

    return NextResponse.json(
      { orderId: order.id, status: order.status },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
