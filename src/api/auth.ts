import { request } from '@/utils';

interface LoginRes {
  token: string;
  userInfo: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
}

export const login = (
  body: { username: string; password: string },
  loading = true,
) => {
  return request.post<never, SuccessResponse<LoginRes>>('/auth/login', body, {
    loading,
  });
};

export const sign = (
  body: {
    username: string;
    password: string;
    name: string;
  },
  loading = true,
) => {
  return request.post<never, SuccessResponse<LoginRes>>('/auth/sign', body, {
    loading,
  });
};
