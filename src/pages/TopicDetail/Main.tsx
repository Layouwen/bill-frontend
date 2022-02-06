import { Topic, topicLike } from '@/api';
import { FixedPin, ImagePreview, TopicItem } from '@/components';
import ReplyArea from '@/pages/TopicDetail/ReplyArea';
import { FC, useState } from 'react';

type MainProps = {
  topic?: Topic;
  comments: any;
  fetch: () => void;
};

const Main: FC<MainProps> = ({ topic, comments, fetch }) => {
  const handleLike = async (topicId: number) => {
    await topicLike(topicId);
    setTimeout(async () => {
      await fetch();
    }, 100);
  };
  const [imgVisible, setImgVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  return (
    <div className="flex-grow overflow-auto">
      <FixedPin>分享</FixedPin>
      <ImagePreview
        visible={imgVisible}
        image={imgSrc}
        onClose={() => setImgVisible(false)}
      />
      {topic && (
        <TopicItem
          data={topic!}
          onClick={() => console.log('click item')}
          onShare={() => console.log('share')}
          onLike={() => handleLike(topic!.id)}
          onImg={(index, src) => {
            setImgVisible(true);
            setImgSrc(src);
          }}
        />
      )}
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
