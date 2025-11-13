import api from './api';
import { API_CONFIG } from '../config';
import { setStorageItem, removeStorageItem } from '../util/storage';

export const authAPI = {
    signup: async (userData) => {
        const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);

        if (response.data.token) {
            await Promise.all([
                setStorageItem('user_token', response.data.token),
                setStorageItem('refresh_token', response.data.refreshToken),
                setStorageItem('user_data', JSON.stringify(response.data.user)),
            ]);
        }

        return response.data;
    },

    logout: async () => {
        try {
            await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
            console.log('Logout API error:', error);
        } finally {
            await Promise.all([
                removeStorageItem('user_token'),
                removeStorageItem('refresh_token'),
                removeStorageItem('user_data'),
            ]);
        }
    },

    refreshToken: async (refreshToken) => {
        const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
            refreshToken,
        });
        return response.data;
    },
};