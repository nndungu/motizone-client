import * as SecureStore from 'expo-secure-store'; // Expo secure store for mobile
const ACCESS_KEY = 'motizone_access';
const REFRESH_KEY = 'motizone_refresh';

export async function getAccessToken() {
  // try SecureStore then fallback to localStorage for web
  if (SecureStore) {
    const token = await SecureStore.getItemAsync(ACCESS_KEY);
    if (token) return token;
  }
  if (typeof localStorage !== 'undefined') return localStorage.getItem(ACCESS_KEY);
  return null;
}

export async function setAccessToken(token) {
  if (SecureStore) await SecureStore.setItemAsync(ACCESS_KEY, token);
  if (typeof localStorage !== 'undefined') localStorage.setItem(ACCESS_KEY, token);
}

export async function getStoredRefreshToken() {
  if (SecureStore) {
    const t = await SecureStore.getItemAsync(REFRESH_KEY);
    if (t) return t;
  }
  if (typeof localStorage !== 'undefined') return localStorage.getItem(REFRESH_KEY);
  return null;
}

export async function setRefreshToken(token) {
  if (SecureStore) await SecureStore.setItemAsync(REFRESH_KEY, token);
  if (typeof localStorage !== 'undefined') localStorage.setItem(REFRESH_KEY, token);
}

export async function storeTokens(accessToken, refreshToken) {
  await setAccessToken(accessToken);
  await setRefreshToken(refreshToken);
}

export async function clearTokens() {
  if (SecureStore) {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY);
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }
}
