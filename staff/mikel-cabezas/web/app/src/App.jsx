import { useState } from "react"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'
import { context } from "./ui.js"
import Loader from "./library/Loader.jsx"
import Context from "./Context.js"
export default function App( {UpdateUserInfo, handleSavelUpdateProfile} ) {
  // use ref em lugar de query selector
  localStorage.theme === 'dark' ? document.querySelector(':root').classList.add('dark') : ''
  
    const [view, setView] = useState( context.userId ? 'home' : 'login' )
    const [loader, setLoader] = useState(false)
    
    const handleGoToRegister = () => setView('register')
    const handleGoToLogin = () => {
      debugger
      setView('login')
    }
    const handleGoToHome = () => setView('home')
    const freeze = () => setLoader(true)
    const unfreeze = () => setLoader(false)
  
    console.log('App -> render')
  
    return <Context.Provider value={{freeze, unfreeze}}>

      {view === 'login' && <><Header handleSavelUpdateProfile /> <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} /> </>}
      {view === 'register' && <><Header handleSavelUpdateProfile /> <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} /> </>}
      {view === 'home' && <><Home onLogoutClick={handleGoToLogin} /></>}
      {loader && <Loader />}

    </Context.Provider>



        switch (view) {
          case 'login':
            return [<Header handleSavelUpdateProfile />, <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />]
          case 'register':
            return [<Header handleSavelUpdateProfile onLoggedOut={handleGoToLogin} />, <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />]
          case 'home':
            return [<Home onLogoutClick={handleGoToLogin} />]
        }
  }