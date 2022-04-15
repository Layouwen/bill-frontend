import { request } from '@/utils';

export const getCaptchaApi = () => {
  return request.get<unknown, any>('/tools/captcha');
};
