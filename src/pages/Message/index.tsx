import { Icon, NavBar } from '@/components';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Message: FC = () => {
  const navigate = useNavigate();
  const itemList = [
    {
      title: '系统通知',
      backgroundColor: '#F0A83B',
    },
    {
      title: '评论',
      backgroundColor: '#63A2EB',
    },
    {
      title: '新增关注',
      backgroundColor: '#77BFC0',
    },
  ];
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
}

const Item: FC<ItemProps> = (p) => {
  const styleComputed = ({ backgroundColor }: ItemProps) => {
    return { backgroundColor };
  };
  return (
    <div className={styles.item}>
      <div className={styles.img} style={styleComputed(p)}>
        <Icon name="right" />
      </div>
      <div className={styles.title}>{p.title}</div>
      <Icon name="right" />
    </div>
  );
};

export default Message;
