import { useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Alert from './components/Alert.jsx'
import AppContext from './components/AppContext.js'
import { Loader } from './library'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import isLoggedIn from './logic/isLoggedIn'


export default function App() {

  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()



  const handleAcceptAlert = () => setFeedback(null)

  const alert = (message, level = 'info') => setFeedback({ message, level })

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)



  return <AppContext.Provider value={{ alert, freeze, unfreeze, navigate }}>
    <Routes>
      {(() => console.log('Router => render App'))()}
      <Route path="/login" element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isLoggedIn() ? <Navigate to="/" /> : <Register />} />
      <Route path="/" element={isLoggedIn() ? <Home /> : <Navigate to="/login" />} />
    </Routes>

    {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
    {loader && <Loader />}
  </AppContext.Provider>

}