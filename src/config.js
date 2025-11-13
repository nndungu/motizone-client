// ✅ Centralized API + Storage + Roles + App Settings

// Detect whether running on Mobile (Expo) or Web
import Constants from "expo-constants";
import { Platform } from "react-native";

export const API_CONFIG = {
    BASE_URL:
        Constants?.expoConfig?.extra?.API_URL ||
        process.env.EXPO_PUBLIC_API_URL ||
        "http://localhost:8080/api",

    ENDPOINTS: {
        AUTH: {
            SIGNUP: "/auth/signup",
            LOGIN: "/auth/login",
            REFRESH: "/auth/refresh",
            LOGOUT: "/auth/logout",
        },

        USER: {
            PROFILE: "/users/me",
            UPDATE_PROFILE: "/users/update",
            LIST_ALL: "/users",
        },

        VEHICLES: "/vehicles",
        RENTALS: "/rentals",

        SERVICES: {
            LIST: "/services",
            BOOK: "/services/book",
            LOGS: "/services/logs",
        },

        CUSTOMIZATIONS: "/customizations",

        PARTS: {
            LIST: "/parts",
            ORDER: "/parts/order",
        },

        FINANCING: {
            APPLY: "/financing/apply",
            LIST_APPLICATIONS: "/financing/applications",
            REVIEW: "/financing/review",
        },

        PAYMENTS: {
            MPESA: "/payments/mpesa",
            STRIPE: "/payments/stripe",
        },
    },

    // Default Request Timeout (MS)
    TIMEOUT: 15000,

    // WebSocket (live updates for rentals, mechanics, chat, etc.)
    WS_URL:
        Constants?.expoConfig?.extra?.WS_URL ||
        process.env.EXPO_PUBLIC_WS_URL ||
        "ws://localhost:8080/ws",
};

// 🔐 Storage Key Mapping (AsyncStorage / LocalStorage)
export const STORAGE_KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER_DATA: "user_data",
    CART_ITEMS: "cart_items",
    SELECTED_ROLE: "selected_role",
};

// 👥 Role System
export const USER_ROLES = {
    CUSTOMER: "customer",
    MECHANIC: "mechanic",
    ADMIN: "admin",
    FINANCE_AGENT: "finance_agent",
};

// 🚗 Route Dashboards (Role-Based Landing Screens)
export const ROLE_DASHBOARD_ROUTES = {
    [USER_ROLES.CUSTOMER]: "CustomerDashboard",
    [USER_ROLES.MECHANIC]: "MechanicDashboard",
    [USER_ROLES.ADMIN]: "AdminDashboard",
    [USER_ROLES.FINANCE_AGENT]: "FinanceDashboard",
};

// 🌍 Platform-Aware HTTP Headers
export const DEFAULT_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Client-Platform": Platform.OS,
};
