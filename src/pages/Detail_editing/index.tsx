import { FC, useEffect, useState } from 'react';
import Top from '@/pages/Detail_editing/Top';
import List from '@/pages/Detail_editing/list';
import Footer from '@/pages/Detail_editing/footer';
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
