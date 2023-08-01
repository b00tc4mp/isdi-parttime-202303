
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
import MealDetails from './pages/MealDetails'
import Toast from './library/components/Toast'

type ToastProperties = {
  message: string,
  type: string
}

function App() {

  const [loader, setLoader] = useState(false)
  const [toast, setToast] = useState<ToastProperties | null>(null)
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

  const showToast = (message: string, type: string) => {
    setToast({ message, type })
  }

  const handleRemoveToast = () => setToast(null)


  return <>
    <Context.Provider value={{ loaderOn: showLoader, loaderOff: hideLoader, navigate, toast: showToast }}>
      <Routes>
        <Route path='/' element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
        <Route path='/additionalInfo' element={<AdditionalInfo />} />
        <Route path='/addMeal' element={<CreateMeal />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/meal/:mealId' element={<MealDetails />} />

      </Routes>
      {loader && <Loader />}
      {toast && <Toast message={toast.message} type={toast.type} endAnimation={handleRemoveToast} />}
    </Context.Provider>
  </>

}

export default App
