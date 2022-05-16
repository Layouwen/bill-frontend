import { FC, useEffect, useState } from 'react';
import { Icon } from 'bw-mobile';
import styles from './main.module.scss';
import { cateGoryApi } from '@/api';
import { iconObj } from '@/api/category';

type ChangePropsFn = {
  change: (item: iconObj) => void;
  keyToggle: number;
};

const Main: FC<ChangePropsFn> = ({ change, keyToggle }) => {
  const [active, setActive] = useState(-1);
  const [mainList, setMainList] = useState<iconObj[]>([]);

  const changeMainFn = (item: iconObj) => {
    setActive(item.id);
    change(item);
  };

  const changKeyFn = (num: number) => {
    setActive(num);
  };

  const cateFn = async () => {
    const res = await cateGoryApi();
    const data = res.data.data;
    setMainList(data);
  };

  useEffect(() => {
    changKeyFn(Number(keyToggle));
    void cateFn();
  }, [keyToggle]);

  return (
    <div className={styles.context}>
      <div className={styles.main_wrapper}>
        {mainList.map((item, index) => (
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
