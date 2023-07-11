import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Alert from './components/alert/Alert';
import { context } from './ui';
import ThemeToggle from './components/theme-toggle/ThemeToggle';
import inLogger from './inLogger';
import Context from './Context';

const App = () => {
  const [view, setView] = useState(context.token ? 'home' : 'login');
  const [feedback, setFeedback] = useState(null);

  const handleGoToRegister = () => setView('register');
  const handleGoToLogin = () => setView('login');
  const handleGoToHome = () => setView('home');

  const handleCloseAlert = () => setFeedback(null)

  const handleShowAlert = (message, level = 'info') => setFeedback({ message, level });

  let storedTheme = context.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);

  const handleSwitchMode = () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);
    context.theme = targetTheme;
  }

  return <Context.Provider value={{ alert: handleShowAlert }}> <>
    {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
    {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
    {view === 'home' && <Home onLoggedOut={handleGoToLogin} />}
    {feedback && <Alert message={feedback.message} level={feedback.level} onClose={handleCloseAlert} />}
    {/*<ThemeToggle onToggleChange={handleSwitchMode} />*/} </>
  </Context.Provider>

};

export default inLogger(App);