import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { LoginGuard } from '@/components';
import Community from '@/pages/Community';
import NotFound from '@/pages/NotFound';
import PostTopic from '@/pages/PostTopic';
import Sign from '@/pages/Sign';
import FirstScreen from '@/pages/FirstScreen';
import Login from '@/pages/Login';
import Bookkeeping from '@/pages/Bookkeeping';

const App = () => {
  return (
    <Router>
      <FirstScreen />
      <Routes>
        <Route path="/" element={<Navigate to="/detail" />} />
        <Route path="/bookkeeping" element={<Bookkeeping />} />
        <Route path="/community" element={<Community />} />
        <Route path="/sign" element={<Sign />} />
        <Route
          element={
            <LoginGuard>
              <PostTopic />
            </LoginGuard>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
