import { FC } from 'react';
import styles from './list.module.scss';

const List: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <div className={styles.title}>
          <div className={styles.left}>08月07日 星期六</div>
          <div className={styles.right}>支出：59.8</div>
        </div>
        {[1, 2, 3, 4].map((item) => (
          <div className={styles.record} key={item}>
            <div className={styles.left}>
              <div className={styles.icon} />
            </div>
            <div className={styles.right}>
              <div className={styles.remark}>共享单车</div>
              <div className={styles.price}>-1.6</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
