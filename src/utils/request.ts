import { Toast } from 'antd-mobile';
import axios from 'axios';

const baseUrl = '';

const request = axios.create({
  baseURL: `${baseUrl}/api`,
  timeout: 20000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    (
      config.headers as { Authorization: string }
    ).Authorization = `Bearer ${token}`;
  }
  if (config.loading) {
    Toast.show({
      icon: 'loading',
      content: '加载中',
      maskClickable: false,
      duration: 0,
    });
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    showMessage(response);
    return response.data;
  },
  ({ message, response, config }) => {
    if (config.loading) {
      if (message.includes('timeout')) {
        Toast.show({ content: '请求超时', icon: 'fail', duration: 800 });
      } else {
        showMessage(response);
      }
    }
    return response.data;
  },
);

const errorHandlers = (statusCode: string | number) => {
  switch (Number(statusCode)) {
    case 403:
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.hash = '/login';
      }, 1000);
      return '登录已过期，请重新登';
    case 401:
      return '未登录，请先登录';
    case 413:
      return '图片过大，请重新选择';
    default:
      return '';
  }
};

const showMessage = (response: any) => {
  const { data, config } = response;
  const content = errorHandlers(data.statusCode);
  if (config.loading) {
    const params = {
      content:
        content || typeof data.message === 'string'
          ? data.message
          : data.message[0],
      icon: 'success',
      duration: 1000,
    } as { content: string; icon?: string };
    if (data.statusCode !== 200) delete params.icon;
    Toast.show(params);
  } else if (content) {
    Toast.show({
      content,
      icon: 'fail',
    });
  }
};

export default request;
