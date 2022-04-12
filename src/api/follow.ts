import { request } from '@/utils';

export const followUserApi = (followId: number) => {
  return request.post(`/follow/${followId}`);
};

export const unfollowUserApi = (followId: number) => {
  return request.delete(`/follow/${followId}`);
};

export enum FollowListType {
  FOLLOW = 'follow',
  FANS = 'fans',
}

export const getFollowList = (followId: number, type: FollowListType) => {
  return request.get<unknown, SuccessResponse<any>>(`/follow/${followId}`, {
    params: { type },
  });
};
