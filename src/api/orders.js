import api from './api';
import { API_CONFIG } from '../config';

export const ordersAPI = {
    // Get all orders (with optional filters)
    getOrders: async (filters = {}) => {
        const response = await api.get(API_CONFIG.ENDPOINTS.ORDERS, {
            params: filters,
        });
        return response.data;
    },

    // Get single order by ID
    getOrderById: async (id) => {
        const response = await api.get(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}`);
        return response.data;
    },

    // Create new order
    createOrder: async (orderData) => {
        const response = await api.post(API_CONFIG.ENDPOINTS.ORDERS, orderData);
        return response.data;
    },

    // Update order
    updateOrder: async (id, orderData) => {
        const response = await api.put(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}`, orderData);
        return response.data;
    },

    // Cancel order
    cancelOrder: async (id) => {
        const response = await api.delete(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}`);
        return response.data;
    },

    // Get user's orders
    getUserOrders: async (userId) => {
        const response = await api.get(`${API_CONFIG.ENDPOINTS.ORDERS}/user/${userId}`);
        return response.data;
    },
};