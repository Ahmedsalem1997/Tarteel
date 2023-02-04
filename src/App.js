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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile/>} />
        <Route path="islamic" element={<Islamic/>} />
        <Route path="quran" element={<Quran/>} />
        <Route path="verifitionCode" element={<VerificationCode/>} />
        <Route path="edit-profile" element={<EditProfile/>} />
        <Route path="*" element={<NotFoundPage/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
