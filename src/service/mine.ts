import { baseQuery } from '@/service/index';
import { createApi } from '@reduxjs/toolkit/query/react';

export const mineApi = createApi({
  reducerPath: 'mineApi',
  baseQuery: baseQuery(),
  tagTypes: ['Mine'],
  endpoints: (builder) => ({
    userinfo: builder.query<BaseResponseDto<UserInfo>, void>({
      query: () => '/user/userInfo',
      providesTags: ['Mine'],
    }),
  }),
});

export const { useUserinfoQuery } = mineApi;
