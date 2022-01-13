import Detail from '@/pages/Detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstScreen from './pages/FirstScreen';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="page">
      <Router>
        <FirstScreen />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
