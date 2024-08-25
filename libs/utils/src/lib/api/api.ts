import { CookiesKeys } from 'types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const apiPerEnvironment: Record<string, string> = {
  'palo-frontend-production.up.railway.app': 'https://palo-backend-production.up.railway.app',
  localhost: 'http://localhost:3000',
  'app.palo.co': 'https://api.palo.co',
};

export const API_URL = apiPerEnvironment[window.location.hostname] || 'http://localhost:3000';

const token = Cookies.get(CookiesKeys.TOKEN);

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use(
  config => {
    const newToken = Cookies.get(CookiesKeys.TOKEN);
    if (newToken) {
      config.headers.Authorization = `Bearer ${newToken}`;
    }
    return config;
  },
  err => {
    throw err;
  },
);

export const noTokenApi = axios.create({
  baseURL: API_URL,
  timeout: 30000,
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
