import { baseQuery } from '@/service/index';
import { createApi } from '@reduxjs/toolkit/query/react';

export const recordApi = createApi({
  reducerPath: 'recordApi',
  baseQuery: baseQuery(),
  tagTypes: ['Record'],
  endpoints: (builder) => ({
    record: builder.query<BaseResponseDto<any>, GetRecordType>({
      query: (params) => ({ url: '/record', params }),
      providesTags: ['Record'],
    }),
    addRecord: builder.mutation<BaseResponseDto<any>, RecordType>({
      query(body) {
        return { url: '/record', method: 'POST', body };
      },
      invalidatesTags: ['Record'],
    }),
    updateRecord: builder.mutation<
      BaseResponseDto<string>,
      { id: number; params: RecordType }
    >({
      query: ({ id, params }) => ({
        url: `/record/${id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['Record'],
    }),
    deleteRecord: builder.mutation<BaseResponseDto<string>, number>({
      query: (id) => ({ url: `/record/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Record'],
    }),
    bill: builder.query<BaseResponseDto<BillDto>, number>({
      query: (year) => ({ url: `/record/bill`, params: { year } }),
    }),
  }),
});

export const {
  useRecordQuery,
  useAddRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
  useBillQuery,
} = recordApi;
