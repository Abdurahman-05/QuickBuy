export interface OrderItemPayload {
  product: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
}

export interface ShippingAddressPayload {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface OrderRecord {
  _id: string;
  user?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  orderItems: OrderItemPayload[];
  shippingAddress: ShippingAddressPayload;
  totalPrice: number;
  paymentStatus: "PENDING" | "PAID" | "REJECTED";
  orderStatus: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentScreenshot?: string | null;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}
