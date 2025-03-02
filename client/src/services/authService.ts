import { loadState, saveState } from "@src/utils/storageUtils";
import api from "./api";
import { log } from "@src/utils/logUtils";


export const logoutUser = async () => {
    try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'logout failed');
  }
}

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
    // console.log(data)
    // log('[Auth Login]', data)
    const response = await api.post('/auth/login', data);
    const settingState = await loadState()

    // console.log(response.status)

    if (response.status === 200) {
        await saveState({...settingState, token: {jwt: response.data.token}})
    }

    // console.log()

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const sendEmail = async (email: string) => {
  try {
  
    // log('[Auth Login]', data)
    const response = await api.post('/auth/send-email', {email: email});
    const settingState = await loadState()

    if (response.status === 200) {
        const resData = response.data

        await saveState({...settingState, token: {passcode: resData.passcode, expiredAt: resData.expiredAt}})
    }


    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

