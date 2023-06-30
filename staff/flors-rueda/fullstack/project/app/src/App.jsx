import { useState } from 'react';
import LevelsList from './pages/LevelsList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import CreateLevel from './pages/CreateLevel';
import Landing from './pages/Landing';

//TODO add landing page, tutorial and about
//TODO link links to linkedin and github

const App = () => {
  const [view, setView] = useState('');
  const [level, setLevel] = useState(null);

  const handleGoToLevelsList = () => setView('levels');
  const handleGoToCreate = () => setView('create');

  const handleGoToTryLevel = (newLevel = level) => {
    setLevel(newLevel);
    setView('game');
  }

  return (
    <>
      <Navbar view={view} onCreateClick={handleGoToCreate} onLevelsListClick={handleGoToLevelsList} />
      <div className="pt-5">
        {!view && <Landing />}
        {view === 'levels' && <LevelsList onCreateClick={handleGoToCreate} onLevelClick={handleGoToTryLevel} />}
        {view === 'game' && <Game level={level} onExitClick={handleGoToLevelsList} />}
        {view === 'create' && <CreateLevel onTryLevelClick={handleGoToTryLevel} />}
      </div>
      <Footer />
    </>

  )
}

export default App




