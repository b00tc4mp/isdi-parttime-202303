import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"
import { useState } from 'react'
import { context } from './ui.js'
import Context from './Context.js'
import Toast from './components/Toast.jsx'
import Spinner from './components/library/Spinner.jsx'

export default function App() {

  const [view, setView] = useState(context.token ? 'home' : 'login')
  const [toast, setToast] = useState(null)
  const [loader, setLoader] = useState(null)


  const handleGoToRegister = () => { setView('register') }

  const handleGoToLogin = () => { setView('login') }

  const handleGoToHome = () => { setView('home') }

  const handleShowToast = (message, type) => setToast({ message, type })

  const handleRemoveToast = () => setToast(null)

  const freeze = (overlay = undefined, background = undefined) => setLoader({ overlay, background })

  const unfreeze = () => setLoader(null)

  return <Context.Provider value={{ generateToast: handleShowToast, freeze, unfreeze }}>
    {view === 'login' && <Login onSignUpLink={handleGoToRegister} onLoginButton={handleGoToHome} />}
    {view === 'register' && <Register onLogInLink={handleGoToLogin} onSignUpButton={handleGoToLogin} />}
    {view === 'home' && <Home onLogOutLink={handleGoToLogin} />}
    {toast && <Toast message={toast.message} type={toast.type} length={toast.length} endAnimation={handleRemoveToast} />}
    {loader && <Spinner overlay={loader.overlay} background={loader.background} />}
  </Context.Provider>
}