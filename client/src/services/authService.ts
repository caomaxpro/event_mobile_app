import api from './api';
import {log} from '@src/utils/logUtils';

export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'logout failed');
  }
};

type registerData = {
  name: string;
  email: string;
  password: string;
};

export const registerUser = async (data: registerData) => {
  try {
    const response = await api.post('/auth/register', data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

type loginData = {
  email: string;
  password: string;
};

export const loginUser = async (data: loginData) => {
  try {
    const response = await api.post('/auth/login', data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const sendEmail = async (email: string) => {
  try {
    const response = await api.post('/auth/send-email', {email: email});
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const refreshAccessToken = async () => {
  try {
    log('get access token');
    const response = await api.post('/auth/access_token');
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to get access token',
    );
  }
};
