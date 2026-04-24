import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Debugging Interceptor: Log all outgoing requests
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    if (config.data) {
      console.log("[API Payload]", config.data);
    }
    
    const tokenStr = localStorage.getItem("auth-storage");
    if (tokenStr) {
      try {
        const token = JSON.parse(tokenStr).state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error("Error parsing auth-storage", e);
      }
    }
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// Debugging Interceptor: Log all incoming responses
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    if (response.data) {
      console.log("[API Response Data]", response.data);
    }
    return response;
  },
  (error) => {
    console.log(`[API Response Error] ${error.response?.status} ${error.config?.url}`);
    if (error.response?.data) {
      console.log("[API Error Body]", error.response.data);
    }
    
    if (error.response?.status === 401) {
      // localStorage.removeItem("auth-storage"); // Handle this in store/guards if preferred
    }
    return Promise.reject(error);
  }
);

export default api;
