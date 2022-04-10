import { NavBar } from '@/components';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './FollowList.module.scss';

const FollowList = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  // const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    void getListData();
  }, []);

  const getListData = async () => {
    console.log(id);
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
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Item key={i} />
      ))}
    </div>
  );
};

export default FollowList;

const Item = () => {
  return (
    <div className={styles.item}>
      <img className="rounded-full overflow-hidden" src="" alt="" />
      <div className={styles.box}>
        <div className={styles.name}>名字</div>
        <div className={styles.desc}>
          <span>粉丝：182</span>
          <span>帖子：202</span>
        </div>
      </div>
      <div className={styles['btn-wrapper']}>
        <button className={styles.active}>已关注</button>
        {/*{true ? (*/}
        {/*  */}
        {/*) : (*/}
        {/*  <button>+关注</button>*/}
        {/*)}*/}
      </div>
    </div>
  );
};

type FollowType = 'follow' | 'fans';
