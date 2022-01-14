import { Icon } from '@/components';
import { FC } from 'react';
import classNames from 'classnames';
import './index.scss';

type TabBarProps = {
  active: number;
  change: (index: number) => void;
};

const Tabbar: FC<TabBarProps> = ({ active, change }) => {
  const tabBarList = [
    {
      name: '明细',
      icon: 'detail',
      iconActive: 'detail-fill',
    },
    {
      name: '图表',
      icon: 'chart',
      iconActive: 'chart-fill',
    },
    {
      name: '记账',
      icon: 'community',
      iconActive: 'community-fill',
    },
    {
      name: '社区',
      icon: 'community',
      iconActive: 'community-fill',
    },
    {
      name: '我的',
      icon: 'mine',
      iconActive: 'mine-fill',
    },
  ];

  // TODO: any
  const isActive = (tab: any, index: number) => {
    return index === active ? tab.iconActive : tab.icon;
  };

  return (
    <div className={classNames(['bw-tab-bar'])}>
      {tabBarList.map((tab, index) => (
        <div key={tab.name} className="item" onClick={() => change(index)}>
          <Icon name={isActive(tab, index)} className="tab-icon" />
          <span className="name">{tab.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Tabbar;
