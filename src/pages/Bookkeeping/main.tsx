import { FC, useEffect, useState } from 'react';
import styles from './main.module.scss';
import { cateGoryApi } from '@/api';
import { iconObj } from '@/api/category';
import mm from '@/assets/images/mm.jpg';

type changePropsFn = {
  change: (index: number, item: iconObj) => void;
};

const Main: FC<changePropsFn> = ({ change }) => {
  const [active, serActive] = useState(-1);
  const [mainList, setMainList] = useState<iconObj[]>([]);

  const changeMainFn = (index: number, item: iconObj) => {
    serActive(index);
    change(index, item);
  };

  const cateFn = async () => {
    const res = await cateGoryApi();
    const data = res.data.data;
    setMainList(data);
  };

  useEffect(() => {
    void cateFn();
  }, []);

  return (
    <div className={styles.context}>
      <div className={styles.main_wrapper}>
        {mainList.map((item, index) => (
          <div
            className={styles.wrapper_item}
            key={index}
            onClick={() => changeMainFn(index, item)}
          >
            <div
              className={
                active === index ? styles.newClass_icon_backGround : ''
              }
            >
              <img src={mm} alt="" className={styles.newClass_icon} />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
