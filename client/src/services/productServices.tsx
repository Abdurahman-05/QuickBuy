import axios from 'axios';

const baseUrl = (import.meta.env.VITE_API_URL || "").trim();
const API_URL = `${baseUrl.endsWith("/api") ? baseUrl : `${baseUrl.replace(/\/+$/, "")}/api`}/products`;

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};