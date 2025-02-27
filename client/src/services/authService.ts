import api from "./api";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/register', { name, email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
