import { request } from '@/utils';

interface UserInfo {
  id: number;
  userId: string;
  name: string;
  username: string;
  avatar: string;
}

export const getUserInfo = () => {
  return request.post<unknown, BaseResponse<UserInfo>>('/user/userInfo');
};
