import { RootState } from '@/store';
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = (params?: FetchBaseQueryArgs) => {
  return fetchBaseQuery({
    ...params,
    baseUrl: '/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
};

export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getFollows: builder.query<
      {
        data: {
          data: {
            avatar: string;
            createdAt: string;
            fans: number;
            follow: number;
            id: number;
            isFollow: boolean;
            name: string;
            topics: number;
            updatedAt: string;
            userId: number;
          }[];
          count: number;
        };
      },
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
