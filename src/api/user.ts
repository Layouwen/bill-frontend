import { request } from '@/utils';

type UpdateUserInfo = {
  avatar: string;
  name: string;
};

type UpdatePassword = {
  password: string;
  newPassword: string;
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

export const checkInPost = (loading = true) => {
  return request.post<unknown, SuccessResponse<any>>('/check_in', null, {
    loading,
  });
};
