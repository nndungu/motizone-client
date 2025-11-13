import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAPI } from "../api";
import { STORAGE_KEYS, ROLE_DASHBOARD_ROUTES } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // {id, username, role}
    const [loading, setLoading] = useState(true);

    // Load user on app start
    useEffect(() => {
        (async () => {
            const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
            if (storedUser) setUser(JSON.parse(storedUser));
            setLoading(false);
        })();
    }, []);

    const login = async (username, password) => {
        const data = await AuthAPI.login({ username, password });

        // Backend should return user info alongside tokens
        const userData = {
            id: data.user.id,
            username: data.user.username,
            role: data.user.role,
        };

        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        setUser(userData);

        return ROLE_DASHBOARD_ROUTES[userData.role]; // Next screen
    };

    const logout = async () => {
        await AuthAPI.logout();
        await AsyncStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isLoggedIn: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
