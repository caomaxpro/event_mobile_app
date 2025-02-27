import api from "./api";

type registerData = {
    name: string, 
    email: string, 
    password: string
}

export const registerUser = async (data: registerData) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

type loginData = {
    email: string, 
    password: string
}

export const loginUser = async (data: loginData) => {
  try {
    console.log(data)
    // log('[Auth Login]', data)
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
