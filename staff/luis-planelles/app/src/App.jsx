import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { context } from './ui';

const App = () => {

  const [view, setView ] = useState(context.userId ? 'home' : 'login'),
  
  handleGoToRegister = () =>  setView('register'), 
  
  handleGoToLogin = () =>  setView('login'), 
  
  handleGoToHome = () => setView('home');

  switch (view) {
      case 'login':
        return <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />;
      case 'register':
        return <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToHome}/>;
      case 'home':
        return <Home onLoggedOut={handleGoToLogin}/>
    }
}

export default App