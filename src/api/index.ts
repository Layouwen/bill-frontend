import { request } from '@/utils';

export * from './auth';
export * from './topic';

export const uploadFile = async (body: FormData) => {
  return request.post('/upload', body, {
    headers: {
      contentType: 'multipart/form-data',
    },
  });
};
