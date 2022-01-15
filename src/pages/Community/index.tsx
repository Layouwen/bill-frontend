import { TabBar } from '@/components';
import ItemList from '@/pages/Community/ItemList';
import TopBar from '@/pages/Community/TopBar';
import { FC, useState } from 'react';

const Community: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    {
      name: '关注',
      onClick: () => {
        console.log(1);
      },
    },
    {
      name: '推荐',
      onClick: () => {
        console.log(2);
      },
    },
    {
      name: '最新',
      onClick: () => {
        console.log(3);
      },
    },
  ];

  const onChange = (key: number) => {
    setTabIndex(key);
    tabs[key].onClick();
  };

  return (
    <div className="page">
      <TopBar data={tabs} index={tabIndex} onChange={onChange} />
      <ItemList />
      <TabBar active={3} />
    </div>
  );
};

export default Community;
