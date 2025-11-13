import api from './api';
import { API_CONFIG } from '../config';

export const rentalsAPI = {
    // Get all rentals
    getRentals: async (filters = {}) => {
        const response = await api.get(API_CONFIG.ENDPOINTS.RENTALS, {
            params: filters,
        });
        return response.data;
    },

    // Get single rental by ID
    getRentalById: async (id) => {
        const response = await api.get(`${API_CONFIG.ENDPOINTS.RENTALS}/${id}`);
        return response.data;
    },

    // Create new rental
    createRental: async (rentalData) => {
        const response = await api.post(API_CONFIG.ENDPOINTS.RENTALS, rentalData);
        return response.data;
    },

    // Update rental
    updateRental: async (id, rentalData) => {
        const response = await api.put(`${API_CONFIG.ENDPOINTS.RENTALS}/${id}`, rentalData);
        return response.data;
    },

    // Cancel rental
    cancelRental: async (id) => {
        const response = await api.delete(`${API_CONFIG.ENDPOINTS.RENTALS}/${id}`);
        return response.data;
    },

    // Get user's rentals
    getUserRentals: async (userId) => {
        const response = await api.get(`${API_CONFIG.ENDPOINTS.RENTALS}/user/${userId}`);
        return response.data;
    },
};