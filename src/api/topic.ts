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

export const getTopics = (recommend?: boolean) => {
  return request.get<unknown, SuccessResponse<Topic[]>>('/topic', {
    params: {
      recommend,
    },
  });
};

export const addTopic = (topic: { content: string; images?: string[] }) => {
  return request.post<unknown, SuccessResponse<unknown>>('/topic', topic);
};

export const topicLike = (topicId: number) => {
  return request.put<unknown, SuccessResponse<unknown>>(
    `/topic/like/${topicId}`,
  );
};
