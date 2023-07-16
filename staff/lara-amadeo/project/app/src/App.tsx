
import Loader from './library/modules/Loader'
import './style.css'
import "./App.css"
import Context from './Context'
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import AdditionalInfo from './modals/AdditionalInfo'
import Home from './pages/Home'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import isUserLoggedIn from './logic/isUserLoggedIn'
import CreateMeal from './modals/CreateMeal'
import Profile from './pages/Profile'



function App() {

  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const showLoader = () => {
    setLoader(true)
  }

  const hideLoader = () => {
    setLoader(false)
  }

  const closeModal = () => {
    navigate("/")
  }

  return <>
    <Context.Provider value={{ loaderOn: showLoader, loaderOff: hideLoader, navigate }}>
      <Routes>
        <Route path='/' element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
        <Route path='/additionalInfo' element={<AdditionalInfo onModalClose={closeModal} />} />
        <Route path='/addMeal' element={<CreateMeal />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {loader && <Loader />}
    </Context.Provider>
  </>

}

export default App
