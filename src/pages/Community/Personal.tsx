import { topicUserInfoApi } from '@/api';
import { NavBar } from '@/components';
import Tabs from '@/pages/Community/components/Personal/Tabs';
import UserInfo from '@/pages/Community/components/Personal/UserInfo';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Personal.module.scss';

interface TopicUserInfoData {
  userInfo: {
    avatar: string;
    id: number;
    name: string;
  };
  topics: {
    id: number;
    images: string[];
    content: string;
    isLike: boolean;
    likeCount: number;
    shareCount: number;
  }[];
  checkInfo: {
    checkInCount: number;
    checkInKeep: number;
    recordCount: number;
  };
  isFollow: boolean;
  fans: number;
  follow: number;
}

const Personal = () => {
  const [data, setData] = useState<TopicUserInfoData>();
  const navigate = useNavigate();
  const routeParams = useParams();
  const topicUserInfo = async () => {
    const res = await topicUserInfoApi(routeParams.id as string);
    setData(res.data);
  };
  useEffect(() => {
    void topicUserInfo();
  }, []);
  return (
    <div className="page">
      <NavBar
        onBack={() => navigate(-1)}
        back="返回"
        className={styles['nav-bar']}
      />
      <UserInfo
        data={data?.userInfo}
        isFollow={data?.isFollow}
        fansCount={data?.fans}
        followCount={data?.follow}
        topicUserInfo={topicUserInfo}
      />
      <Tabs checkInfo={data?.checkInfo} topics={data?.topics} />
    </div>
  );
};

export default Personal;
