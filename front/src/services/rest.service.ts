import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const baseUrl = process.env.BASE_URL || `http://localhost:3001/api/v1`;;
const token = Cookies.get('token');
const headers = {
  'Content-Type': 'multipart/form-data',
  "Authorization": token ? `Bearer ${token}` : null
};

export const get = async (path: string) => {
  try {
    const response: any = await axios.get(`${baseUrl}${path}`, { headers: headers });
    return response;
  } catch (error: any) {
    console.error('Error:', error)
    throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};

export const post = async (path: String, data: any) => {
  try {
    const response: any = await axios.post(`${baseUrl}${path}`, data, { headers: headers });
    if(response.data.message) {
        toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    if(error.response?.data?.message) {
        toast.error(error.response.data.message);
    }
    console.error('Error:', error)
    throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};

export const put = async (path: String, data: any) => {
  try {
    const response: any = await axios.put(`${baseUrl}${path}`, data, { headers: headers });
    if(response.data.message) {
        toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    if(error.response?.data?.message) {
        toast.error(error.response.data.message);
    }
    console.error('Error:', error)
    throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};


export const _delete = async (path: String) => {
  try {
    const response: any = await axios.delete(`${baseUrl}${path}`, { headers: headers });
    if(response.data.message) {
        toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    console.error('Error ', error)
    throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};