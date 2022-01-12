import { changeLang } from '@/store/i18nSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstScreen from './pages/FirstScreen';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  const lang = useAppSelector((state) => state.i18n.lang);
  const dispatch = useAppDispatch();
  return (
    <Router>
      <FirstScreen />
      lang: {lang}
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
