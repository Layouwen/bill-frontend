import CheckInfo from '@/components/CheckInfo';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './Tabs.module.scss';

const Tabs = () => {
  const tabs = [{ name: '主页' }, { name: '帖子' }, { name: '收藏' }];
  const [activeTab, setActiveTab] = useState(0);

  const changeIndex = (index: number) => {
    setActiveTab(index);
  };
  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((tab, i) => (
          <div
            key={tab.name}
            className={classNames(styles.tab, {
              [styles.active]: activeTab === i,
            })}
            onClick={() => changeIndex(i)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: '#F6F7F8', height: 8 }} />
      <Home />
    </>
  );
};

const Home = () => {
  return (
    <div>
      <div>
        <div className={styles.achieve}>记账成就</div>
        <CheckInfo className={styles['check-info']} />
      </div>
      <div style={{ backgroundColor: '#F6F7F8', height: 8 }} />
    </div>
  );
};

export default Tabs;
