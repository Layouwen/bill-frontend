import { request } from '@/utils';

export type Topic = {
  id: number;
  avatar: string;
  name: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export const getTopics = () => {
  return request.get<unknown, SuccessResponse<Topic[]>>('/topic');
};

export const addTopic = (topic: { content: string; images?: string[] }) => {
  return request.post<unknown, SuccessResponse<unknown>>('/topic', topic);
};
