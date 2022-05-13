interface FollowDto {
  data: {
    data: {
      avatar: string;
      createdAt: string;
      fans: number;
      follow: number;
      id: number;
      isFollow: boolean;
      name: string;
      topics: number;
      updatedAt: string;
      userId: number;
    }[];
    count: number;
  };
}
