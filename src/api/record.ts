import request from '@/utils/request';

type recordType = {
  remark: string;
  categoryId: string;
  type: string;
  amount: string;
  time: string;
};

export const addRecord = (body?: recordType) => {
  return request.post<
    unknown,
    SuccessResponse<{ data: string; message: string; statusCode: number }[]>
  >('/record', body);
};
