import { FC } from 'react';
import styles from './top.module.scss';
import NavBar from '@/components/NavBar';
import { useNavigate } from 'react-router-dom';

const Top: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar
        backArrow={false}
        onBack={() => navigate(-1)}
        back="返回"
      ></NavBar>
      <div className={styles.top}>
        <div className={styles.main}>
          <div></div>
          <span>运动</span>
        </div>
      </div>
    </div>
  );
};

export default Top;
