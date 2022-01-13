import Tabbar from '@/components/Tabbar';
import List from '@/pages/Detail/List';
import Top from '@/pages/Detail/Top';
import { FC, useState } from 'react';
import styles from './index.module.scss';

const Detail: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className={styles.wrapper}>
      <Top />
      <List />
      <Tabbar active={tabIndex} change={handleChangeTab} />
    </div>
  );
};

export default Detail;
