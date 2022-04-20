import CommentListItem from '@/pages/comment-list/components';
import { NavBar } from 'bw-mobile';
import { useNavigate } from 'react-router-dom';

const SystemNotify = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar back="返回" onBack={() => navigate(-1)}>
        系统通知
      </NavBar>
      <CommentListItem
        name={'蓝鲸记账'}
        time={'2020-10-29'}
        content={'123123123123fasdkfhsajdkfhsadhf123123'}
        avatar={''}
      />
    </div>
  );
};

export default SystemNotify;
