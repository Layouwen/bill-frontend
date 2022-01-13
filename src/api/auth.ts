import { request } from '@/utils';

interface LoginRes {
  token: string;
}

export const login = (body: { username: string; password: string }) => {
  return request.post<never, BaseResponse<LoginRes>>('/auth/login', body);
};
