import { FC, useState } from 'react';
import styles from './main.module.scss';
import { Icon } from '@/components';
import classNames from 'classnames';

type changePropsFn = {
  change: (index: number) => void;
};

const Main: FC<changePropsFn> = ({ change }) => {
  const mainList = [
    {
      id: 1,
      name: '餐饮',
      icon: 'canyin1',
    },
    {
      id: 2,
      name: '购物',
      icon: 'icon-',
    },
    {
      id: 3,
      name: '日用',
      icon: 'riyongbaihuo',
    },
    {
      id: 4,
      name: '日常',
      icon: 'mine',
    },
    {
      id: 5,
      name: '泡妞',
      icon: 'mine',
    },
    {
      id: 6,
      name: '约会',
      icon: 'mine',
    },
    {
      id: 7,
      name: '零售',
      icon: 'mine',
    },
    {
      id: 8,
      name: '外卖',
      icon: 'mine',
    },
  ];

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
    console.log(index);
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
