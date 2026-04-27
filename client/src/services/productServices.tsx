import axios from 'axios';

const baseUrl = (import.meta.env.VITE_API_URL || "").trim();
const normalizedBaseUrl = baseUrl
  ? (baseUrl.endsWith("/api") ? baseUrl : `${baseUrl.replace(/\/+$/, "")}/api`)
  : "https://quickbuy-1-1rn7.onrender.com/api";
const API_URL = `${normalizedBaseUrl}/products`;

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};