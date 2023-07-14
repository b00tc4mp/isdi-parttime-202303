import { useState } from "react"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from './pages/Home.jsx'
import { context } from "./ui.js"
import Loader from "./library/Loader.jsx"
import AppContext from './AppContext'
import { Alert } from "./components/Alert.jsx"
import { utils } from 'com'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute.jsx"

const { Provider } = AppContext
const { isTokenAlive, isTokenValid } = utils


export default function App({ UpdateUserInfo, handleSavelUpdateProfile }) {
  // use ref em lugar de query selector
  localStorage.theme === 'dark' ? document.querySelector(':root').classList.add('dark') : ''

  const { token } = context
  const [loader, setLoader] = useState(false)
  const [feedback, setFeedback] = useState(false)
  // const navigate = useNavigate()



  const freeze = () => setLoader(true)
  const unfreeze = () => setLoader(false)
  const handleAcceptAlert = () => setFeedback(false)
  const userIsLoggedIn = () => {
    if (isTokenValid(context.token) && isTokenAlive(context.token)) {
      console.log('logged in')
    } else {
      return false
    }

  }

  console.log('App -> render')

  return <>
    <Provider value={{ alert: setFeedback, freeze, unfreeze }}>

      <Routes>
        {(() => console.log('Routes -> render'))()}
        <Route
          path="/login"
          element={
            <ProtectedRoute url="/">
              <Login />
            </ProtectedRoute>
          } />
        <Route path="/register" element={userIsLoggedIn() ? <Navigate to="/" /> : <Register />} />
        <Route path="/"
          element={
            <ProtectedRoute url="/login">
              <Home />
            </ProtectedRoute>
          } />
      </Routes>

      {/* {view === 'login' && <><Header handleSavelUpdateProfile /> <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} /> </>} */}
      {/* {view === 'register' && <><Header handleSavelUpdateProfile /> <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} /> </>} */}
      {/* {view === 'home' && <><Home onLogoutClick={handleGoToLogin} /></>} */}

      {feedback && <Alert message={feedback} onAccept={handleAcceptAlert} />}
      {loader && <Loader />}

    </Provider>

  </>
}