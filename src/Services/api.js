import axios from 'axios';
import { getToken } from '../utils/storage';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
});

api.interceptors.request.use(async config => {
  const tokenData = await getToken();
  if (tokenData?.accessToken) config.headers.Authorization = `Bearer ${tokenData.accessToken}`;
  return config;
});

export default api;
