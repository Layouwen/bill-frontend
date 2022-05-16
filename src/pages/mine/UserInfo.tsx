import CheckInfo from '@/components/CheckInfo';
import { FC } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './UserInfo.module.scss';
import { Icon } from 'bw-mobile';

type UserInfoProps = {
  avatar?: string;
  name?: string;
  checkIn: boolean;
  numberInfo: {
    checkInAll: number;
    checkInKeep: number;
    recordCount: number;
  };
  onCheckIn: () => void;
};

const UserInfo: FC<UserInfoProps> = ({
  name,
  avatar,
  checkIn,
  onCheckIn,
  numberInfo,
}) => {
  const navigate = useNavigate();
  const toUserInfo = () => navigate('/user-info');

  return (
    <div
      className={classNames(
        styles['user-info'],
        'w-full relative overflow-hidden flex-shrink-0',
      )}
    >
      <div
        className={classNames(styles.avatar, 'absolute flex items-center')}
        onClick={toUserInfo}
      >
        <div className={classNames(styles.img, 'overflow-hidden rounded-full')}>
          <img
            className="w-full h-full object-cover"
            src={
              avatar ||
              'https://bill-rearend.oss-cn-guangzhou.aliyuncs.com/static/defulatAvatar.jpg'
            }
            alt={name}
          />
        </div>
        <span>{name || '未登录'}</span>
      </div>
      <CheckInfo className="absolute" data={numberInfo} />
      {name && (
        <button
          className="absolute flex justify-center items-center"
          onClick={onCheckIn}
        >
          {checkIn ? '已打卡' : '打卡'}
        </button>
      )}
      <div
        className={classNames(
          styles['bottom-wrapper'],
          'absolute bottom-0 left-1/2 -translate-x-1/2 w-full',
        )}
      >
        <div
          className={classNames(
            styles.bottom,
            'w-full h-full flex items-center',
          )}
        >
          <Icon name="vip" className={styles.icon} />
          <span className="grow" style={{ lineHeight: '15px' }}>
            {/*升级为VIP*/}
            暂不支持VIP功能
          </span>
          <Icon name="right" className={classNames(styles.right)} />
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
