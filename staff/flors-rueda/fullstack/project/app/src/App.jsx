import { useState, useEffect } from 'react';
import LevelsList from './pages/LevelsList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import CreateLevel from './pages/CreateLevel';
import Landing from './pages/Landing';
import inLogger from './inLogger';
import NoConnectionToast from './components/NoConnectionToast';
import CheckConnection from './logic/check-connection';
import Tutorial from './pages/Tutorial';

//TODO add landing page, tutorial and about

const App = () => {
  const [view, setView] = useState('');
  const [level, setLevel] = useState(null);
  const [isApiAvailable, setApiAvailableOn] = useState(true);

  const handleGoToLevelsList = () => {
    //handleRefreshApiConnection();
    setView('levels');
  };

  const handleGoToCreate = () => setView('create');
  const handleGoToTutorial = () => setView('tutorial');
  const handleGoToLanding = () => setView(null);

  const handleGoToTryLevel = (newLevel = level) => {
    //handleRefreshApiConnection();
    setLevel(newLevel);
    setView('game');
  }

  const handleRefreshApiConnection = () => {
    try {
      CheckConnection((error) => {
        if (error) {
          console.log(`connection error: ${error.message}`);
          setApiAvailableOn(false);
        } else {
          setApiAvailableOn(true);
        }
      });
    } catch (error) {
      console.log(`connection error: ${error.message}`);
      setApiAvailableOn(false);
    }
  };

  return (
    <>
      <Navbar view={view} onCreateClick={handleGoToCreate} onLevelsListClick={handleGoToLevelsList} onLandingClick={handleGoToLanding} onTutorialClick={handleGoToTutorial} />
      {!isApiAvailable && <NoConnectionToast />}
      <div className="pt-5">
        {!view && <Landing onTutorialClick={handleGoToTutorial} />}
        {view === 'levels' && <LevelsList onCreateClick={handleGoToCreate} onLevelClick={handleGoToTryLevel} />}
        {view === 'game' && <Game level={level} onExitClick={handleGoToLevelsList} />}
        {view === 'create' && <CreateLevel onTryLevelClick={handleGoToTryLevel} />}
        {view === 'tutorial' && <Tutorial onExitClick={handleGoToLevelsList} />}
      </div>
      <Footer />
    </>

  )
}

export default inLogger(App)




