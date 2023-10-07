import { CookiesKeys } from '@types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = 'http://localhost:3000';

const token = Cookies.get(CookiesKeys.TOKEN);

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (config: any) => {
    return config;
  },
  (err: any) => {
    // toast.error(err.response.data.message, { position: 'top-center' });
    throw err;
  },
);
