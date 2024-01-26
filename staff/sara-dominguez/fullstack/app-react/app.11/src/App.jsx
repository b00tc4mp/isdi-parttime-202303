import { useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { context } from './ui.js'
import Alert from './components/Alert.jsx'
import AppContext from './components/AppContext.js'
import { Loader } from './library'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'


// faltaría implentar isTokenValid() && isTokenAlive
export default function App() {

  const [view, setView] = useState(context.token && context.token ? 'home' : 'login')
  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()



  const handleAcceptAlert = () => setFeedback(null)

  const alert = (message, level = 'info') => setFeedback({ message, level })

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)



  // console.debug('App ->render')

  return <AppContext.Provider value={{ alert, freeze, unfreeze, navigate }}>
    <Routes>
      {(() => console.log('Router => render App'))()}
      <Route path="/login" element={context.token ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={context.token ? <Navigate to="/" /> : <Register />} />
      <Route path="/" element={context.token ? <Home /> : <Navigate to="/login" />} />
    </Routes>

    {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
    {loader && <Loader />}
  </AppContext.Provider>


  // version más antigua
  // console.debug('App ->render')

  //   return <AppContext.Provider value={{ alert, freeze, unfreeze }}>
  //     {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
  //     {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
  //     {view === 'home' && <Home onLoggedOutClick={handleGoToLogin} />}
  //     {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
  //     {loader && <Loader />}

  //   </AppContext.Provider>

}