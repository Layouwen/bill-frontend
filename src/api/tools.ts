import { request } from '@/utils';

export const getCaptchaApi = () => {
  return request.get<unknown, any>('/tools/captcha');
};

export const getEmailCaptchaAPi = (email: string) => {
  return request.get<unknown, any>('/tools/email', {
    params: { email },
    loading: true,
  });
};
