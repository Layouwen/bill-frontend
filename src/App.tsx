import { changeLang } from '@/store/i18nSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstScreen from './pages/FirstScreen';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <Router>
      <FirstScreen />
      lang: {state.i18n.lang}
      <button onClick={() => dispatch(changeLang('zh'))}>中文</button>
      <button onClick={() => dispatch(changeLang('en'))}>English</button>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
