import { useEffect, useState } from "react";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home";
import { context, getTheme, setTheme } from "./ui";
import AppContext from "./AppContext";
import Alert from "./components/Alert";
import Loader from "./library/Loader";
import { utils } from "com"

const { Provider } = AppContext
const { isTokenAlive, isTokenValid } = utils

export default function App() {
  const { token } = context
  const [view, setView] = useState(isTokenValid(token) && isTokenAlive(token) ? 'home' : 'login')
  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)

  useEffect(() => setTheme(getTheme()) ,[])

  // useEffect(() => {
  //   if(context.token)
  //     setView('home')
  //   else
  //     setView('login')
  // }, [])

  const handleGoToRegister = () => setView('register')
  
  const handleGoToLogin = () => setView('login')
  
  const handleGoToHome = () => setView('home')

  const alert = (message, level = 'info') => setFeedback({message, level})
  
  const handleOnAcceptClick = () => setFeedback(null)
  
  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

  return <Provider value={{alert, freeze, unfreeze}}>
    {loader && <Loader/>}
    {view === 'login' && <Login onRegisterClick={handleGoToRegister} onLoggedInUser={handleGoToHome}/>}
    {view === 'register' && <Register onLoginClick={handleGoToLogin} onRegisterUser={handleGoToLogin}/>}
    {view === 'home' && <Home onLoggedOut={handleGoToLogin}/>}
    {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleOnAcceptClick}/>}
  </Provider>
}