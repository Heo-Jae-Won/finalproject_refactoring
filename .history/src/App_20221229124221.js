import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './AboutPage';
import './App.css';
import { UserContext } from './context/UserContext';
import EventPage from './event/EventPage';
import FooterPage from './FooterPage';
import HeaderPage from './HeaderPage';
import HomePage from './HomePage';
import LoginPage from './login/LoginPage';
import MyPage from './my/MyPage';
import NoticePage from './notice/NoticePage';
import PboardPage from './pboard/PboardPage';


function App() {
  const [loginUser, setLoginUser] = useState({});

  return (
    <UserContext.Provider value={{ loginUser, setLoginUser }}>
      <div className="App">
        <HeaderPage />
        <Routes>
        <Route path="/" element={HomePage}/>
        <Route path="/pboard" element={PboardPage} />
        <Route path="/login" element={LoginPage} />
        <Route path="/about" element={AboutPage} />
        <Route path="/my" element={MyPage} />
        <Route path="/event" element={EventPage} />
        <Route path="/notice" element={NoticePage} />
        </Routes>
        <FooterPage />
      </div>
    </UserContext.Provider>
  );
}

export default App;
