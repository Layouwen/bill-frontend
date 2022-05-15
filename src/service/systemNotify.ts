import { baseQuery } from '@/service/index';
import { createApi } from '@reduxjs/toolkit/query/react';

export const systemNotifyApi = createApi({
  reducerPath: 'systemNotifyApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getSystemNotify: builder.query<BaseResponseDto<SystemNotify[]>, void>({
      query: () => `/system_notify`,
    }),
  }),
});

export const { useGetSystemNotifyQuery } = systemNotifyApi;
