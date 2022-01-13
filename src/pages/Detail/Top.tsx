import classNames from 'classnames';
import { FC } from 'react';
import styles from './top.module.scss';

const Top: FC = () => {
  return (
    <div className={styles.top}>
      <div className={styles.title}>蓝鲸记账</div>
      <div className={classNames([styles.left, styles['top-text-1-wrapper']])}>
        <div className={styles['top-text-1']}>2021年</div>
        <div className={styles['left-bottom']}>
          <div className={styles['bottom-wrapper']}>
            <span className={styles.month}>08</span>月
          </div>
        </div>
      </div>
      <div
        className={classNames([styles.middle, styles['top-text-1-wrapper']])}
      >
        <div className={styles['top-text-1']}>收入</div>
        <div className={styles['middle-bottom']}>
          <div className={styles['bottom-wrapper']}>
            <span className={styles.big}>0</span>.00
          </div>
        </div>
      </div>
      <div className={classNames([styles.right, styles['top-text-1-wrapper']])}>
        <div className={styles['top-text-1']}>支出</div>
        <div className={styles['right-bottom']}>
          <div className={styles['bottom-wrapper']}>
            <span className={styles.big}>1855</span>.05
          </div>
        </div>
      </div>
      <div className={styles.list}>1</div>
    </div>
  );
};

export default Top;
