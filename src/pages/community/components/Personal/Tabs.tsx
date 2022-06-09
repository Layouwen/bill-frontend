import { TopicItem } from '@/components';
import CheckInfo from '@/components/CheckInfo';
import classNames from 'classnames';
import { FC, useState } from 'react';
import styles from './Tabs.module.scss';

interface TabsProps {
  checkInfo?: any;
  topics?: any;
}

const Tabs: FC<TabsProps> = ({ checkInfo, topics }) => {
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
      {tabContent(activeTab, checkInfo, topics)}
    </>
  );
};

const tabContent = (index: number, checkInfo: any, topics: any) => {
  switch (index) {
    case 0:
      return <Home checkInfo={checkInfo} topics={topics} />;
    case 1:
      return <Topics topics={topics} />;
    case 2:
      return <Topics topics={topics} />;
    default:
      return <Home checkInfo={checkInfo} topics={topics} />;
  }
};

interface HomeProps {
  checkInfo: any;
  topics: any;
}

const Home: FC<HomeProps> = ({ checkInfo, topics }) => {
  return (
    <div>
      <div>
        <div className={styles.achieve}>记账成就</div>
        <CheckInfo className={styles['check-info']} data={checkInfo} />
      </div>
      <div style={{ backgroundColor: '#F6F7F8', height: 8 }} />
      <Topics topics={topics} />
    </div>
  );
};

const Topics: FC<{ topics: any }> = ({ topics }) => {
  return (
    <div>
      {topics?.map((topic: any, index: any) => (
        <TopicItem key={index} data={topic} />
      ))}
    </div>
  );
};

export default Tabs;
