import { useEffect, useState } from "react";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home";
import { context } from "./ui";

export default function App() {
  
  const [view, setView] = useState(null)

  useEffect(() => {
    if(context.userId)
      setView('home')
    else
      setView('login')
  }, [])

  const handleGoToRegister = () => {
  setView('register')
  }
  
  const handleGoToLogin = () => {
    setView('login')
  }
  
  const handleGoToHome = () => {
    setView('home')
  }

  switch(view) {
    case 'login': 
      return <Login
      onRegisterClick={handleGoToRegister}
      onLoggedInUser={handleGoToHome}
      />
    case 'register':
      return <Register
      onLoginClick={handleGoToLogin}
      onRegisterUser={handleGoToLogin}
      />
    case 'home':
      return <Home
      onLoggedOut={handleGoToLogin}
      />
    }
    
}