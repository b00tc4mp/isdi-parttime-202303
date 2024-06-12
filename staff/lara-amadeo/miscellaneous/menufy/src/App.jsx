import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import AddMeals from './pages/AddMeals'
import MealList from './pages/MealList'
import React from 'react'
import MealCalendar from './pages/MealCalendar'
import Topbar from './component/Topbar'
import Context from './Context'
import Toast from './component/Toast'
export default function App() {
  const [view, setView] = useState('home')
  const [toast, setToast] = useState(null)


  const handleGoToAddMeals = () => {
    setView('addMeals')
  }

  const handleGoToMealsList = () => {
    setView('mealList')
  }

  const handleGenerateMenu = () => {
    setView('mealCalendar')
  }

  const handleGoToHome = () => {
    setView('home')
}

  const handleRemoveToast = () => setToast(null) 

  const handleShowToast = (message, type) => setToast({ message, type })

  return <Context.Provider value={{alert: handleShowToast}}>
  <>
  <div className='fake-top-container'></div>
  <Topbar onHome={handleGoToHome} onAdd={handleGoToAddMeals} onCalendar={handleGenerateMenu}/>
  
  {view === 'home' && <Home addMeals={handleGoToAddMeals} onMealsList={handleGoToMealsList}/>}
  {view === 'addMeals' && <AddMeals onDone={handleGoToMealsList} />}
  {view === 'mealList' && <MealList onGenerate={handleGenerateMenu} />}

  {view === 'mealCalendar' && <MealCalendar />}
  {toast && <Toast message={toast.message} type={toast.type} endAnimation={handleRemoveToast}/>}
  </>
  </Context.Provider> 
  
}
