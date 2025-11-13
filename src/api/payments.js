import api from './api';
import { API_CONFIG } from '../config';

export const paymentsAPI = {
    // M-Pesa simulation
    mpesaSimulate: async (paymentData) => {
        const response = await api.post(API_CONFIG.ENDPOINTS.PAYMENTS.MPESA, paymentData);
        return response.data;
    },

    // Stripe payment
    stripePayment: async (paymentData) => {
        const response = await api.post(API_CONFIG.ENDPOINTS.PAYMENTS.STRIPE, paymentData);
        return response.data;
    },

    // Process payment for order
    processPayment: async (orderId, paymentMethod, paymentDetails) => {
        const response = await api.post(`${API_CONFIG.ENDPOINTS.PAYMENTS}/process`, {
            orderId,
            paymentMethod,
            ...paymentDetails,
        });
        return response.data;
    },

    // Get payment status
    getPaymentStatus: async (paymentId) => {
        const response = await api.get(`${API_CONFIG.ENDPOINTS.PAYMENTS}/${paymentId}`);
        return response.data;
    },
};