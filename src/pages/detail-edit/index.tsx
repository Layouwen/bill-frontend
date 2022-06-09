import { FC, useEffect, useState } from 'react';
import Top from '@/pages/detail-edit/Top';
import List from '@/pages/detail-edit/list';
import Footer from '@/pages/detail-edit/footer';
import { useLocation } from 'react-router-dom';
import { recordChildren } from '../detail/List';

const Dditing: FC = () => {
  const navParams = useLocation();
  const dataList: recordChildren = navParams.state as recordChildren;
  const [state, setState] = useState<recordChildren>(dataList);

  useEffect(() => {
    setState(navParams.state as recordChildren);
  }, []);

  return (
    <div className="page">
      <Top state={state}></Top>
      <List state={state} />
      <Footer state={state}></Footer>
    </div>
  );
};

export default Dditing;
