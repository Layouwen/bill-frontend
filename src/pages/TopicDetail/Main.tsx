import { FixedPin } from '@/components';
import ItemList from '@/pages/Community/ItemList';
import ReplyArea from '@/pages/TopicDetail/ReplyArea';
import { FC, useState } from 'react';

const Main: FC = () => {
  const [data] = useState([
    {
      id: 9,
      images: [
        'http://r5p05ktoi.hn-bkt.clouddn.com/user_17875534197/7ee0905f626645b291b4d6e62cefe1b7aa4c784895564d882ccaf532f4dead39.jpg',
      ],
      content: '各位帅哥加我！',
      recommend: false,
      createdAt: '2022-01-24T05:32:42.941Z',
      updatedAt: '2022-01-24T05:32:42.941Z',
      name: '吴彦祖',
      avatar:
        'https://bill-rearend.oss-cn-guangzhou.aliyuncs.com/static/defulatAvatar.jpg',
      likeCount: 1,
      isLike: true,
    },
  ]);

  return (
    <div className="flex-grow overflow-auto">
      <FixedPin>分享</FixedPin>
      <ItemList data={data} fetch={() => console.log('fetch')} />
      <div
        style={{
          height: '8px',
          background: '#F6F7F8',
        }}
      />
      <ReplyArea />
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
