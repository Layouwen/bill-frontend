import request from '@/utils/request';

type recordType = {
  remark: string;
  categoryId: string;
  type: string;
  amount: string;
  time: string;
};

type getRecordType = {
  startDate: string;
  endDate?: string;
};

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

export const addRecord = (body?: recordType) => {
  return request.post<
    unknown,
    SuccessResponse<{ data: string; message: string; statusCode: number }[]>
  >('/record', body);
};

export const getRecord = (params?: getRecordType) => {
  return request.get<unknown, SuccessResponse<getRecordResponse>>('/record', {
    params: params,
  });
};
