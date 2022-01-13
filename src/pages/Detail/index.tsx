import Tabbar from '@/components/Tabbar';
import List from '@/pages/Detail/List';
import Top from '@/pages/Detail/Top';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Detail: FC = () => {
  const navigation = useNavigate();

  const handleChangeTab = (index: number) => {
    index === 4 && navigation('/login');
  };

  return (
    <div className={styles.wrapper}>
      <Top />
      <List />
      <Tabbar active={0} change={handleChangeTab} />
    </div>
  );
};

export default Detail;
