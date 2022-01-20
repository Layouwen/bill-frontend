import { request } from '@/utils';

type UserInfo = {
  id: number;
  userId: string;
  name: string;
  username: string;
  avatar: string;
};

type UpdateUserInfo = {
  avatar: string;
  name: string;
};

type UpdatePassword = {
  password: string;
  newPassword: string;
};

export const getUserInfo = () => {
  return request.get<unknown, SuccessResponse<UserInfo>>('/user/userInfo');
};

export const updateUserInfo = (data: UpdateUserInfo, loading = true) => {
  return request.put<unknown, SuccessResponse<any>>('/user/userInfo', data, {
    loading,
  });
};

export const changePassword = (data: UpdatePassword, loading = true) => {
  return request.put<unknown, SuccessResponse<any>>('/user/password', data, {
    loading,
  });
};
