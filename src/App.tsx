import Community from '@/pages/Community';
import Detail from '@/pages/Detail';
import NotFound from '@/pages/NotFound';
import Sign from '@/pages/Sign';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import FirstScreen from './pages/FirstScreen';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <FirstScreen />
      <Routes>
        <Route path="/" element={<Navigate to="/detail" />} />
        <Route path="/community" element={<Community />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
