import Content from '@/pages/bill/components/Content';
import { Button } from 'bw-mobile';
import { useNavigate } from 'react-router-dom';
import Top from './components/Top';
import classNames from 'classnames';

const Bill = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <div className="page">
      <Top />
      <Content />
      <div className={classNames('flex-shrink-0')}>
        <Button size="full" onClick={onBack}>
          返回
        </Button>
      </div>
    </div>
  );
};

export default Bill;
