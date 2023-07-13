
import Loader from './library/modules/Loader'
import './style.css'
import "./App.css"
import Context from './Context'
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import AdditionalInfo from './modals/AdditionalInfo'
import Home from './pages/Home'
import { context } from './ui'

function App() {

  const [loader, setLoader] = useState(false)
  const [view, setView] = useState(`${context.token ? 'home' : 'register'}`)

  const showLoader = () => {
    setLoader(true)
  }

  const hideLoader = () => {
    setLoader(false)
  }

  const openAdditionalInfoModal = () => {
    setView('additionalInfo')
  }

  const goToHome = () => {
    setView('home')
  }

  return <>
    <Context.Provider value={{ loaderOn: showLoader, loaderOff: hideLoader }}>
      {view === 'register' && <Register onRegisterClick={openAdditionalInfoModal} />}
      {view === 'additionalInfo' && <AdditionalInfo onSkipLink={goToHome} />}
      {view === 'login' && <Login />}
      {view === 'home' && <Home />}

      {loader && <Loader />}
    </Context.Provider>
  </>

}

export default App
