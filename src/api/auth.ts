import { request } from '@/utils';

interface LoginRes {
  token: string;
}

export const login = (body: { username: string; password: string }) => {
  return request.post<never, SuccessResponse<LoginRes>>('/auth/login', body);
};

export const sign = (body: {
  username: string;
  password: string;
  name: string;
}) => {
  return request.post<never, SuccessResponse<LoginRes>>('/auth/sign', body);
};
