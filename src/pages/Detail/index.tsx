import { TabBar } from '@/components';
import List from '@/pages/Detail/List';
import Top from '@/pages/Detail/Top';
import { FC, useState } from 'react';

export type numType = [Array<string>, Array<string>];

const Detail: FC = () => {
  const [time2, setTime2] = useState('');
  const [numExpendIncome, setNumExpendIncome] = useState<numType | []>([]);

  const timeDate = (val: string) => {
    setTime2(val);
  };

  const topDateTime = (arr: numType) => {
    setNumExpendIncome(arr);
  };

  return (
    <div className="page">
      <Top change={timeDate} numExpendIncome={numExpendIncome} />
      <List timeProp={time2} change={topDateTime} />
      <TabBar active={0} />
    </div>
  );
};

export default Detail;
