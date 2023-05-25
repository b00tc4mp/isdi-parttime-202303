import { useState } from 'react'
import { context } from './ui'
import Context from './context'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import AlertModal from './components/AlertModal'
import Loader from './library/Loader'

export default function App() {
    const [view, setView] = useState(context.userId? 'home' : 'login')
    const [messageAlert, setMessageAlert] = useState(null)
    const [loader, setLoader] = useState(false)

    const handleGotoRegister = () => setView('register')

    const handleGotoLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    const alert = (message, level = 'info') => setMessageAlert({ message, level })

    const hanleCloseAlert = () => setMessageAlert(null)

    const freeze = () => setLoader(true)

    const unfreeze = () => setLoader(false)

    console.log('App -> render')

    return <Context.Provider value={{ alert, freeze, unfreeze }}>
        {view === 'login' && <Login 
          onRegisterClick={handleGotoRegister} 
          onUserLoggedIn={handleGoToHome}
          /> 
        }   
        {view === 'register' && <Register 
          onLoginClick={handleGotoLogin} 
          onRegistered={handleGotoLogin}
          />
        }
        {view === 'home' && <Home 
          onLogout={handleGotoLogin}
          />
        }
        {messageAlert && <AlertModal 
          onAccept={hanleCloseAlert}
          message={messageAlert.message}
          level={messageAlert.level}
          />
        }
        {loader && <Loader />}
      </Context.Provider>

}