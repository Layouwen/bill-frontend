import { baseQuery } from '@/service/index';
import { createApi } from '@reduxjs/toolkit/query/react';

export const recordApi = createApi({
  reducerPath: 'recordApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getBill: builder.query<BaseResponseDto<BillDto>, number>({
      query: (year) => ({
        url: `/record/bill`,
        params: { year },
      }),
    }),
  }),
});

export const { useGetBillQuery } = recordApi;
