import { playSound } from '@/modules';
import { audioWeb } from '@/modules/playSound';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearStorage,
  closePlay,
  openPlay,
  setStorageSize,
} from '@/store/slice';
import { Toast } from 'antd-mobile';
import { List, NavBar, Gap, Switch, Icon } from 'bw-mobile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Settings = () => {
  const system = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    playSound.back();
    navigate(-1);
  };

  const [hideTotalAmount, setHideTotalAmount] = useState(false);

  const handleToggleTotalAmount = (val: boolean) => {
    playSound.click();
    setHideTotalAmount(val);
  };

  const handleSoundSwitch = (val: boolean) => {
    if (val) {
      if (system.hasAudioCache) {
        audioWeb.loadCache();
      } else {
        void audioWeb.download();
      }
      dispatch(openPlay());
    } else {
      dispatch(closePlay());
    }
    setTimeout(() => {
      dispatch(setStorageSize());
    }, 100);
    playSound.click();
  };

  const clearCache = () => {
    dispatch(clearStorage());
    Toast.show('清除成功');
  };

  const groupOne = [
    {
      title: '账号设置',
      path: '/user-info',
    },
  ];
  const groupTwo = [
    {
      title: '类别设置',
      path: '',
    },
    {
      title: '导出数据',
      path: '/export-data',
    },
  ];
  const groupThree = [
    {
      title: '隐藏总金额',
      path: '',
      arrow: (
        <Switch checked={hideTotalAmount} onChange={handleToggleTotalAmount} />
      ),
    },
    {
      title: '声音开关',
      path: '',
      arrow: <Switch checked={system.canPlay} onChange={handleSoundSwitch} />,
    },
  ];
  const groupFour = [
    {
      title: '清楚缓存',
      path: '',
      onClick: clearCache,
      arrow: (
        <div>
          <span>{system.localStorageSize}</span> <Icon name="right" />
        </div>
      ),
    },
    {
      title: '邀请好友',
      path: '',
    },
    {
      title: '意见反馈',
      path: '',
    },
    {
      title: '帮助',
      path: '',
    },
    {
      title: '关于蓝鲸记账',
      path: '',
    },
  ];

  const goTo = (path: string) => {
    if (!path) return;
    navigate(path);
  };

  return (
    <div className="page">
      <NavBar back="返回" onBack={handleBack}>
        设置
      </NavBar>
      <div className={styles.wrapper}>
        <List>
          <Gap />
          {groupOne.map((item) => (
            <List.Item
              key={item.title}
              clickable
              onClick={() => goTo(item.path)}
            >
              {item.title}
            </List.Item>
          ))}
          <Gap />
          {groupTwo.map((item) => (
            <List.Item
              key={item.title}
              clickable
              onClick={() => goTo(item.path)}
            >
              {item.title}
            </List.Item>
          ))}
          <Gap />
          {groupThree.map((item) => (
            <List.Item
              key={item.title}
              clickable={false}
              onClick={() => goTo(item.path)}
              arrow={item.arrow}
              style={{
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              {item.title}
            </List.Item>
          ))}
          <Gap />
          {groupFour.map((item) => (
            <List.Item
              key={item.title}
              clickable
              onClick={item.onClick}
              arrow={item.arrow}
            >
              {item.title}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Settings;
