import { request } from '@/utils';

export type Topic = {
  id: number;
  name: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export const getTopics = () => {
  return request.get<unknown, BaseResponse<Topic[]>>('/topic');
};

export const addTopic = (topic: { content: string; images?: string[] }) => {
  return request.post<unknown, BaseResponse<unknown>>('/topic', topic);
};
