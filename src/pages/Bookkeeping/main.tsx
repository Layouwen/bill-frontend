import { FC, useState } from 'react';
import styles from './main.module.scss';
import { Icon } from '@/components';
import classNames from 'classnames';
import mainList from '@/pages/Bookkeeping/icon';

console.log(mainList, '这是icon的数组');

type changePropsFn = {
  change: (index: number) => void;
};

const Main: FC<changePropsFn> = ({ change }) => {
  const [active, serActive] = useState(-1);

  /* eslint-disable */
  const isActive = (item: any, index: number) => {
    // return index === active ? item.iconActive : item.icon;
    return item.icon;
  };
  /* eslint-disable */

  const changeMainFn = (index: number) => {
    serActive(index);
    change(index);
  };

  return (
    <div className={styles.context}>
      <div className={styles.main_wrapper}>
        {mainList.map((item, index) => (
          <div
            className={styles.wrapper_item}
            key={index}
            onClick={() => changeMainFn(index)}
          >
            <div
              className={
                active === index ? styles.newClass_icon_backGround : ''
              }
            >
              <Icon
                name={isActive(item, index)}
                className={classNames(['tab-icon', styles.newClass_icon])}
              />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
