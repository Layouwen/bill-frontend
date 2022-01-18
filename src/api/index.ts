import { request } from '@/utils';

export * from './auth';
export * from './topic';
export * from './user';

export const uploadFile = async (body: FormData) => {
  return request.post<unknown, SuccessResponse<{ url: string }>>(
    '/upload',
    body,
    {
      headers: {
        contentType: 'multipart/form-data',
      },
    },
  );
};
