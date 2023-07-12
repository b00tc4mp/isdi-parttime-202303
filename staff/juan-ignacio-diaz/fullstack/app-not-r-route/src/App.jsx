import { useState } from 'react'
import { context } from './ui'
import AppContext from './AppContext'

//import inLogger from './inLogger';

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

const { Provider } = AppContext
import AlertModal from './components/AlertModal'
import Loader from './library/Loader'

export default function App() {
    console.log('App -> render')

    const [view, setView] = useState(context.token? 'home' : 'login')
    const [messageAlert, setMessageAlert] = useState(null)
    const [loader, setLoader] = useState(false)

    const handleGotoRegister = () => setView('register')

    const handleGotoLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    const alert = (message, level = 'info') => setMessageAlert({ message, level })

    const hanleCloseAlert = () => setMessageAlert(null)

    const freeze = () => setLoader(true)

    const unfreeze = () => setLoader(false)

    return <Provider value={{ alert, freeze, unfreeze }}>
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
      </Provider>

}
//const App = () => {
//export default inLogger(App);