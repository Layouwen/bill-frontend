import { followUserApi, unfollowUserApi } from '@/api/follow';
import { useAppSelector } from '@/store/hooks';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './UserInfo.module.scss';

interface UserInfoProps {
  data?: {
    avatar: string;
    id: number;
    name: string;
  };
  isFollow?: boolean;
  fansCount?: number;
  followCount?: number;
  topicUserInfo: () => void;
}

const UserInfo: FC<UserInfoProps> = ({
  data,
  isFollow,
  topicUserInfo,
  followCount,
  fansCount,
}) => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const followUser = async (followId: number) => {
    await followUserApi(followId);
    topicUserInfo();
  };

  const unFollowUser = async (followId: number) => {
    await unfollowUserApi(followId);
    topicUserInfo();
  };

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.avatar, 'rounded-full')}>
        <img src={data?.avatar} alt="" />
      </div>
      <div className={styles.middle}>
        <span className={styles.name}>{data?.name || '我是小可爱'}</span>
        <div className={styles.desc}>
          <div>
            <span>{followCount || 0}</span> 关注
          </div>
          <div>
            <span>{fansCount || 0}</span> 粉丝
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        {data?.id &&
          data.id !== userInfo.id &&
          (isFollow ? (
            <button onClick={() => unFollowUser(data.id)}>已关注</button>
          ) : (
            <button onClick={() => followUser(data.id)}>+关注</button>
          ))}
      </div>
    </div>
  );
};

export default UserInfo;
