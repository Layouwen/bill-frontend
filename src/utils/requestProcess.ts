import store from '@/store';
import { logOut } from '@/store/slice';
import { Toast } from 'antd-mobile';

const clearTokenToLogin = (msg: string) => {
  store.dispatch(logOut());
  Toast.show({ content: msg, icon: 'fail', duration: 1000 });
  setTimeout(() => {
    window.location.hash = '#/login';
  }, 1000);
  return msg;
};

export const baseResponseProcess = (statusCode: string) => {
  switch (parseInt(statusCode)) {
    case 403:
      return clearTokenToLogin('登录已过期');
    case 402:
      return clearTokenToLogin('身份验证失败');
    case 401:
      return clearTokenToLogin('未登录账号');
  }
};

export const errorResponseProcess = (data: {
  message: string[] | string;
  statusCode: number | string;
}) => {
  const statusCode =
    typeof data.statusCode === 'number'
      ? data.statusCode
      : parseInt(data.statusCode);
  const params = {
    content: typeof data.message === 'string' ? data.message : data.message[0],
    icon: 'success',
    duration: 1000,
  } as { content: string; icon?: string };
  if (statusCode !== 200) delete params.icon;
  Toast.show(params);
};
