import { create } from "zustand";
import api from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import type { Product } from "../types/product";

type ProductInput = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock?: number;
  images?: string[];
  image?: File | string | null;
};

interface ProductState {
  products: Product[];
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  getAllProducts: (params?: { search?: string; category?: string }) => Promise<void>;
  getProductById: (id: string) => Promise<void>;
  createProduct: (payload: ProductInput) => Promise<void>;
  updateProduct: (id: string, payload: Partial<ProductInput>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  clearError: () => void;
  clearSuccessMessage: () => void;
}

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message ||
  (typeof error?.response?.data === "string" ? error.response.data : fallback);

const normalizeProduct = (raw: any): Product => {
  const normalizedRating = Math.max(0, Math.min(5, Math.round(Number(raw?.rating || 0))));
  const categoryValue = raw?.category || raw?.categoryName || raw?.categoryId?.name || "GENERAL";
  const image = raw?.image || raw?.profileImage || raw?.images?.[0] || "";
  const rawImages = Array.isArray(raw?.images) ? raw.images : [];
  const images: [string, string, string, string] = [
    rawImages[0] || image,
    rawImages[1] || image,
    rawImages[2] || image,
    rawImages[3] || image,
  ];

  const stockValue = raw?.stock ?? raw?.stockQuantity ?? 0;
  const stockInfo =
    typeof raw?.stockInfo === "string"
      ? raw.stockInfo
      : Number(stockValue) > 0
        ? `${stockValue} in stock`
        : "Out of stock";

  const normalizedReviews = Array.isArray(raw?.reviews)
    ? raw.reviews.map((review: any) => ({
      author: String(review?.author || review?.userName || "Anonymous"),
      rating: Math.max(0, Math.min(5, Math.round(Number(review?.rating || 0)))),
      text: String(review?.text || review?.comment || ""),
      avatar: review?.avatar,
    }))
    : [];

  return {
    id: String(raw?._id || raw?.id || ""),
    name: String(raw?.name || ""),
    price: Number(raw?.price || 0),
    originalPrice: raw?.originalPrice ? Number(raw.originalPrice) : undefined,
    image,
    images,
    category: String(categoryValue).toUpperCase(),
    rating: normalizedRating,
    stockInfo,
    recommended: Boolean(raw?.recommended),
    description: String(raw?.description || ""),
    specifications: Array.isArray(raw?.specifications) ? raw.specifications : [],
    reviews: normalizedReviews,
  };
};

const withAdminAuth = () => {
  const { token, user } = useAuthStore.getState();
  const isAdmin = (user?.role || "").toUpperCase() === "ADMIN";
  if (!token) throw new Error("You must be logged in to perform this action.");
  if (!isAdmin) throw new Error("Only admin users can manage products.");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const buildPayload = (payload: Partial<ProductInput>) => {
  const { image, images, ...rest } = payload;
  const cleaned = Object.fromEntries(Object.entries(rest).filter(([, value]) => value !== undefined));
  const imageFromSingleField = typeof image === "string" ? image : undefined;
  const payloadImages = Array.isArray(images) && images.length > 0
    ? images
    : imageFromSingleField
      ? [imageFromSingleField]
      : undefined;

  return {
    ...cleaned,
    ...(payloadImages ? { images: payloadImages } : {}),
    ...(payload.category ? { category: payload.category.toUpperCase() } : {}),
  };
};

export const useProductStore = create<ProductState>()((set) => ({
  products: [],
  product: null,
  isLoading: false,
  error: null,
  successMessage: null,

  clearError: () => set((state) => ({ ...state, error: null })),
  clearSuccessMessage: () => set((state) => ({ ...state, successMessage: null })),

  getAllProducts: async (params) => {
    set((state) => ({ ...state, isLoading: true, error: null }));
    try {
      const response = await api.get("products", {
        params: { ...params, _t: Date.now() },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      const incoming = Array.isArray(response.data?.products)
        ? response.data.products
        : Array.isArray(response.data)
          ? response.data
          : [];
      set((state) => ({
        ...state,
        products: incoming.map(normalizeProduct),
        isLoading: false,
      }));
    } catch (error: any) {
      set((state) => ({
        ...state,
        error: getErrorMessage(error, "Failed to fetch products."),
        isLoading: false,
      }));
    }
  },

  getProductById: async (id) => {
    set((state) => ({ ...state, isLoading: true, error: null }));
    try {
      const response = await api.get(`products/${id}`, {
        params: { _t: Date.now() },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      const incoming = response.data?.product ?? response.data;
      let reviews: any[] = [];
      try {
        const reviewsResponse = await api.get(`products/${id}/reviews`);
        if (Array.isArray(reviewsResponse.data)) {
          reviews = reviewsResponse.data;
        }
      } catch {
        // Keep product details available even if reviews request fails.
      }
      set((state) => ({
        ...state,
        product: normalizeProduct({ ...incoming, reviews }),
        isLoading: false,
      }));
    } catch (error: any) {
      set((state) => ({
        ...state,
        product: null,
        error: getErrorMessage(error, "Failed to fetch product details."),
        isLoading: false,
      }));
      throw error;
    }
  },

  createProduct: async (payload) => {
    set((state) => ({ ...state, isLoading: true, error: null, successMessage: null }));
    try {
      const config = withAdminAuth();
      const body = buildPayload(payload);
      const response = await api.post("products", body, {
        ...config,
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
        },
      });

      const created = normalizeProduct(response.data?.product ?? response.data);
      set((state) => ({
        ...state,
        products: [created, ...state.products],
        isLoading: false,
        successMessage: "Product created successfully!",
      }));
    } catch (error: any) {
      const message = error instanceof Error ? error.message : getErrorMessage(error, "Failed to create product.");
      set((state) => ({ ...state, error: message, isLoading: false }));
      throw error;
    }
  },

  updateProduct: async (id, payload) => {
    set((state) => ({ ...state, isLoading: true, error: null, successMessage: null }));
    try {
      const config = withAdminAuth();
      const body = buildPayload(payload);
      const response = await api.put(`products/${id}`, body, {
        ...config,
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
        },
      });
      const updated = normalizeProduct(response.data?.product ?? response.data);

      set((state) => ({
        ...state,
        product: state.product?.id === id ? updated : state.product,
        products: state.products.map((p) => (p.id === id ? updated : p)),
        isLoading: false,
        successMessage: "Product updated successfully!",
      }));
    } catch (error: any) {
      const message = error instanceof Error ? error.message : getErrorMessage(error, "Failed to update product.");
      set((state) => ({ ...state, error: message, isLoading: false }));
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set((state) => ({ ...state, isLoading: true, error: null, successMessage: null }));
    try {
      const config = withAdminAuth();
      await api.delete(`products/${id}`, config);
      set((state) => ({
        ...state,
        products: state.products.filter((p) => p.id !== id),
        product: state.product?.id === id ? null : state.product,
        isLoading: false,
        successMessage: "Product deleted successfully!",
      }));
    } catch (error: any) {
      const message = error instanceof Error ? error.message : getErrorMessage(error, "Failed to delete product.");
      set((state) => ({ ...state, error: message, isLoading: false }));
      throw error;
    }
  },
}));
