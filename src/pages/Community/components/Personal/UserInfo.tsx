import classNames from 'classnames';
import { FC } from 'react';
import styles from './UserInfo.module.scss';

interface UserInfoProps {
  data?: {
    avatar: string;
    id: number;
    name: string;
  };
}

const UserInfo: FC<UserInfoProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.avatar, 'rounded-full')}>
        <img src={data?.avatar} alt="" />
      </div>
      <div className={styles.middle}>
        <span className={styles.name}>{data?.name || '我是小可爱'}</span>
        <div className={styles.desc}>
          <div>
            <span>22</span> 关注
          </div>
          <div>
            <span>89</span> 粉丝
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        <button>+关注</button>
      </div>
    </div>
  );
};

export default UserInfo;
