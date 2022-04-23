import CommentListItem from '@/pages/comment-list/components';
import { useGetSystemNotifyQuery } from '@/service/systemNotify';
import { showDate } from '@/utils/time';
import { NavBar } from 'bw-mobile';
import { useNavigate } from 'react-router-dom';

const SystemNotify = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSystemNotifyQuery();
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <NavBar back="返回" onBack={() => navigate(-1)}>
        系统通知
      </NavBar>
      {data!.data.map((i) => {
        return (
          <CommentListItem
            key={i.id}
            name={i.user.name}
            time={showDate(i.createdAt)}
            content={i.content}
            avatar={i.user.avatar}
            coverPicture={i.coverPicture}
          />
        );
      })}
    </div>
  );
};

export default SystemNotify;
