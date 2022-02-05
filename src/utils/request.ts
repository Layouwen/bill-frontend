import {
  baseResponseProcess,
  errorResponseProcess,
} from '@/utils/requestProcess';
import { Toast } from 'antd-mobile';
import axios from 'axios';

const request = axios.create({
  baseURL: `/api`,
  timeout: 20000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    (
      config.headers as { Authorization: string }
    ).Authorization = `Bearer ${token}`;
  }
  if (config.loading) loading();
  return config;
});

request.interceptors.response.use(
  (response) => {
    if (response.config.loading) errorResponseProcess(response.data);
    return response.data;
  },
  ({ message, response, config }) => {
    baseResponseProcess(response.data.statusCode);
    if (config.loading) errorResponseProcess(response.data);
    message.includes('timeout') &&
      Toast.show({ content: '请求超时', icon: 'fail', duration: 800 });
    return response.data;
  },
);

export default request;

const loading = () => {
  Toast.show({
    icon: 'loading',
    content: '加载中',
    maskClickable: false,
    duration: 0,
  });
};
