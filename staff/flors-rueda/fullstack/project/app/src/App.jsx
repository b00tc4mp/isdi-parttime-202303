import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LevelsList from './pages/LevelsList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import CreateLevel from './pages/CreateLevel';
import Landing from './pages/Landing';
import inLogger from './inLogger';
import NoConnectionToast from './components/toasts/NoConnectionToast';
import CheckConnection from './logic/check-connection';
import Tutorial from './pages/Tutorial';
import NotFound from './pages/NotFound';
import About from './pages/About';
import SignIn from './pages/SignIn';

const App = () => {
  const [isApiAvailable, setApiAvailableOn] = useState(true);

  const handleRefreshApiConnection = async () => {
    try {
      await CheckConnection();
      setApiAvailableOn(true);
    } catch (error) {
      console.log(`connection error: ${error.message}`);
      setApiAvailableOn(false);
    }
  };

  return (
    <>
      <Navbar />
      {!isApiAvailable && <NoConnectionToast />}
      <div className="pt-5">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/levels" element={<LevelsList />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/create" element={<CreateLevel />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default inLogger(App)




