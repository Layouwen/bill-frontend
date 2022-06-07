import { spliceNumberByPoint } from '@/utils/time';
import { Icon } from 'bw-mobile';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './Content.module.scss';

type DataItem = {
  month: string;
} & BillItemDto;

type ContentProps = {
  data: DataItem[];
};

const Content: FC<ContentProps> = ({ data }) => {
  function showData(data: DataItem[]) {
    if (data.length > 0) return data;
    return [{ month: '1月', income: 0, expand: 0, balance: 0 }];
  }

  return (
    <div className={classNames(styles.wrapper, 'flex-grow overflow-auto')}>
      <ul>
        <li className={styles.header}>
          <div>月份</div>
          <div>收入</div>
          <div>支出</div>
          <div>结束</div>
          <div />
        </li>
        {showData(data).map((i) => (
          <li key={i.month}>
            <div className={styles.month}>{i.month}</div>
            <div>
              <div>
                {spliceNumberByPoint(i.income)[0]}.
                <span>{spliceNumberByPoint(i.income)[1]}</span>
              </div>
            </div>
            <div>
              <div>
                {spliceNumberByPoint(i.expand)[0]}.
                <span>{spliceNumberByPoint(i.expand)[1]}</span>
              </div>
            </div>
            <div>
              <div>
                {spliceNumberByPoint(i.balance)[0]}.
                <span>{spliceNumberByPoint(i.balance)[1]}</span>
              </div>
            </div>
            <div>
              <Icon name="right" style={{ fontSize: 11 }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Content;
