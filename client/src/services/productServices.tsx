import axios from 'axios';
import { resolveApiBaseUrl } from "../lib/apiBaseUrl";

const API_URL = `${resolveApiBaseUrl()}/products`;

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};