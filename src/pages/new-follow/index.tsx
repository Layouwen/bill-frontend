import UserFollowItem from '@/pages/new-follow/components';
import {
  useDeleteFollowMutation,
  useGetFollowsQuery,
  usePostFollowMutation,
} from '@/service/follow';
import { useAppSelector } from '@/store/hooks';
import { showDate } from '@/utils/time';
import { NavBar } from 'bw-mobile';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const NewFollow = () => {
  const { id } = useAppSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const handleDeleteFollow = async (id: number) => {
    const result = await deleteFollow(id + '');
    'data' in result && result.data.statusCode === 200 && refetch();
  };
  const handlePostFollow = async (id: number) => {
    const result = await postFollow(id + '');
    'data' in result && result.data.statusCode === 200 && refetch();
  };

  const { isLoading, data, refetch } = useGetFollowsQuery({
    id: id + '',
    type: 'fans',
  });

  const [deleteFollow] = useDeleteFollowMutation<{ data: string }>();
  const [postFollow] = usePostFollowMutation();
  return (
    <div className="page">
      <NavBar className={styles['nav-bar']} onBack={() => navigate(-1)}>
        新增关注
      </NavBar>
      {isLoading ? (
        '加载中'
      ) : (
        <div>
          {data?.data.data.map((i) => (
            <UserFollowItem
              key={i.id}
              username={i.name}
              avatar={i.avatar}
              isFollow={i.isFollow}
              followTime={showDate(i.createdAt)}
              onClick={() => navigate(`/community/personal/${i.userId}`)}
              onSubmit={async () => {
                if (i.isFollow) {
                  await handleDeleteFollow(i.userId);
                } else {
                  await handlePostFollow(i.userId);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewFollow;
