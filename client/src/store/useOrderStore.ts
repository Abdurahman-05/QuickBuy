import { create } from "zustand";
import api from "../lib/axios";
import type { OrderRecord, OrderItemPayload, ShippingAddressPayload } from "../types/order";

type CreateOrderPayload = {
  orderItems: OrderItemPayload[];
  shippingAddress: ShippingAddressPayload;
  totalPrice: number;
};

interface OrderState {
  myOrders: OrderRecord[];
  allOrders: OrderRecord[];
  selectedOrder: OrderRecord | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  getMyOrders: () => Promise<void>;
  getAllOrders: () => Promise<void>;
  getOrderById: (id: string) => Promise<void>;
  createOrder: (payload: CreateOrderPayload) => Promise<OrderRecord>;
  updateOrderStatus: (id: string, status: OrderRecord["orderStatus"]) => Promise<void>;
  verifyPayment: (id: string, status: "PAID" | "REJECTED") => Promise<void>;
  clearOrderMessages: () => void;
}

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message ||
  (typeof error?.response?.data === "string" ? error.response.data : fallback);

export const useOrderStore = create<OrderState>()((set) => ({
  myOrders: [],
  allOrders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
  successMessage: null,

  clearOrderMessages: () => set({ error: null, successMessage: null }),

  getMyOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("orders/my-orders");
      set({ myOrders: Array.isArray(response.data) ? response.data : [], isLoading: false });
    } catch (error: any) {
      set({ error: getErrorMessage(error, "Failed to fetch your orders."), isLoading: false });
    }
  },

  getAllOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("orders");
      set({ allOrders: Array.isArray(response.data) ? response.data : [], isLoading: false });
    } catch (error: any) {
      set({ error: getErrorMessage(error, "Failed to fetch orders."), isLoading: false });
    }
  },

  getOrderById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`orders/${id}`);
      set({ selectedOrder: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: getErrorMessage(error, "Failed to fetch order."), isLoading: false });
    }
  },

  createOrder: async (payload) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await api.post("orders", payload);
      const createdOrder = response.data as OrderRecord;
      set((state) => ({
        myOrders: [createdOrder, ...state.myOrders],
        isLoading: false,
        successMessage: "Order created successfully.",
      }));
      return createdOrder;
    } catch (error: any) {
      const message = getErrorMessage(error, "Failed to create order.");
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await api.patch(`orders/${id}/status`, { status });
      const updated = response.data as OrderRecord;
      set((state) => ({
        allOrders: state.allOrders.map((o) => (o._id === id ? updated : o)),
        selectedOrder: state.selectedOrder?._id === id ? updated : state.selectedOrder,
        isLoading: false,
        successMessage: "Order status updated.",
      }));
    } catch (error: any) {
      set({ error: getErrorMessage(error, "Failed to update order status."), isLoading: false });
    }
  },

  verifyPayment: async (id, status) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await api.patch(`orders/${id}/verify`, { status });
      const updated = response.data as OrderRecord;
      set((state) => ({
        allOrders: state.allOrders.map((o) => (o._id === id ? updated : o)),
        selectedOrder: state.selectedOrder?._id === id ? updated : state.selectedOrder,
        isLoading: false,
        successMessage: "Payment status updated.",
      }));
    } catch (error: any) {
      set({ error: getErrorMessage(error, "Failed to verify payment."), isLoading: false });
    }
  },
}));
