import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "https://quickbuy-1-1rn7.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
