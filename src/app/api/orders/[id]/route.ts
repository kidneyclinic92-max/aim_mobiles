import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { sendOrderApprovedEmail } from "@/lib/email/mailer";
import { getOrderById, updateOrder } from "@/lib/orders/store";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const action = body.action as string;

  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (action === "approve") {
    if (order.status === "approved") {
      return NextResponse.json({ error: "Order already approved" }, { status: 400 });
    }

    try {
      await sendOrderApprovedEmail(order);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to send email";
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const updated = await updateOrder(id, {
      status: "approved",
      approvedAt: new Date().toISOString(),
      emailSentAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, order: updated });
  }

  if (action === "reject") {
    if (order.status === "rejected") {
      return NextResponse.json({ error: "Order already rejected" }, { status: 400 });
    }

    const updated = await updateOrder(id, {
      status: "rejected",
      rejectedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, order: updated });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function GET(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
