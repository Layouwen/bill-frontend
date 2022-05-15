import { baseQuery } from '@/service/index';
import { createApi } from '@reduxjs/toolkit/query/react';

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getTopic: builder.query<
      BaseResponseDto<{ data: CommentDto[]; total: number }>,
      string | number
    >({
      query: (id) => ({
        url: `/topic/${id}/comment`,
      }),
    }),
  }),
});

export const { useGetTopicQuery } = topicApi;
