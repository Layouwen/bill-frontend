import { Topic } from '@/api';
import { TopicItem } from '@/components';
import { ImagePreview, Share, FixedPin } from 'bw-mobile';
import ReplyArea from '@/pages/TopicDetail/ReplyArea';
import { FC, useState } from 'react';

type MainProps = {
  topic?: Topic;
  comments: any;
  onLike: () => void;
};

const Main: FC<MainProps> = ({ topic, comments, onLike }) => {
  const [imgVisible, setImgVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [shareVisible, setShareVisible] = useState(false);

  const shares = [
    {
      id: 1,
      name: '微信',
      icon: 'wechat',
      color: '#55BA38',
      onClick: () => {
        console.log('share.wechat(topic)');
      },
    },
    {
      id: 2,
      name: '微信朋友圈',
      icon: 'wechat-friends',
      color: '#55BA3A',
      onClick: () => {
        console.log('share.wechat-friends(topic)');
      },
    },
    {
      id: 3,
      name: 'QQ',
      icon: 'qq',
      color: '#4EAAF7',
      onClick: () => {
        console.log('share.qq(topic)');
      },
    },
    {
      id: 4,
      name: 'QQ空间',
      icon: 'qq-zone',
      color: '#F3B140',
      onClick: () => {
        console.log('share.qq-zone(topic)');
      },
    },
  ];

  return (
    <div className="flex-grow overflow-auto">
      <Share
        shares={shares}
        visible={shareVisible}
        onClose={() => setShareVisible(false)}
      />
      <FixedPin onClick={() => setShareVisible(true)}>操作</FixedPin>
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
          onLike={onLike}
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
