import { FollowListType, getFollowList } from '@/api/follow';
import { NavBar } from 'bw-mobile';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './FollowList.module.scss';

const FollowList = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    void getListData();
  }, []);

  const getListData = async () => {
    const { statusCode, data } = await getFollowList(
      parseInt(id!),
      type as FollowListType,
    );
    if (statusCode === 200) {
      setList(data.data);
    }
  };

  const followName = (type: FollowType) => {
    return type === 'follow' ? '关注' : '粉丝';
  };
  return (
    <div>
      <NavBar
        className={styles['nav-bar']}
        back="返回"
        onBack={() => navigate(-1)}
      >
        阿文的{followName(type as FollowType)}
      </NavBar>
      {list.map((i) => (
        <Item key={i} data={i} />
      ))}
    </div>
  );
};

export default FollowList;

interface ItemProps {
  data: {
    avatar: string;
    name: string;
    fans: number;
    follow: number;
    isFollow: boolean;
    topics: number;
  };
}

const Item: FC<ItemProps> = ({ data }) => {
  return (
    <div className={styles.item}>
      <img className="rounded-full overflow-hidden" src={data.avatar} alt="" />
      <div className={styles.box}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.desc}>
          <span>粉丝：{data.fans}</span>
          <span>帖子：{data.topics}</span>
        </div>
      </div>
      <div className={styles['btn-wrapper']}>
        {data.isFollow ? (
          <button className={styles.active}>已关注</button>
        ) : (
          <button>+关注</button>
        )}
      </div>
    </div>
  );
};

type FollowType = 'follow' | 'fans';
