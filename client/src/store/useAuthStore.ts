import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  role: "USER" | "ADMIN";
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  users: User[]; // Admin user list
  token: string | null;
  role: "USER" | "ADMIN" | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  successMessage: string | null;
  
  // Auth Actions
  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: any) => Promise<void>;
  
  // User Profile Actions
  getProfile: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<void>;
  
  // Admin Actions
  getAllUsers: () => Promise<void>;
  
  // UI Actions
  clearError: () => void;
  clearSuccessMessage: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      token: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      isCheckingAuth: false,
      error: null,
      successMessage: null,

      clearError: () => set((state) => ({ ...state, error: null })),
      clearSuccessMessage: () => set((state) => ({ ...state, successMessage: null })),

      login: async (credentials) => {
        set((state) => ({ ...state, isLoading: true, error: null, successMessage: null }));
        try {
          const response = await api.post("auth/login", credentials);
          const { token } = response.data;
          
          set((state) => ({ ...state, token, isAuthenticated: !!token }));
          await get().getMe();
          set((state) => ({ ...state, isLoading: false }));
        } catch (error: any) {
          let message = "Invalid email or password";
          if (error.response?.data?.message) {
            message = error.response.data.message;
          } else if (typeof error.response?.data === 'string') {
            message = error.response.data;
          }
          set((state) => ({ ...state, error: String(message), isLoading: false }));
          throw error;
        }
      },

      register: async (userData) => {
        set((state) => ({ ...state, isLoading: true, error: null, successMessage: null }));
        try {
          const response = await api.post("auth/register", userData);
          const { token, ...user } = response.data;
          set((state) => ({ 
            ...state,
            user, 
            token, 
            role: user.role,
            isAuthenticated: true, 
            isLoading: false,
            successMessage: "Account created successfully!"
          }));
        } catch (error: any) {
          let message = "Something went wrong during registration";
          if (error.response?.data?.message) {
            message = error.response.data.message;
          } else if (typeof error.response?.data === 'string') {
            message = error.response.data;
          }
          set((state) => ({ ...state, error: String(message), isLoading: false }));
          throw error;
        }
      },

      logout: () => {
        set((state) => ({ 
          ...state,
          user: null, 
          users: [],
          token: null, 
          role: null,
          isAuthenticated: false,
          error: null,
          successMessage: null
        }));
        localStorage.removeItem("auth-storage");
      },

      getMe: async () => {
        const hasToken = !!get().token;
        if (!hasToken) return;

        set((state) => ({ ...state, isCheckingAuth: true }));
        try {
          const response = await api.get("auth/me");
          const user = response.data;
          set((state) => ({ 
            ...state, 
            user, 
            role: user.role, 
            isAuthenticated: true, 
            isCheckingAuth: false 
          }));
        } catch (error: any) {
          set((state) => ({ 
            ...state, 
            user: null, 
            token: null, 
            role: null, 
            isAuthenticated: false, 
            isCheckingAuth: false 
          }));
        }
      },

      getProfile: async () => {
        set((state) => ({ ...state, isLoading: true, error: null }));
        try {
          const response = await api.get("users/profile");
          set((state) => ({ ...state, user: response.data, isLoading: false }));
        } catch (error: any) {
          const message = error.response?.data?.message || "Failed to fetch profile";
          set((state) => ({ ...state, error: message, isLoading: false }));
        }
      },

      updateProfile: async (formData) => {
        set((state) => ({ ...state, isLoading: true, error: null, successMessage: null }));
        try {
          const response = await api.put("users/profile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          set((state) => ({ 
            ...state, 
            user: response.data, 
            isLoading: false, 
            successMessage: "Profile updated successfully!" 
          }));
        } catch (error: any) {
          const message = error.response?.data?.message || "Failed to update profile";
          set((state) => ({ ...state, error: message, isLoading: false }));
          throw error;
        }
      },

      getAllUsers: async () => {
        set((state) => ({ ...state, isLoading: true, error: null }));
        try {
          const response = await api.get("users");
          set((state) => ({ ...state, users: response.data, isLoading: false }));
        } catch (error: any) {
          const message = error.response?.data?.message || "Failed to fetch users";
          set((state) => ({ ...state, error: message, isLoading: false }));
        }
      },

      forgotPassword: async (email) => {
        set((state) => ({ ...state, isLoading: true, error: null, successMessage: null }));
        try {
          await api.post("auth/forgotpassword", { email });
          set((state) => ({ 
            ...state,
            isLoading: false, 
            successMessage: "Password reset link sent to your email" 
          }));
        } catch (error: any) {
          let message = "Email not found";
          if (error.response?.data?.message) {
            message = error.response.data.message;
          } else if (typeof error.response?.data === 'string') {
            message = error.response.data;
          }
          set((state) => ({ ...state, error: String(message), isLoading: false }));
          throw error;
        }
      },

      resetPassword: async (token, password) => {
        set((state) => ({ ...state, isLoading: true, error: null, successMessage: null }));
        try {
          const response = await api.put(`auth/resetpassword/${token}`, { password });
          const { token: newToken, ...user } = response.data;
          set((state) => ({ 
            ...state,
            user: user, 
            token: newToken, 
            role: user.role,
            isAuthenticated: true, 
            isLoading: false,
            successMessage: "Password reset successful"
          }));
        } catch (error: any) {
          let message = "Invalid or expired token";
          if (error.response?.data?.message) {
            message = error.response.data.message;
          } else if (typeof error.response?.data === 'string') {
            message = error.response.data;
          }
          set((state) => ({ ...state, error: String(message), isLoading: false }));
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user, role: state.role }),
    }
  )
);
