import CommentListItem from '@/pages/comment-list/components';
import { useGetTopicQuery } from '@/service/topic';
import { useAppSelector } from '@/store/hooks';
import { showDate } from '@/utils/time';
import { NavBar } from 'bw-mobile';
import { useNavigate } from 'react-router-dom';

const CommentList = () => {
  const userId = useAppSelector((state) => state.user.userInfo.id);
  const navigate = useNavigate();
  const { data, isLoading } = useGetTopicQuery(userId);

  return (
    <div className="page">
      <NavBar
        style={{ background: '#fff' }}
        onBack={() => navigate(-1)}
        back="返回"
      >
        评论
      </NavBar>
      {isLoading ? (
        <div className="loading">
          <div className="loading-icon" />
          加载中...
        </div>
      ) : (
        <div>
          {data?.data.data.map((item) => (
            <CommentListItem
              key={item.id}
              coverPicture={item.topic.images?.[0]}
              avatar={item.user.avatar}
              content={item.content}
              name={item.user.name}
              time={showDate(item.createdAt)}
              onClick={() => navigate(`/topic-detail/${item.topic.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
