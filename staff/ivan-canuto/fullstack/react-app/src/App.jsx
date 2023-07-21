import { useEffect, useState } from "react";
import Login from "./view/pages/Login"
import Register from "./view/pages/Register"
import Home from "./view/pages/Home";
import { getTheme, setTheme } from "./ui";
import AppContext from "./AppContext";
import { Alert } from "./view/components";
import Loader from "./view/library/Loader";
import { Routes, Route, Navigate , useNavigate } from 'react-router-dom'
import isUserLoggedIn from "./logic/isUserLoggedIn";

const { Provider } = AppContext

export default function App() {
  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  useEffect(() => setTheme(getTheme()) ,[])

  const alert = (message, level = 'info') => setFeedback({message, level})
  
  const handleOnAcceptAlert = () => setFeedback(null)
  
  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

  return <Provider value={{alert, freeze, unfreeze, navigate}}>
    <Routes>
      {(() => console.log('Routes -> render'))()}
      <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />}/>
      <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />}/>
      <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />}/>
    </Routes>
      
      {loader && <Loader/>}
      {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleOnAcceptAlert}/>}
  </Provider>
}