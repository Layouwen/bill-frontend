import { baseQuery } from '@/service/index';
import { createApi } from '@reduxjs/toolkit/query/react';

export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getFollows: builder.query<
      FollowDto,
      { id: string; type: 'follow' | 'fans' }
    >({
      query: ({ id, type }) => ({
        url: `/follow/${id}`,
        params: {
          type,
        },
      }),
    }),
    postFollow: builder.mutation<{ statusCode: number }, string>({
      query: (id) => ({
        url: `/follow/${id}`,
        method: 'POST',
      }),
    }),
    deleteFollow: builder.mutation<{ statusCode: number }, string>({
      query: (id) => ({
        url: `/follow/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFollowsQuery,
  useDeleteFollowMutation,
  usePostFollowMutation,
} = followApi;
