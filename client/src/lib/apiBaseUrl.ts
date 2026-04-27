const LOCAL_API_ORIGIN = "http://localhost:5000";

export const resolveApiOrigin = () => {
  const envValue = String(import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
  return envValue || LOCAL_API_ORIGIN;
};

export const resolveApiBaseUrl = () => {
  const origin = resolveApiOrigin();
  return origin.endsWith("/api") ? origin : `${origin}/api`;
};

