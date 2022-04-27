import CommentList from '@/pages/comment-list';
import FollowList from '@/pages/Community/FollowList';
import ExportData from '@/pages/export-data';
import NewFollow from '@/pages/new-follow';
import Settings from '@/pages/settings';
import SystemNotify from '@/pages/system-notify';
import { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openPlay, setUserInfo } from '@/store/slice';
import { LoginGuard } from '@/components';
import Community from '@/pages/Community';
import Detail from '@/pages/Detail';
import NotFound from '@/pages/NotFound';
import PostTopic from '@/pages/PostTopic';
import Sign from '@/pages/Sign';
import FirstScreen from '@/pages/FirstScreen';
import Login from '@/pages/Login';
import Mine from '@/pages/mine';
import UserInfo from '@/pages/UserInfo';
import Password from '@/pages/Password';
import Bookkeeping from '@/pages/Bookkeeping';
import TopicDetail from '@/pages/TopicDetail';
import CateGory from '@/pages/Bookkeeping/CategorySettings';
import Editing from '@/pages/Detail_editing';
import Personal from '@/pages/Community/Personal';
import Share from '@/pages/Share';
import Message from '@/pages/Message';

const App = () => {
  const setting = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) dispatch(setUserInfo(JSON.parse(userInfo)));
    if (setting.canPlay) {
      dispatch(openPlay());
    }
  }, []);

  return (
    <Router>
      <FirstScreen />
      <Routes>
        <Route path="/" element={<Navigate to="/detail" />} />
        <Route path="/bookkeeping" element={<Bookkeeping />} />
        <Route path="/community" element={<Community />} />
        <Route path="/cateGory" element={<CateGory />}></Route>
        <Route path="/editing" element={<Editing />}></Route>
        <Route path="/community/personal/:id" element={<Personal />} />
        <Route
          path="/community/follow-list/:id/:type"
          element={<FollowList />}
        />
        <Route
          path="/user-info"
          element={
            <LoginGuard>
              <UserInfo />
            </LoginGuard>
          }
        />
        <Route
          path="/password"
          element={
            <LoginGuard>
              <Password />
            </LoginGuard>
          }
        />
        <Route path="/sign" element={<Sign />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/share" element={<Share />} />
        <Route
          path="/post-topic"
          element={
            <LoginGuard>
              <PostTopic />
            </LoginGuard>
          }
        />
        <Route path="/topic-detail/:id" element={<TopicDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/message" element={<Message />} />
        <Route path="/message/new-follow" element={<NewFollow />} />
        <Route path="/message/comment-list" element={<CommentList />} />
        <Route path="/message/system-notify" element={<SystemNotify />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/export-data" element={<ExportData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
