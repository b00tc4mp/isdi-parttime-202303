import { useState } from 'react';
import Context from './Context';
import Alert from './components/Alert';
import Loader from './library/Loader';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { context } from './ui';

const App = () => {

  const [view, setView ] = useState(context.userId ? 'home' : 'login'),
    [feedback, setFeedback] = useState(null),
    [loader, setLoader] = useState(false);
  
  const handleGoToRegister = () =>  setView('register'), 
  
  handleGoToLogin = () =>  setView('login'), 
  
  handleGoToHome = () => setView('home'),

  handleAcceptAlert = () => setFeedback(null),

  alert = (message, level = 'info') => setFeedback({ message, level }),

  freeze = () => setLoader(true),

  unfreeze = () => setLoader(false);


return <Context.Provider value={{ alert, freeze, unfreeze }}>
        {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
        {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
        {view === 'home' && <Home onLoggedOut={handleGoToLogin} />}
        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
        {loader && <Loader />}
    </Context.Provider>
}

export default App