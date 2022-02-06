import { addComment, getTopicDetail, TopicDetail as Detail } from '@/api';
import { FC, useEffect, useState } from 'react';
import { Comment, NavBar } from '@/components';
import Main from './Main';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';

const TopicDetail: FC = () => {
  const [topic, setTopic] = useState<Detail>();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    void fetchTopic();
  }, []);
  const fetchTopic = async () => {
    const { data } = await getTopicDetail(id!);
    setTopic(data);
  };
  const onSubmit = async (val: string) => {
    await addComment(parseInt(id!), { content: val });
    await fetchTopic();
  };
  return (
    <div className={'page'}>
      <NavBar back="返回" className={styles.nav} onBack={() => navigate(-1)}>
        蓝鲸记账
      </NavBar>
      <Main topic={topic} comments={topic?.comments} fetch={fetchTopic} />
      <Comment onSubmit={onSubmit} />
    </div>
  );
};
export default TopicDetail;
