import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from './top.module.scss';
import Precision from './component';
import { numType } from '@/pages/Detail/index';

type timedate = {
  change: (val: string) => void;
  numExpendIncome: numType | [];
};

const Top: FC<timedate> = ({ change, numExpendIncome }) => {
  const [visible1, setVisible1] = useState(false);
  const [yearMoth, setYearMoth] = useState<string[]>([]);
  const PrecisionFn = () => {
    setVisible1(true);
  };

  const ChangeDateToggle = () => {
    setVisible1(false);
  };

  const ChangeTimeDate = async (time: string, arr: Array<string>) => {
    setYearMoth(arr);
    change(time);
  };

  useEffect(() => {
    const time2 = new Date();
    const Y = time2.getFullYear() + '年';
    const M =
      time2.getMonth() + 1 < 10
        ? '0' + (time2.getMonth() + 1)
        : time2.getMonth() + 1;

    const arrayDate = [String(Y), String(M)];
    setYearMoth(arrayDate);
  }, []);

  return (
    <div className={styles.top}>
      <div className={styles.title}>蓝鲸记账</div>
      <div className={classNames([styles.left, styles['top-text-1-wrapper']])}>
        <div className={styles['top-text-1']}>{yearMoth[0]}</div>
        <div className={styles['left-bottom']}>
          <div className={styles['bottom-wrapper']} onClick={PrecisionFn}>
            <span className={styles.month}>{yearMoth[1]}</span>月
            <Precision
              visible1={visible1}
              change={() => ChangeDateToggle()}
              changeTime={(time: string, arr: Array<string>) =>
                ChangeTimeDate(time, arr)
              }
            />
          </div>
        </div>
      </div>
      <div
        className={classNames([styles.middle, styles['top-text-1-wrapper']])}
      >
        <div className={styles['top-text-1']}>收入</div>
        <div className={styles['middle-bottom']}>
          <div className={styles['bottom-wrapper']}>
            <span className={styles.big}>
              {' '}
              {numExpendIncome[1] && numExpendIncome[1].length
                ? numExpendIncome[1][0]
                : '00'}
            </span>
            <span className={styles.bigNum}>
              {numExpendIncome[1] && numExpendIncome[1].length
                ? '.' + numExpendIncome[1][1]
                : '.00'}
            </span>
          </div>
        </div>
      </div>
      <div className={classNames([styles.right, styles['top-text-1-wrapper']])}>
        <div className={styles['top-text-1']}>支出</div>
        <div className={styles['right-bottom']}>
          <div className={styles['bottom-wrapper']}>
            <span className={styles.big}>
              {numExpendIncome[0] && numExpendIncome[0].length
                ? numExpendIncome[0][0]
                : '00'}
            </span>
            <span className={styles.bigNum}>
              {numExpendIncome[0] && numExpendIncome[0].length
                ? '.' + numExpendIncome[0][1]
                : '.00'}
            </span>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          styles['list-wrapper'],
          'w-full absolute bottom-0 left-1/2 -translate-x-1/2',
        )}
      >
        <div className={classNames(styles.list, 'h-full')}></div>
      </div>
    </div>
  );
};

export default Top;
