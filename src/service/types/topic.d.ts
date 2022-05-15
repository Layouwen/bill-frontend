interface CommentDto {
  id: number;
  content: string;
  topic: {
    id: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    avatar: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}
