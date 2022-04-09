import { NavBar } from '@/components';
import Tabs from '@/pages/Community/components/Personal/Tabs';
import UserInfo from '@/pages/Community/components/Personal/UserInfo';
import { useNavigate } from 'react-router-dom';
import styles from './personal.module.scss';

const Personal = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <NavBar
        onBack={() => navigate(-1)}
        back="返回"
        className={styles['nav-bar']}
      />
      <UserInfo />
      <Tabs />
    </div>
  );
};

export default Personal;
