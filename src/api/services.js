import api from './api';
import { API_CONFIG } from '../config';

export const servicesAPI = {
    // Get all services
    getServices: async (filters = {}) => {
        const response = await api.get(API_CONFIG.ENDPOINTS.SERVICES, {
            params: filters,
        });
        return response.data;
    },

    // Get single service by ID
    getServiceById: async (id) => {
        const response = await api.get(`${API_CONFIG.ENDPOINTS.SERVICES}/${id}`);
        return response.data;
    },

    // Create new service (admin/mechanic)
    createService: async (serviceData) => {
        const response = await api.post(API_CONFIG.ENDPOINTS.SERVICES, serviceData);
        return response.data;
    },

    // Book a service
    bookService: async (serviceId, bookingData) => {
        const response = await api.post(
            `${API_CONFIG.ENDPOINTS.SERVICES}/book/${serviceId}`,
            bookingData
        );
        return response.data;
    },

    // Update service
    updateService: async (id, serviceData) => {
        const response = await api.put(`${API_CONFIG.ENDPOINTS.SERVICES}/${id}`, serviceData);
        return response.data;
    },

    // Get user's service bookings
    getUserBookings: async (userId) => {
        const response = await api.get(`${API_CONFIG.ENDPOINTS.SERVICES}/user/${userId}`);
        return response.data;
    },
};