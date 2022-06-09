import { getTopics, Topic } from '@/api';
import { TabBar } from '@/components';
import ItemList from '@/pages/community/ItemList';
import TopBar from '@/pages/community/TopBar';
import { FixedPin } from 'bw-mobile';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Community: FC = () => {
  const [tabIndex, setTabIndex] = useState(2);
  const [topics, setTopics] = useState<Topic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    tabs[tabIndex].onClick();
  }, []);

  const tabs = [
    {
      name: '关注',
      onClick: () => {
        setTopics([]);
      },
    },
    {
      name: '推荐',
      onClick: async () => {
        const { statusCode, data } = await getTopics(true);
        if (statusCode === 200) setTopics(data.topics);
      },
    },
    {
      name: '最新',
      onClick: async () => {
        const { statusCode, data } = await getTopics();
        if (statusCode === 200) setTopics(data.topics);
      },
    },
  ];

  const fetchData = async () => {
    const { statusCode, data } = await getTopics();
    if (statusCode === 200) setTopics(data.topics);
  };

  const onChange = (key: number) => {
    setTabIndex(key);
    tabs[key].onClick();
  };

  const handlePostTopic = () => {
    navigate('/post-topic');
  };

  return (
    <div className="page">
      <TopBar data={tabs} index={tabIndex} onChange={onChange} />
      <ItemList data={topics} fetch={fetchData} />
      <TabBar active={3} />
      <FixedPin onClick={handlePostTopic}>发帖</FixedPin>
    </div>
  );
};

export default Community;
