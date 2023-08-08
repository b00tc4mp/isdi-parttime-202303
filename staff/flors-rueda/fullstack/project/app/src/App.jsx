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

const App = () => {
  const [isApiAvailable, setApiAvailableOn] = useState(true);
  const location = useLocation();
  const [feedback, setFeedback] = useState(null);
  const { unlockScroll } = useLockScroll();

  unlockScroll();

  const handleCloseAlert = () => setFeedback(null)
  const handleShowAlert = (message) => setFeedback({ message });

  const handleRefreshApiConnection = async () => {
    try {
      await CheckConnection();
      setApiAvailableOn(true);
    } catch (error) {
      setApiAvailableOn(false);
      console.log(error)
    }
  };

  useEffect(() => {
    const currentRoute = location.pathname;
    const isTargetedRoute = ['/levels', '/signin'].includes(currentRoute);
    isTargetedRoute ? handleRefreshApiConnection() : setApiAvailableOn(true);
  }, [location.pathname]);

  return (
    <AppContext.Provider value={{ alert: handleShowAlert }}>
      <Navbar />
      <div className="pt-5">
        {!isApiAvailable && <NoConnectionToast />}
        {feedback && <AlertToast message={feedback.message} handleCloseAlert={handleCloseAlert} />}
        <Routes>
          <Route path="/" element={isUserLoggedIn() ? <Navigate to="/levels" /> : <Landing />} />
          <Route path="/levels" element={isUserLoggedIn() ? <LevelsList /> : <NotFound />} />
          <Route path="/customize" element={isUserLoggedIn() ? <Customize /> : <NotFound />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/create" element={<CreateLevel />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signin" element={isUserLoggedIn() ? <Navigate to="/levels" /> : <SignIn />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </AppContext.Provider>

  )
}

export default inLogger(App)