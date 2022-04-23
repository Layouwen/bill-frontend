import { List, NavBar, Gap } from 'bw-mobile';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Settings = () => {
  const navigate = useNavigate();

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
    },
    {
      title: '声音开关',
      path: '',
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
              clickable
              onClick={() => goTo(item.path)}
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
