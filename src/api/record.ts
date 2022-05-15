import request from '@/utils/request';

type recordType = {
  remark: string;
  categoryId: number;
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
  //新增记录
  return request.post<
    unknown,
    SuccessResponse<{ data: string; message: string; statusCode: number }[]>
  >('/record', body);
};

export const getRecord = (params?: getRecordType) => {
  //获取记录
  return request.get<unknown, SuccessResponse<getRecordResponse>>('/record', {
    params,
  });
};

export const editRecord = (params?: recordType, id?: number) => {
  //编辑记录
  return request.put<
    unknown,
    SuccessResponse<{ data: string; message: string; statusCode: number }[]>
  >(`/record/${id}`, params);
};

export const deleteRecord = (id: number) => {
  //删除记录
  return request.delete<
    unknown,
    SuccessResponse<{ data: string; message: string; statusCode: number }[]>
  >(`/record/${id}`);
};
