import axios from 'axios';
import store from '@src/redux/store';
import {clearAuth, setJwt} from '@src/redux/authSlice';
import {log} from '@src/utils/logUtils';
import {refreshAccessToken} from './authService';
// import {BASE_URL} from '@env';

const BASE_URL = 'http://192.168.12.104:5000';
const API_URL = `${BASE_URL}/api`;

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // 10s timeout
});

let isRefreshing = false;
let refreshQueue: any[] = [];

api.interceptors.request.use(
  async (config: any) => {
    const state = store.getState(); // 🟢 Lấy state từ Redux
    const token = state.auth.jwt; // 🟢 Access Token từ Redux

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Handle refresh token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(resolve => {
          refreshQueue.push(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        const response = await refreshAccessToken();

        // Update token trong Redux
        store.dispatch(setJwt(response.data.token));

        // Retry lại các request trong queue
        refreshQueue.forEach(callback => callback());
        refreshQueue = [];

        return api(originalRequest);
      } catch (error) {
        // Nếu refresh token hết hạn => logout
        store.dispatch(clearAuth());

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
