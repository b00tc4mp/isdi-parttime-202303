import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { context }from './context';

export default function App() {
  const [view, setView] = useState(context.userAuth ? 'home' : 'login');

  const handleGoToRegister = () => setView('register');
  const handleGoToLogin = () => setView('login');
  const handleGoToHome = () => setView('home');

  /*const handleSwitchMode = () => document.querySelector(':root').classList.toggle('dark')
              <button onClick={handleSwitchMode}>Switch Mode</button>
  */

  console.log('App -> render');

  switch (view) {
    case 'login':
      return <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />
    case 'register':
      return <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />
    case 'home':
      return <Home onLoggedOut={handleGoToLogin} />
  };
}