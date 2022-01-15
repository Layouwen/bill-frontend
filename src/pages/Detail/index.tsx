import { TabBar } from '@/components';
import List from '@/pages/Detail/List';
import Top from '@/pages/Detail/Top';
import { FC } from 'react';

const Detail: FC = () => {
  return (
    <div className="page">
      <Top />
      <List />
      <TabBar active={0} />
    </div>
  );
};

export default Detail;
