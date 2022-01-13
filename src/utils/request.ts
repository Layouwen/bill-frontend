import axios from 'axios';

const baseUrl = import.meta.env.VITE_HOST || '';

const request = axios.create({
  baseURL: `${baseUrl}/api`,
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers?.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use((config) => {
  return config.data;
});

export { request };
