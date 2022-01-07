import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstScreen from './pages/FirstScreen';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <FirstScreen />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
