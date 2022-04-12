import { FC } from 'react';
import styles from './top.module.scss';
import NavBar from '@/components/NavBar';

const Top: FC = () => {
  return (
    <div className={styles.top}>
      <div>
        <NavBar>返回</NavBar>
      </div>
    </div>
  );
};

export default Top;
