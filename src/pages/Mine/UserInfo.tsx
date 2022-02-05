import { FC } from 'react';
import classNames from 'classnames';
import { Icon } from '@/components';
import { useNavigate } from 'react-router-dom';
import styles from './UserInfo.module.scss';

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
      <div className={classNames(styles.middle, 'flex absolute w-full')}>
        <div className="grow flex flex-col justify-center items-center">
          <span className="font-bold">{numberInfo.checkInKeep || 0}</span>
          <p>已连续打卡</p>
        </div>
        <div className="grow flex flex-col justify-center items-center">
          <span className="font-bold">{numberInfo.checkInAll || 0}</span>
          <p>记账总天数</p>
        </div>
        <div className="grow flex flex-col justify-center items-center">
          <span className="font-bold">{numberInfo.recordCount || 0}</span>
          <p>记账总笔数</p>
        </div>
      </div>
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
            升级为VIP
          </span>
          <Icon name="right" className={classNames(styles.right)} />
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
