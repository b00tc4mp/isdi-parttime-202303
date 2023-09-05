import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"
import { useState } from 'react'
import { context } from './logic/context.js'
import Context from './Context.js'
import Toast from './components/Toast.jsx'
import Spinner from './components/library/Spinner.jsx'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import isUserLoggedIn from './logic/isUserLoggedIn.js'

export default function App() {

  const [toast, setToast] = useState(null)
  const [loader, setLoader] = useState(null)
  const navigate = useNavigate()

  const updateSidebarRender = () => {
    setLastUserRenderUpdate(Date.now())
  }
  const handleShowToast = (message, type) => setToast({ message, type })

  const handleRemoveToast = () => setToast(null)

  const freeze = (overlay = undefined, background = undefined) => setLoader({ overlay, background })

  const unfreeze = () => setLoader(null)

  return <Context.Provider value={{ generateToast: handleShowToast, freeze, unfreeze, navigate }}>
    <Routes>
      <Route path='/' element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
      <Route path='/login' element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
      <Route path='/register' element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/settings' element={<Settings onSidebarUpdates={updateSidebarRender} />
      } />
      {/*       
      {view === 'login' && <Login onSignUpLink={handleGoToRegister} onLoginButton={handleGoToHome} />}
      {view === 'register' && <Register onLogInLink={handleGoToLogin} onSignUpButton={handleGoToLogin} />}
      {view === 'home' && <Home onLogOutLink={handleGoToLogin} />} */}
    </Routes>
    {toast && <Toast message={toast.message} type={toast.type} length={toast.length} endAnimation={handleRemoveToast} />}
    {loader && <Spinner overlay={loader.overlay} background={loader.background} />}
  </Context.Provider>
}
