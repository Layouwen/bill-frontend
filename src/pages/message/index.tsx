import { Icon, NavBar } from 'bw-mobile';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Message: FC = () => {
  const navigate = useNavigate();
  const itemList = [
    {
      title: '系统通知',
      backgroundColor: '#F0A83B',
      icon: 'message',
      onClick: () => goTo('/message/system-notify'),
    },
    {
      title: '评论',
      icon: 'comment',
      backgroundColor: '#63A2EB',
      onClick: () => goTo('/message/comment-list'),
    },
    {
      title: '新增关注',
      icon: 'follow',
      backgroundColor: '#77BFC0',
      onClick: () => goTo('/message/new-follow'),
    },
  ];

  const goTo = (path: string) => navigate(path);
  return (
    <div className="page">
      <NavBar
        onBack={() => navigate(-1)}
        back="返回"
        className={styles['nav-bar']}
      >
        消息
      </NavBar>
      <div className={styles.list}>
        {itemList.map((i) => (
          <Item key={i.title} {...i} />
        ))}
      </div>
    </div>
  );
};

interface ItemProps {
  title: string;
  backgroundColor: string;
  icon: string;
  onClick?: () => void;
}

const Item: FC<ItemProps> = (p) => {
  const styleComputed = ({ backgroundColor }: ItemProps) => {
    return { backgroundColor };
  };
  return (
    <div className={styles.item} onClick={p.onClick}>
      <div className={styles.img} style={styleComputed(p)}>
        <Icon name={p.icon} style={{ fontSize: 24, color: 'fff' }} />
      </div>
      <div className={styles.title}>{p.title}</div>
      <Icon name="right" />
    </div>
  );
};

export default Message;
