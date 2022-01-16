import { Icon } from '@/components';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './UserInfo.module.scss';

const UserInfo: FC = () => {
  return (
    <div
      className={classNames(
        styles['user-info'],
        'w-full relative overflow-hidden flex-shrink-0',
      )}
    >
      <div className={classNames(styles.avatar, 'absolute flex items-center')}>
        <div className={classNames(styles.img, 'overflow-hidden rounded-full')}>
          <img
            className="w-full h-full object-cover"
            src={
              'http://bill-rearend.oss-cn-guangzhou.aliyuncs.com/7ee0905f626645b291b4d6e62cefe1b7aa4c784895564d882ccaf532f4dead39'
            }
            alt={''}
          />
        </div>
        <span>Web_Program</span>
      </div>
      <div className={classNames(styles.middle, 'flex absolute w-full')}>
        <div className="grow flex flex-col justify-center items-center">
          <span className="font-bold">8</span>
          <p>已连续打卡</p>
        </div>
        <div className="grow flex flex-col justify-center items-center">
          <span className="font-bold">9</span>
          <p>记账总天数</p>
        </div>
        <div className="grow flex flex-col justify-center items-center">
          <span className="font-bold">50</span>
          <p>记账总笔数</p>
        </div>
      </div>
      <button className="absolute flex justify-center items-center">
        已打卡
      </button>
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
          <Icon
            name="back"
            className={classNames(styles.right, 'rotate-180')}
          />
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
