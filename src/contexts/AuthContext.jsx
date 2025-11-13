import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getAccessToken, getStoredRefreshToken, clearTokens } from '../api/tokenStore';
import api from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // attempt to restore
  useEffect(()=> {
    (async ()=> {
      const token = await getAccessToken();
      if (token) {
        try {
          const res = await api.get('/auth/me'); // OPTIONAL endpoint to return current user
          setUser(res.data);
        } catch (err) {
          // token may be expired — interceptor will try refresh
        }
      }
      setLoading(false);
    })();
  },[]);

  const signOut = async () => {
    await clearTokens();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, setUser, loading, signOut }}>{children}</AuthContext.Provider>;
}
