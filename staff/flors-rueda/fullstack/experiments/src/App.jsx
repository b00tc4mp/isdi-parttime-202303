import { useState } from 'react';
import './App.css';
import MainMenu from './pages/MainMenu';
import Demo1 from './pages/demos/Demo1';
import Navbar from './components/Navbar';
import Demo2 from './pages/demos/Demo2';
import Demo3 from './pages/demos/Demo3';
import Demo4 from './pages/demos/Demo4';
import Demo5 from './pages/demos/Demo5';
import Demo6 from './pages/demos/Demo6';

function App() {
  const [view, setView] = useState('main-menu');

  const onMainMenuClick = () => setView('main-menu');

  const onDemo1Click = () => setView('demo-1');
  const onDemo2Click = () => setView('demo-2');
  const onDemo3Click = () => setView('demo-3');
  const onDemo4Click = () => setView('demo-4');
  const onDemo5Click = () => setView('demo-5');
  const onDemo6Click = () => setView('demo-6');

  return (
    <>
      {view !== 'main-menu' && <Navbar onGoBackClick={onMainMenuClick} />}
      {view === 'main-menu' && <MainMenu onDemo1={onDemo1Click} onDemo2={onDemo2Click} onDemo3={onDemo3Click} onDemo4={onDemo4Click} onDemo5={onDemo5Click} onDemo6={onDemo6Click} />}
      {view === 'demo-1' && <Demo1 />}
      {view === 'demo-2' && <Demo2 />}
      {view === 'demo-3' && <Demo3 />}
      {view === 'demo-4' && <Demo4 />}
      {view === 'demo-5' && <Demo5 />}
      {view === 'demo-6' && <Demo6 />}
    </>
  )
}

export default App
