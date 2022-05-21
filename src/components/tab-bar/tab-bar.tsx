import { playSound } from '@/modules';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import './tab-bar.scss';
import { Icon } from 'bw-mobile';

type TabBarProps = {
  active: number;
};

export const TabBar: FC<TabBarProps> = ({ active }) => {
  const navigate = useNavigate();

  const tabBarList = [
    {
      name: '明细',
      icon: 'detail',
      iconActive: 'detail-fill',
      router: '/detail',
    },
    {
      name: '图表',
      icon: 'chart',
      iconActive: 'chart-fill',
      router: '/sign',
    },
    {
      name: '记账',
      icon: 'community',
      iconActive: 'community-fill',
      router: '/bookkeeping',
    },
    {
      name: '社区',
      icon: 'community',
      iconActive: 'community-fill',
      router: '/community',
    },
    {
      name: '我的',
      icon: 'mine',
      iconActive: 'mine-fill',
      router: '/mine',
    },
  ];

  /* eslint-disable */
  const isActive = (tab: any, index: number) => {
    return index === active ? tab.iconActive : tab.icon;
  };
  /* eslint-disable */

  const changeRoute = (index: number, router: string) => {
    if (index === active) return;
    playSound.turnPage();
    navigate(router);
  };

  return (
    <div className={classNames(['bwm-tab-bar'])}>
      {tabBarList.map((tab, index) => (
        <div
          key={tab.name}
          className="item"
          onClick={() => changeRoute(index, tab.router)}
        >
          <Icon name={isActive(tab, index)} className="tab-icon" />
          <span className="name">{tab.name}</span>
        </div>
      ))}
    </div>
  );
};
