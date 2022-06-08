import request from '@/utils/request';

export type getRecordChilder = {
  amount: string;
  category: {
    createdAt: string;
    icon: string;
    id: number;
    name: string;
    updatedAt: string;
  };
  createdAt: string;
  id: number;
  remark: string;
  time: string;
  type: string;
  updatedAt: string;
};

export type getRecordResponse = {
  total: number;
  data: getRecordChilder[];
  expend: number;
  income: number;
};

export const getRecord = (params?: GetRecordType) => {
  //获取记录
  return request.get<unknown, SuccessResponse<getRecordResponse>>('/record', {
    params,
  });
};
