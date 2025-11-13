import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_CONFIG, STORAGE_KEYS } from "../config";

// Create Axios Instance
const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
});

// Load token from storage
async function getAccessToken() {
    return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

async function getRefreshToken() {
    return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

// Save tokens
async function saveTokens(accessToken, refreshToken) {
    if (accessToken)
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken)
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
}

// ✅ 1) Attach Token Before Requests
api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ✅ 2) Auto Refresh Access Token on 401
let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
    failedQueue.forEach((promise) => {
        error ? promise.reject(error) : promise.resolve(token);
    });
    failedQueue = [];
}

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        if (err.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(err);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
            const refreshToken = await getRefreshToken();
            if (!refreshToken) throw new Error("Refresh token missing");

            const { data } = await axios.post(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
                { refreshToken }
            );

            const newAccessToken = data.accessToken;
            await saveTokens(newAccessToken);

            api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
            processQueue(null, newAccessToken);
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            await AsyncStorage.multiRemove([
                STORAGE_KEYS.ACCESS_TOKEN,
                STORAGE_KEYS.REFRESH_TOKEN,
                STORAGE_KEYS.USER_DATA,
            ]);
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

// ✅ Public API Calls

export const AuthAPI = {
    signup: (payload) => api.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, payload),
    login: async (payload) => {
        const { data } = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, payload);
        await saveTokens(data.accessToken, data.refreshToken);
        return data;
    },
    logout: async () => {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.ACCESS_TOKEN,
            STORAGE_KEYS.REFRESH_TOKEN,
            STORAGE_KEYS.USER_DATA,
        ]);
        return api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    },
};

export const VehiclesAPI = {
    list: () => api.get(API_CONFIG.ENDPOINTS.VEHICLES),
    details: (id) => api.get(`${API_CONFIG.ENDPOINTS.VEHICLES}/${id}`),
};

export const RentalsAPI = {
    create: (payload) => api.post(API_CONFIG.ENDPOINTS.RENTALS, payload),
    list: () => api.get(API_CONFIG.ENDPOINTS.RENTALS),
};

export const ServicesAPI = {
    list: () => api.get(API_CONFIG.ENDPOINTS.SERVICES.LIST),
    book: (payload) => api.post(API_CONFIG.ENDPOINTS.SERVICES.BOOK, payload),
};

export const PartsAPI = {
    list: () => api.get(API_CONFIG.ENDPOINTS.PARTS.LIST),
    order: (payload) => api.post(API_CONFIG.ENDPOINTS.PARTS.ORDER, payload),
};

export const FinancingAPI = {
    apply: (payload) => api.post(API_CONFIG.ENDPOINTS.FINANCING.APPLY, payload),
    listApplications: () =>
        api.get(API_CONFIG.ENDPOINTS.FINANCING.LIST_APPLICATIONS),
    review: (payload) => api.post(API_CONFIG.ENDPOINTS.FINANCING.REVIEW, payload),
};

export default api;
