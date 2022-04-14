import { request } from '@/utils';

export type Topic = {
  id: number;
  user: {
    id: number;
    avatar: string;
    name: string;
  };
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  isLike: boolean;
  likeCount: number;
  commentCount: number;
  shareCount: number;
};

export type TopicDetail = {
  comments: {
    id: number;
    content: string;
    user: {
      id: number;
      name: string;
      avatar: string;
    };
  }[];
} & Topic;

export const getTopics = (recommend?: boolean) => {
  return request.get<
    unknown,
    SuccessResponse<{
      topics: Topic[];
      total: number;
    }>
  >('/topic', {
    params: {
      recommend,
    },
  });
};

export const getTopicDetail = (topicId: string) => {
  return request.get<unknown, SuccessResponse<TopicDetail>>(
    `/topic/${topicId}`,
  );
};

export const addComment = (
  id: number,
  body: { content: string; replyTo?: number },
) => {
  return request.post<unknown, SuccessResponse<unknown>>(
    `/topic/${id}/comment`,
    body,
  );
};

export const addTopic = (topic: { content: string; images?: string[] }) => {
  return request.post<unknown, SuccessResponse<unknown>>('/topic', topic);
};

export const topicLike = (topicId: number) => {
  return request.put<unknown, SuccessResponse<unknown>>(
    `/topic/like/${topicId}`,
  );
};

export const topicUserInfoApi = (userId: string) => {
  return request.get<unknown, SuccessResponse<any>>(`/topic/user/${userId}`);
};
