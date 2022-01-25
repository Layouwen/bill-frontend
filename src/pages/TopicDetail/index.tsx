import { FC } from 'react';
import { Comment, NavBar } from '@/components';
import Main from './Main';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const TopicDetail: FC = () => {
  const navigate = useNavigate();
  const onSubmit = (val: string) => {
    alert(val);
  };
  return (
    <div className={'page'}>
      <NavBar back="返回" className={styles.nav} onBack={() => navigate(-1)}>
        蓝鲸记账
      </NavBar>
      <Main />
      <Comment onSubmit={onSubmit} />
    </div>
  );
};
export default TopicDetail;
