import { AxiosError } from "axios";
import { create } from "zustand";
import { api } from "@/lib/api";

type Nullable<T> = T | null;

interface UserAddress {
  street: Nullable<string>;
  city: Nullable<string>;
  state: Nullable<string>;
  country: Nullable<string>;
  zipCode: Nullable<string>;
}

export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: Nullable<string>;
  profileImage: Nullable<string>;
  role: string;
  address: UserAddress;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse extends AuthUser {
  token: string;
}

interface AuthState {
  user: Nullable<AuthUser>;
  token: Nullable<string>;
  isLoading: boolean;
  error: Nullable<string>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AUTH_STORAGE_KEY = "quickbuy-auth";

const readStoredAuth = (): Pick<AuthState, "user" | "token"> => {
  const emptyState = { user: null, token: null };
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!stored) return emptyState;

  try {
    const parsed = JSON.parse(stored) as { user: AuthUser; token: string };
    if (!parsed?.token || !parsed?.user) return emptyState;
    return { user: parsed.user, token: parsed.token };
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return emptyState;
  }
};

const persistAuth = (user: Nullable<AuthUser>, token: Nullable<string>) => {
  if (!user || !token) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
};

const initialAuth = readStoredAuth();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialAuth.user,
  token: initialAuth.token,
  isLoading: false,
  error: null,
  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await api.post<LoginResponse>("/auth/login", { email, password });
      const { token, ...user } = data;

      persistAuth(user, token);
      set({ user, token, isLoading: false, error: null });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message ?? "Unable to login. Please try again.";

      persistAuth(null, null);
      set({ user: null, token: null, isLoading: false, error: message });
      throw error;
    }
  },
  logout: () => {
    persistAuth(null, null);
    set({ user: null, token: null, error: null });
  },
  clearError: () => set({ error: null }),
}));
