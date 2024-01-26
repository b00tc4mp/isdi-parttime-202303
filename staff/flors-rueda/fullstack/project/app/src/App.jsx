import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LevelsList from './views/LevelsList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Game from './views/Game';
import CreateLevel from './views/CreateLevel';
import Landing from './views/Landing';
import inLogger from './inLogger';
import NoConnectionToast from './components/toasts/NoConnectionToast';
import AlertToast from './components/toasts/AlertToast';
import CheckConnection from './logic/check-connection';
import Tutorial from './views/Tutorial';
import NotFound from './views/NotFound';
import About from './views/About';
import SignIn from './views/SignIn';
import isUserLoggedIn from './logic/is-user-logged-in';
import useLockScroll from './hooks/useLockScroll';
import AppContext from './AppContext';
import Customize from './views/Customize';
import Profile from './views/Profile';
import Settings from './views/Settings';
import Home from './views/Home';
import updateSocialAchievements from './logic/update-social-achievements';
import useHandleErrors from './hooks/useHandleErrors';
import socketIOClient from 'socket.io-client';
import AchievementToast from './components/toasts/AchievementToast';
import createSession from './logic/create-session';
import Search from './views/Search';

const App = () => {
  const [isApiAvailable, setApiAvailableOn] = useState(true);
  const location = useLocation();
  const [feedback, setFeedback] = useState(null);
  const { unlockScroll } = useLockScroll();
  const handleErrors = useHandleErrors();
  const [achievementNotifications, setAchievementNotifications] = useState([]);
  const [updateUserInfo, setUpdateUserInfo] = useState(false);
  const [connectSocket, setConnectSocket] = useState(false);

  unlockScroll();

  const handleCloseAlert = () => setFeedback(null)
  const handleShowAlert = (message) => setFeedback({ message });

  const handleRefreshApiConnection = async () => {
    try {
      await CheckConnection();
      setApiAvailableOn(true);
    } catch (error) {
      setApiAvailableOn(false);
    }
  };

  useEffect(() => {
    const currentRoute = location.pathname;
    const isTargetedRoute = ['/levels', '/signin'].includes(currentRoute);
    isTargetedRoute ? handleRefreshApiConnection() : setApiAvailableOn(true);
    if (isUserLoggedIn()) {
      handleErrors(async () => {
        await updateSocialAchievements();
      })
    }
  }, [location.pathname]);

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL;
    const parts = url.split(':');
    const socketUrl = parts.slice(0, 2).join(':').concat(':4321');
    const socket = socketIOClient(socketUrl);
    socket.on('connect', () => {
      const socketId = socket.id
      if (isUserLoggedIn()) {
        handleErrors(async () => {
          await createSession(socketId);
        })
      }
      socket.on('notification', ({ message, sockets }) => {
        if (sockets.includes(socketId)) {
          setAchievementNotifications(prevNotifications => {
            const lastNotification = prevNotifications[prevNotifications.length - 1];
            if (!lastNotification || lastNotification !== message) {
              return [...prevNotifications, message];
            }
            return prevNotifications;
          });
        }
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [connectSocket]);

  return (
    <AppContext.Provider value={{ alert: handleShowAlert }}>
      <Navbar updateUserInfo={updateUserInfo} />
      <div className="pt-5">
        {achievementNotifications.map((notification, index) => (
          <AchievementToast
            key={index}
            message={notification}
            handleCloseToast={() => {
              setAchievementNotifications(prevNotifications =>
                prevNotifications.filter((_notification, _index) => _index !== index)
              );
            }}
          />
        ))}
        {!isApiAvailable && <NoConnectionToast />}
        {feedback && <AlertToast message={feedback.message} handleCloseAlert={handleCloseAlert} />}
        <Routes>
          <Route path="/" element={isUserLoggedIn() ? <Navigate to="/home" /> : <Landing />} />
          <Route path="/levels" element={isUserLoggedIn() ? <LevelsList /> : <NotFound />} />
          <Route path="/customize" element={isUserLoggedIn() ? <Customize setUpdateUserInfo={setUpdateUserInfo} /> : <NotFound />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/create" element={<CreateLevel />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/home" element={isUserLoggedIn() ? <Home /> : <NotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile/:id" element={isUserLoggedIn() ? <Profile /> : <NotFound />} />
          <Route path="/settings" element={isUserLoggedIn() ? <Settings /> : <NotFound />} />
          <Route path="/search" element={isUserLoggedIn() ? <Search /> : <NotFound />} />
          <Route path="/signin" element={isUserLoggedIn() ? <Navigate to="/levels" /> : <SignIn setConnectSocket={setConnectSocket} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </AppContext.Provider>

  )
}

export default inLogger(App)