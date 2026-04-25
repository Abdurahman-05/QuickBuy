import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

export interface CommerceItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

type CommerceState = {
  cartItems: CommerceItem[];
  wishlistItems: CommerceItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  moveWishlistToCart: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  cartCount: () => number;
  wishlistCount: () => number;
};

const toCommerceItem = (product: Product, quantity = 1): CommerceItem => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  description: product.description,
  quantity,
});

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      wishlistItems: [],

      addToCart: (product, quantity = 1) =>
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
        }),

      removeFromCart: (id) =>
        set((state) => ({ cartItems: state.cartItems.filter((item) => item.id !== id) })),

      updateCartQuantity: (id, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlistItems.some((item) => item.id === product.id)) return state;
          return { wishlistItems: [...state.wishlistItems, toCommerceItem(product)] };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({ wishlistItems: state.wishlistItems.filter((item) => item.id !== id) })),

      moveWishlistToCart: (id) =>
        set((state) => {
          const wishlistItem = state.wishlistItems.find((item) => item.id === id);
          if (!wishlistItem) return state;
          const existingCart = state.cartItems.find((item) => item.id === id);
          const cartItems = existingCart
            ? state.cartItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
            : [...state.cartItems, { ...wishlistItem, quantity: 1 }];
          return {
            cartItems,
            wishlistItems: state.wishlistItems.filter((item) => item.id !== id),
          };
        }),

      isInWishlist: (id) => get().wishlistItems.some((item) => item.id === id),
      cartCount: () => get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
      wishlistCount: () => get().wishlistItems.length,
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
