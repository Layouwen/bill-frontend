import { request } from '@/utils';

export const followUserApi = (followId: number) => {
  return request.post(`/follow/${followId}`);
};

export const unfollowUserApi = (followId: number) => {
  return request.delete(`/follow/${followId}`);
};
