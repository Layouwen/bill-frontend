import request from '@/utils/request';

export type iconObj = {
  createdAt: string;
  icon: string;
  id: number;
  name: string;
  updatedAt: string;
};

export type iconType = {
  count: number;
  data: iconObj[];
};

export const cateGoryApi = () => {
  return request.get<unknown, SuccessResponse<iconType>>('/category');
};
