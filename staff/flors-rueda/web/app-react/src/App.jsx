import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { context }from './context';
import ThemeToggle from './components/theme-toggle/ThemeToggle';
import inLogger from './logger';

const App = () => {
  const [view, setView] = useState(context.userAuth ? 'home' : 'login');

  const handleGoToRegister = () => setView('register');
  const handleGoToLogin = () => setView('login');
  const handleGoToHome = () => setView('home');

  let storedTheme = context.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);

  const handleSwitchMode = () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme =  currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);
    context.theme = targetTheme;
  } 

  switch (view) {
    case 'login':
      return <>
      <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />
      <ThemeToggle onToggleChange={handleSwitchMode} /> </>
    case 'register':
      return <>
      <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} /> 
      <ThemeToggle onToggleChange={handleSwitchMode} /> </>
    case 'home':
      return <>
      <Home onLoggedOut={handleGoToLogin} />
      <ThemeToggle onToggleChange={handleSwitchMode} />
      </>
  };
};

export default inLogger(App);