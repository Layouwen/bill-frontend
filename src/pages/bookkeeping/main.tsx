import { FC, useEffect, useState } from 'react';
import { Icon } from 'bw-mobile';
import styles from './main.module.scss';
import { iconObj } from '@/api/category';

type ChangePropsFn = {
  change: (item: iconObj) => void;
  keyToggle: number;
  categoryList: iconObj[];
};

const Main: FC<ChangePropsFn> = ({ change, keyToggle, categoryList }) => {
  const [active, setActive] = useState(-1);

  const changeMainFn = (item: iconObj) => {
    setActive(item.id);
    change(item);
  };

  const changKeyFn = (num: number) => {
    setActive(num);
  };

  useEffect(() => {
    changKeyFn(Number(keyToggle));
  }, [keyToggle]);

  return (
    <div className={styles.context}>
      <div className={styles.main_wrapper}>
        {categoryList.map((item, index) => (
          <div
            className={styles.wrapper_item}
            key={index}
            onClick={() => changeMainFn(item)}
          >
            <div
              className={
                active === item.id ? styles.newClass_icon_backGround : ''
              }
            >
              <Icon name={item.icon} style={{ fontSize: 30 }} />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
