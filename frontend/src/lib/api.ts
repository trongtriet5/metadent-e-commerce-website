import axios from 'axios';
import { Product, CartItem, Order } from '@/types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies for session management
});

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products/');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}/`);
    return response.data;
  },

  // Admin endpoints
  create: async (formData: FormData): Promise<Product> => {
    const response = await axios.post(`${API_BASE_URL}/products/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: number, formData: FormData): Promise<Product> => {
    const response = await axios.put(`${API_BASE_URL}/products/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}/`);
  },
};

// Cart API - Simplified for local storage
export const cartApi = {
  // Cart is now managed locally, no API calls needed for cart operations
};

// Order API
export const orderApi = {
  create: async (orderData: {
    cart_items: Array<{
      product_id: number;
      quantity: number;
    }>;
    customer: {
      customer_name: string;
      customer_email: string;
      customer_phone: string;
      customer_address: string;
    };
  }): Promise<Order> => {
    console.log('API: Creating order', orderData);
    const response = await api.post('/cart/order/', orderData);
    console.log('API: Order response', response.data);
    return response.data;
  },
};

export default api;
