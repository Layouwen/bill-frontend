import { request } from '@/utils';

export * from './auth';
export * from './topic';
export * from './user';
export * from './record';
export * from './category';
export * from './tools';

export const uploadFile = async (body: FormData, loading = true) => {
  return request.post<unknown, SuccessResponse<{ url: string }>>(
    '/upload',
    body,
    {
      headers: {
        contentType: 'multipart/form-data',
      },
      loading,
    },
  );
};
