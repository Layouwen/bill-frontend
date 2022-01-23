import { FC, useState } from 'react';
import styles from './navBar.module.scss';
import { useNavigate } from 'react-router-dom';

const navBar: FC = () => {
  const [active, setActive] = useState(0);
  const navigation = useNavigate();

  const handleChangeTab = (index: number) => {
    console.log(index);
    setActive(index);
  };

  const backFn = () => {
    console.log(11);
    navigation(-1);
  };

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
