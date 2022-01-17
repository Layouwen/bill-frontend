import { request } from '@/utils';

type UserInfo = {
  id: number;
  userId: string;
  name: string;
  username: string;
  avatar: string;
};

// type UpdateUserInfo = {
//   avatar: string;
//   username: string;
//   name: string;
// };

export const getUserInfo = () => {
  return request.get<unknown, SuccessResponse<UserInfo>>('/user/userInfo');
};

// export const updateUserInfo = (data: UpdateUserInfo) => {
//   return request.put<unknown, SuccessResponse<any>>('/user/userInfo');
// };
