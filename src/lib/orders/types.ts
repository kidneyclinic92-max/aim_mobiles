export type OrderStatus = "pending" | "approved" | "rejected";

export type OrderItem = {
  productId: string;
  productName: string;
  variantId: string;
  color: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  image?: string;
};

export type ShippingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  shipping: ShippingInfo;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  createdAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  emailSentAt?: string;
};

export type CreateOrderPayload = {
  items: OrderItem[];
  shipping: ShippingInfo;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
};
