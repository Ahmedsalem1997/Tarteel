import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Islamic from './views/Islamic/Islamic';
import Profile from './views/Profile/Profile';
import Quran from './views/Quran/Quran';
import Login from './views/Login/Login';
import VerificationCode from './components/VerificationCode/VerificationCode';
import EditProfile from './components/EditProfile/EditProfile';
// import NotRegistered from './components/NotRegistered/NotRegistered';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const globalLang = useSelector(state => {
    return state.globalLang
  });

  const [lang, setLang] = useState(localStorage.getItem('lang'));
  const dispatch = useDispatch();
  const rootEle = document.getElementById('root-html');
  useEffect(() => {
    if (!lang) {
      setLang(rootEle.getAttribute('lang'));
    }
    dispatch({ type: 'translation', lang: lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (globalLang === 'ar') {
      rootEle.setAttribute('dir', 'rtl')
    }
    if (globalLang === 'en') {
      rootEle.removeAttribute('dir')
    }
    rootEle.setAttribute('lang', globalLang);
    localStorage.setItem('lang', globalLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalLang]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="islamic" element={<Islamic />} />
        <Route path="quran" element={<Quran />} />
        <Route path="verification-code" element={<VerificationCode />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="*" element={<NotFoundPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
