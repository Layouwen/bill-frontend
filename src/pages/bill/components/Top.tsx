import { Icon } from 'bw-mobile';
import classNames from 'classnames';
import styles from './Top.module.scss';

const Top = () => {
  const onSelectYear = () => {
    console.log('选择时间');
  };

  return (
    <div className={classNames(styles.wrapper, 'flex flex-col flex-shrink-0')}>
      <div
        className={classNames(styles.top, 'flex items-center flex-shrink-0')}
      >
        <span>
          <div className="flex items-center" onClick={onSelectYear}>
            2021年
            <Icon name="show-bottom" style={{ fontSize: 12, marginLeft: 4 }} />
          </div>
        </span>
        <div>账单</div>
        <span />
      </div>
      <div
        className={classNames(
          styles.total,
          'flex flex-col justify-around items-center flex-grow',
        )}
      >
        <span>结余</span>
        <div>
          -3904.<span>67</span>
        </div>
      </div>
      <div className={classNames(styles.bottom, 'flex flex-shrink-0')}>
        <div className={styles.income}>
          <div>
            <span>收入</span>
            <div>
              7730.<span>59</span>
            </div>
          </div>
        </div>
        <div className={styles.expand}>
          <div>
            <span>支出</span>
            <div>
              11635.<span>59</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
