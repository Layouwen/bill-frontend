import classNames from 'classnames';
import styles from './UserInfo.module.scss';

const UserInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.avatar, 'rounded-full')}>
        <img src="" alt="" />
      </div>
      <div className={styles.middle}>
        <span className={styles.name}>打卡第二个百万</span>
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
