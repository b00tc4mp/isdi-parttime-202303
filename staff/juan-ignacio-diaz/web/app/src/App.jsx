import { useState } from 'react'
import { context } from './ui'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import AlertModal from './components/AlertModal'

export default function App() {
    const [view, setView] = useState(context.userId? 'home' : 'login')
    const [modal, setModal] = useState(null)
    const [message, setMessage] = useState(null)

    const handleGotoRegister = () => setView('register')

    const handleGotoLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    const handleOpenAlert = (message) => {
      setMessage(message)
      setModal('alert')
    }

    const hanleCloseAlert = () => {
      setMessage(null)
      setModal(null)
    }

    console.log('App -> render')

    return <>
        {view === 'login' && <Login 
          onRegisterClick={handleGotoRegister} 
          onUserLoggedIn={handleGoToHome} onMenssageAlert={handleOpenAlert}
          /> 
        }   
        {view === 'register' && <Register 
          onLoginClick={handleGotoLogin} 
          onRegistered={handleGotoLogin}
          onMenssageAlert={handleOpenAlert}
          />
        }
        {view === 'home' && <Home 
          onLogout={handleGotoLogin}
          onMenssageAlert={handleOpenAlert}
          />
        }
        {modal === 'alert' && <AlertModal 
          onAccept={hanleCloseAlert}
          message={message}
        />
        }
      </>

}