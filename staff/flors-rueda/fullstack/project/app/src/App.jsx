import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LevelsList from './pages/LevelsList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import CreateLevel from './pages/CreateLevel';
import Landing from './pages/Landing';
import inLogger from './inLogger';
import NoConnectionToast from './components/toasts/NoConnectionToast';
import AlertToast from './components/toasts/AlertToast';
import CheckConnection from './logic/check-connection';
import Tutorial from './pages/Tutorial';
import NotFound from './pages/NotFound';
import About from './pages/About';
import SignIn from './pages/SignIn';
import isUserLoggedIn from './logic/is-user-logged-in';
import useLockScroll from './hooks/useLockScroll';
import AppContext from './AppContext';

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
          <Route path="/game/:id" element={<Game />} />
          <Route path="/create" element={<CreateLevel />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={isUserLoggedIn() ? <Navigate to="/levels" /> : <SignIn />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </AppContext.Provider>

  )
}

export default inLogger(App)