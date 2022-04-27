import { playSound } from '@/modules';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closePlay, openPlay } from '@/store/slice';
import { List, NavBar, Gap, Switch } from 'bw-mobile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Settings = () => {
  const navigate = useNavigate();
  const setting = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  const [hideTotalAmount, setHideTotalAmount] = useState(false);

  const handleToggleTotalAmount = (val: boolean) => {
    playSound.ding();
    setHideTotalAmount(val);
  };

  const handleSoundSwitch = (val: boolean) => {
    if (val) {
      dispatch(openPlay());
    } else {
      dispatch(closePlay());
    }
    playSound.click();
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
      arrow: <Switch checked={setting.canPlay} onChange={handleSoundSwitch} />,
    },
  ];
  const groupFour = [
    {
      title: '清楚缓存',
      path: '',
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
      <NavBar back="返回" onBack={() => navigate(-1)}>
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
              onClick={() => goTo(item.path)}
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
