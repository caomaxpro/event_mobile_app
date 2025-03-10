import { log } from '@src/utils/logUtils';
import { loadState } from '@src/utils/storageUtils';
import axios from 'axios';

// BASE_URL

const API_URL = 'http://192.168.12.104:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
  },
  timeout: 10000, // Timeout sau 10s nếu API không phản hồi
});


api.interceptors.request.use(
  async (config: any) => {

    const settingState = await loadState()

    log('[API]', settingState)

    const token = settingState.token.jwt; 


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log(config)
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi tự động
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
