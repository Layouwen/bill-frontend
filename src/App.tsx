import { changeLang } from '@/store/i18nSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Trans } from 'react-i18next';
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
      <div>
        <button onClick={() => dispatch(changeLang('en'))}>English</button>
      </div>
      <div>
        <button onClick={() => dispatch(changeLang('zh'))}>中文</button>
      </div>
      <div>当前语言{lang}</div>
      <Trans>lang</Trans>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};
export default App;
