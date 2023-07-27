import { isUserLoggedIn } from './logic'
import AppContext from './AppContext'
import { Login, Register, Home, Chatbot } from './view/pages'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTheme, setTheme } from "./ui";
import { Alert } from './view/components'

const { Provider } = AppContext

function App() {
  const [feedback, setFeedback] = useState(null)
  // const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  useEffect(() => setTheme(getTheme()) ,[])

  const alert = (message, level = 'info') => setFeedback({message, level})
  
  const handleOnAcceptAlert = () => setFeedback(null)
  
  // const freeze = () => setLoader(true)
  // const unfreeze = () => setLoader(false)

  return <Provider value={{alert, navigate}}>
      <Routes>
        {(() => console.log('Routes -> render'))()}
        <Route path='/login' element={isUserLoggedIn() ? <Navigate to='/'/> : <Login />}/>
        <Route path='/register' element={isUserLoggedIn() ? <Navigate to='/'/> : <Register />}/>
        <Route path='/' element={isUserLoggedIn() ? <Home/> : <Navigate to='/login'/>}/>
        <Route path='/chatbot' element={isUserLoggedIn() ? <Chatbot/> : <Navigate to='/login'/>}/>
      </Routes>

      {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleOnAcceptAlert}/>}
  </Provider>
}

export default App
