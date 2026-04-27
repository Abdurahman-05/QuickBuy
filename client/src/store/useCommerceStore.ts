import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";
import api from "../lib/axios";

export interface CommerceItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  ownerKey?: string;
}

type CommerceState = {
  cartItems: CommerceItem[];
  wishlistItems: CommerceItem[];
  fetchCart: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateCartQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  moveWishlistToCart: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
  cartCount: () => number;
  wishlistCount: () => number;
  wishlistItemsForCurrentUser: () => CommerceItem[];
};

const toCommerceItem = (product: Product, quantity = 1): CommerceItem => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  description: product.description,
  quantity,
});

const hasAuthToken = () => {
  try {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.state?.token);
  } catch {
    return false;
  }
};

const getCurrentOwnerKey = () => {
  try {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const user = parsed?.state?.user;
    const id = typeof user?._id === "string" ? user._id.trim() : "";
    const email = typeof user?.email === "string" ? user.email.trim().toLowerCase() : "";
    return id || email || null;
  } catch {
    return null;
  }
};

const mapCartResponse = (payload: any): CommerceItem[] => {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  return items
    .map((item: any) => {
      const product = item?.product;
      if (!product) return null;
      const image = Array.isArray(product.images) && product.images[0]
        ? product.images[0]
        : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80";
      return {
        id: String(product._id || product.id || ""),
        name: String(product.name || ""),
        price: Number(product.price || 0),
        image,
        description: String(product.brand || product.description || ""),
        quantity: Math.max(1, Number(item.quantity || 1)),
      } satisfies CommerceItem;
    })
    .filter(Boolean) as CommerceItem[];
};

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      wishlistItems: [],

      fetchCart: async () => {
        if (!hasAuthToken()) return;
        try {
          const response = await api.get("cart");
          set({ cartItems: mapCartResponse(response.data) });
        } catch {
          // Keep local state when backend fetch fails.
        }
      },

      addToCart: async (product, quantity = 1) => {
        if (!hasAuthToken()) return;
        if (hasAuthToken()) {
          try {
            const response = await api.post("cart", {
              productId: product.id,
              quantity,
            });
            set({ cartItems: mapCartResponse(response.data) });
            return;
          } catch {
            // Fall back to local cart update if API fails.
          }
        }
        set((state) => {
          const existing = state.cartItems.find((item) => item.id === product.id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
              ),
            };
          }
          return { cartItems: [...state.cartItems, toCommerceItem(product, quantity)] };
        });
      },

      removeFromCart: async (id) => {
        if (hasAuthToken()) {
          try {
            const response = await api.delete(`cart/${id}`);
            set({ cartItems: mapCartResponse(response.data) });
            return;
          } catch {
            // Fall back to local update
          }
        }
        set((state) => ({ cartItems: state.cartItems.filter((item) => item.id !== id) }));
      },

      updateCartQuantity: async (id, quantity) => {
        if (hasAuthToken()) {
          try {
            const response = await api.patch("cart/update", { productId: id, quantity: Math.max(1, quantity) });
            set({ cartItems: mapCartResponse(response.data) });
            return;
          } catch {
            // Fall back to local update
          }
        }
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },

      clearCart: async () => {
        if (hasAuthToken()) {
          try {
            await api.delete("cart");
            set({ cartItems: [] });
            return;
          } catch {
            // Fall back to local clear
          }
        }
        set({ cartItems: [] });
      },

      addToWishlist: (product) => {
        if (!hasAuthToken()) return;
        const ownerKey = getCurrentOwnerKey();
        if (!ownerKey) return;
        set((state) => {
          if (state.wishlistItems.some((item) => item.id === product.id && item.ownerKey === ownerKey)) return state;
          return { wishlistItems: [...state.wishlistItems, { ...toCommerceItem(product), ownerKey }] };
        });
      },

      removeFromWishlist: (id) =>
        set((state) => {
          const ownerKey = getCurrentOwnerKey();
          if (!ownerKey) return state;
          return {
            wishlistItems: state.wishlistItems.filter(
              (item) => !(item.id === id && item.ownerKey === ownerKey)
            ),
          };
        }),

      moveWishlistToCart: async (id) => {
        const ownerKey = getCurrentOwnerKey();
        if (!ownerKey) return;
        const target = get().wishlistItems.find((item) => item.id === id && item.ownerKey === ownerKey);
        if (!target) return;
        const tempProduct = {
          id: target.id,
          name: target.name,
          price: target.price,
          image: target.image,
          images: [target.image, target.image, target.image, target.image] as [string, string, string, string],
          category: "GENERAL",
          rating: 0,
          stockInfo: "In stock",
          description: target.description,
          specifications: [],
          reviews: [],
        } as Product;
        await get().addToCart(tempProduct, 1);
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            (item) => !(item.id === id && item.ownerKey === ownerKey)
          ),
        }));
      },

      isInWishlist: (id) => {
        const ownerKey = getCurrentOwnerKey();
        if (!ownerKey) return false;
        return get().wishlistItems.some((item) => item.id === id && item.ownerKey === ownerKey);
      },
      cartCount: () => get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
      wishlistCount: () => {
        const ownerKey = getCurrentOwnerKey();
        if (!ownerKey) return 0;
        return get().wishlistItems.filter((item) => item.ownerKey === ownerKey).length;
      },
      wishlistItemsForCurrentUser: () => {
        const ownerKey = getCurrentOwnerKey();
        if (!ownerKey) return [];
        return get().wishlistItems.filter((item) => item.ownerKey === ownerKey);
      },
    }),
    {
      name: "commerce-storage",
      partialize: (state) => ({
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
      }),
    }
  )
);
