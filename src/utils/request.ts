import { history } from '@/utils/history';
import { Toast } from 'antd-mobile';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_HOST || '';

const request = axios.create({
  baseURL: `${baseUrl}/api`,
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    (
      config.headers as { Authorization: string }
    ).Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  ({ response }) => {
    errorHandlers[response.status as keyof typeof errorHandlers]?.();
    return response.data;
  },
);

const errorHandlers = {
  401: () => {
    localStorage.removeItem('token');
    Toast.show({
      content: '登录已过期，请重新登录',
      duration: 800,
    });
    setTimeout(() => {
      history.push('/login');
    }, 800);
  },
  413: () => {
    Toast.show({ content: '图片太大，请重新选择', duration: 800 });
  },
};

export { request };
