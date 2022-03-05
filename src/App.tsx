import { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { setUserInfo } from '@/store/slice';
import { LoginGuard } from '@/components';
import Community from '@/pages/Community';
import Detail from '@/pages/Detail';
import NotFound from '@/pages/NotFound';
import PostTopic from '@/pages/PostTopic';
import Sign from '@/pages/Sign';
import FirstScreen from '@/pages/FirstScreen';
import Login from '@/pages/Login';
import Mine from '@/pages/Mine';
import UserInfo from '@/pages/UserInfo';
import Password from '@/pages/Password';
import Bookkeeping from '@/pages/Bookkeeping';
import TopicDetail from '@/pages/TopicDetail';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) dispatch(setUserInfo(JSON.parse(userInfo)));
  }, []);

  return (
    <Router>
      <FirstScreen />
      <Routes>
        <Route path="/" element={<Navigate to="/detail" />} />
        <Route path="/bookkeeping" element={<Bookkeeping />} />
        <Route path="/community" element={<Community />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
