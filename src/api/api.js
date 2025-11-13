import axios from 'axios';
import { API_URL } from '../config';
import { getStoredRefreshToken, storeTokens, getAccessToken, setAccessToken, clearTokens } from './tokenStore';

const api = axios.create({ baseURL: API_URL });

/** Request: attach access token */
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Response: refresh on 401 */
let isRefreshing = false;
let refreshQueue = [];

function processQueue(error, token = null) {
  refreshQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  })
  refreshQueue = [];
}

api.interceptors.response.use(response => response, async (error) => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    if (isRefreshing) {
      return new Promise(function(resolve, reject) {
        refreshQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return api(originalRequest);
      }).catch(err => Promise.reject(err));
    }

    isRefreshing = true;
    const refreshToken = await getStoredRefreshToken();
    if (!refreshToken) {
      clearTokens();
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
      const newAccessToken = res.data.accessToken;
      await setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);
      originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      clearTokens();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
  return Promise.reject(error);
});

export default api;
