"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, Lock, Truck } from "lucide-react";
import { useCart } from "@/store/cart-context";
import { useSiteContent } from "@/store/content-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useToast } from "@/store/toast-context";

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { getLineItems, subtotal, clearCart } = useCart();
  const { content } = useSiteContent();
  const { freeShippingThreshold, shippingCost: baseShippingCost, taxRate } = content.commerce;
  const lineItems = getLineItems();
  const [step, setStep] = useState<Step>("shipping");
  const [processing, setProcessing] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const shippingCost = subtotal >= freeShippingThreshold ? 0 : baseShippingCost;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  if (lineItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">No items to checkout</h1>
        <Link href="/shop" className="mt-6 inline-block">
          <Button>Go to Shop</Button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setProcessing(true);
    try {
      const payload = {
        items: lineItems.map(({ item, product, variant, lineTotal }) => ({
          productId: item.productId,
          productName: product.name,
          variantId: item.variantId,
          color: item.color,
          quantity: item.quantity,
          unitPrice: variant.price,
          lineTotal,
          image: product.images[0],
        })),
        shipping,
        subtotal,
        shippingCost,
        tax,
        total,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to place order");

      sessionStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId: data.orderId,
          status: data.status,
          items: lineItems,
          total,
          shipping,
          date: new Date().toISOString(),
        })
      );
      clearCart();
      router.push(`/order-confirmation?order=${data.orderId}`);
    } catch {
      showToast("Failed to place order. Please try again.", "error");
    } finally {
      setProcessing(false);
    }
  };

  const steps: { id: Step; label: string; icon: typeof Truck }[] = [
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: Lock },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>
        <h1 className="text-center text-3xl font-bold text-white">Checkout</h1>
      </AnimatedSection>

      {/* Step indicator */}
      <AnimatedSection className="mt-8">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => {
                  const stepIndex = steps.findIndex((st) => st.id === s.id);
                  const currentIndex = steps.findIndex((st) => st.id === step);
                  if (stepIndex <= currentIndex) setStep(s.id);
                }}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
                  step === s.id
                    ? "border border-cyan-400/30 bg-cyan-400/15 text-cyan-300"
                    : steps.findIndex((st) => st.id === s.id) <
                        steps.findIndex((st) => st.id === step)
                      ? "text-emerald-400"
                      : "text-zinc-500"
                }`}
              >
                <s.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className="h-px w-8 sm:w-16 bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </AnimatedSection>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === "shipping" && (
            <AnimatedSection>
              <div className="glass-card p-6 sm:p-8">
                <h2 className="mb-6 text-center text-xl font-semibold text-white">
                  Shipping Information
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="First Name"
                    value={shipping.firstName}
                    onChange={(e) =>
                      setShipping({ ...shipping, firstName: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Last Name"
                    value={shipping.lastName}
                    onChange={(e) =>
                      setShipping({ ...shipping, lastName: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    className="sm:col-span-2"
                    value={shipping.email}
                    onChange={(e) =>
                      setShipping({ ...shipping, email: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    className="sm:col-span-2"
                    value={shipping.phone}
                    onChange={(e) =>
                      setShipping({ ...shipping, phone: e.target.value })
                    }
                  />
                  <Input
                    label="Address"
                    className="sm:col-span-2"
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="City"
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping({ ...shipping, city: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="State"
                    value={shipping.state}
                    onChange={(e) =>
                      setShipping({ ...shipping, state: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="ZIP Code"
                    value={shipping.zip}
                    onChange={(e) =>
                      setShipping({ ...shipping, zip: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Country"
                    value={shipping.country}
                    onChange={(e) =>
                      setShipping({ ...shipping, country: e.target.value })
                    }
                    required
                  />
                </div>
                <Button className="mt-6" onClick={() => setStep("payment")}>
                  Continue to Payment
                </Button>
              </div>
            </AnimatedSection>
          )}

          {step === "payment" && (
            <AnimatedSection>
              <div className="glass-card p-6 sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-center">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  <h2 className="text-xl font-semibold text-white">
                    Payment Details
                  </h2>
                  <span className="text-xs text-zinc-500">(Demo — no real charges)</span>
                </div>
                <div className="grid gap-4">
                  <Input
                    label="Name on Card"
                    value={payment.nameOnCard}
                    onChange={(e) =>
                      setPayment({ ...payment, nameOnCard: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                    value={payment.cardNumber}
                    onChange={(e) =>
                      setPayment({ ...payment, cardNumber: e.target.value })
                    }
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry"
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={(e) =>
                        setPayment({ ...payment, expiry: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      value={payment.cvv}
                      onChange={(e) =>
                        setPayment({ ...payment, cvv: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="secondary" onClick={() => setStep("shipping")}>
                    Back
                  </Button>
                  <Button onClick={() => setStep("review")}>
                    Review Order
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          )}

          {step === "review" && (
            <AnimatedSection>
              <div className="glass-card p-6 sm:p-8">
                <h2 className="mb-6 text-center text-xl font-semibold text-white">
                  Review Your Order
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="rounded-xl bg-white/[0.02] p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                      Shipping to
                    </p>
                    <p className="text-sm text-white">
                      {shipping.firstName} {shipping.lastName}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {shipping.address}, {shipping.city}, {shipping.state}{" "}
                      {shipping.zip}
                    </p>
                    <p className="text-sm text-zinc-400">{shipping.email}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.02] p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                      Payment
                    </p>
                    <p className="text-sm text-white">
                      {payment.nameOnCard || "Card on file"}
                    </p>
                    <p className="text-sm text-zinc-400">
                      **** **** **** {payment.cardNumber.slice(-4) || "4242"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setStep("payment")}>
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={processing}
                    className="flex-1"
                  >
                    {processing ? "Processing..." : `Place Order — ${formatPrice(total)}`}
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>

        {/* Order summary sidebar */}
        <AnimatedSection delay={100}>
          <div className="glass-card p-6 sticky top-24">
            <h2 className="mb-4 text-center text-lg font-semibold text-white">
              Order Summary
            </h2>
            <ul className="space-y-3 mb-4">
              {lineItems.map(({ item, product, variant, lineTotal }) => (
                <li
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-3"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white/5">
                    <Image
                      src={product.images[0]}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{product.name}</p>
                    <p className="text-xs text-zinc-500">{item.color}</p>
                  </div>
                  <span className="text-sm text-zinc-300">
                    {formatPrice(lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-400">Free</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-semibold text-white">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
