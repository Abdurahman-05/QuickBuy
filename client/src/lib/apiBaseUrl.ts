const LOCAL_API_ORIGIN = "https://quickbuy-1-1rn7.onrender.com";

export const resolveApiOrigin = () => {
  const envValue = String(import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
  return envValue || LOCAL_API_ORIGIN;
};

export const resolveApiBaseUrl = () => {
  const origin = resolveApiOrigin();
  return origin.endsWith("/api") ? origin : `${origin}/api`;
};

