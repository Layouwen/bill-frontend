import { FC, useEffect, useState } from 'react';
import { FixedPin } from 'bw-mobile';
import styles from './list.module.scss';
import { recordChildren } from '../detail/List';
import { getTimedate, getTimeDateYear, getWeekByDay } from '@/utils/DataTime';

type stateType = {
  state: recordChildren;
};

const List: FC<stateType> = ({ state }) => {
  const list = { 类型: '', 金额: '', 日期: '', 备注: '' };
  const [listKeys, setListKeys] = useState([
    'type',
    'amount',
    'time',
    'remark',
  ]);

  const createFn = () => {
    const { amount, remark } = state;
    let { type, time } = state;
    switch (type) {
      case '-':
        type = '支出';
        break;
      case '+':
        type = '收入';
        break;
    }
    const date1 = new Date(time);
    const timeDate = getTimeDateYear(date1);
    const timeDate1 = getTimedate(date1);
    const weekByDay = getWeekByDay(timeDate1);
    time = timeDate + '  ' + weekByDay;

    const list = [type, amount, time, remark];
    setListKeys(list);
  };

  useEffect(() => {
    createFn();
  }, []);

  return (
    <div className={styles.list}>
      {Object.keys(list).map((item, index) => (
        <div className={styles.listItem} key={index}>
          {item}
          <span className={styles.listKeys}>{listKeys[index]}</span>
        </div>
      ))}
      <FixedPin>分享</FixedPin>
    </div>
  );
};

export default List;
