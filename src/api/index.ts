import { request } from '@/utils';

export * from './auth';
export * from './topic';

export const uploadFile = async (body: FormData) => {
  return request.post<unknown, BaseResponse<{ url: string }>>('/upload', body, {
    headers: {
      contentType: 'multipart/form-data',
    },
  });
};
