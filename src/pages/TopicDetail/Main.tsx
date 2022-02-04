import { Topic } from '@/api';
import { FixedPin } from '@/components';
import ItemList from '@/pages/Community/ItemList';
import ReplyArea from '@/pages/TopicDetail/ReplyArea';
import { FC } from 'react';

type MainProps = {
  topic?: Topic;
  comments: any;
};

const Main: FC<MainProps> = ({ topic, comments }) => {
  return (
    <div className="flex-grow overflow-auto">
      <FixedPin>分享</FixedPin>
      {topic && <ItemList data={[topic]} fetch={() => console.log('fetch')} />}
      <div
        style={{
          height: '8px',
          background: '#F6F7F8',
        }}
      />
      <ReplyArea comments={comments} />
      <div
        style={{
          height: '8px',
          background: '#F6F7F8',
        }}
      />
    </div>
  );
};

export default Main;
