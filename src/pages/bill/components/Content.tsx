import { spliceNumberByPoint } from '@/utils/time';
import { Icon } from 'bw-mobile';
import classNames from 'classnames';
import styles from './Content.module.scss';

const Content = () => {
  const list = [
    {
      id: 0,
      month: 8,
      income: '123123.31',
      expand: '43212.45',
      balance: '-288.08',
    },
  ];
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
        {list.map((i) => (
          <li key={i.id}>
            <div className={styles.month}>{i.month}月</div>
            <div>
              <div>
                {spliceNumberByPoint(Number(i.income))[0]}.
                <span>{spliceNumberByPoint(Number(i.income))[1]}</span>
              </div>
            </div>
            <div>
              <div>
                {spliceNumberByPoint(Number(i.expand))[0]}.
                <span>{spliceNumberByPoint(Number(i.expand))[1]}</span>
              </div>
            </div>
            <div>
              <div>
                {spliceNumberByPoint(Number(i.balance))[0]}.
                <span>{spliceNumberByPoint(Number(i.balance))[1]}</span>
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
