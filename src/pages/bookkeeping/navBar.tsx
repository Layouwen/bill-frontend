import { CategoryAmountType } from '@/api';
import { playSound } from '@/modules';
import { FC, useEffect, useState } from 'react';
import styles from './navBar.module.scss';
import { useNavigate } from 'react-router-dom';

type navBarType = {
  change: (type: CategoryAmountType) => void;
  type: string;
};

const navBar: FC<navBarType> = ({ change, type }) => {
  const [active, setActive] = useState(0);
  const navigation = useNavigate();

  const handleChangeTab = (index: number) => {
    const type = index === 0 ? '-' : '+';
    change(type);
    setActive(index);
  };

  const backFn = () => {
    playSound.turnPage();
    navigation(-1);
  };

  useEffect(() => {
    const index = type === '-' ? 0 : 1;
    handleChangeTab(index);
  }, [type]);

  return (
    <div className={styles.top}>
      <span className={styles.cancel} onClick={() => backFn()}>
        取消
      </span>
      <p>
        {['支出', '收入'].map((item, index) => (
          <span
            key={index}
            className={index === active ? styles.active : ''}
            onClick={() => handleChangeTab(index)}
          >
            {item}
          </span>
        ))}
      </p>
    </div>
  );
};

export default navBar;
