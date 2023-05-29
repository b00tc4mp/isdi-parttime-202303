import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { context } from "./ui";
import Alert from "./components/alert";
import Context from "./Context"; 

export default function App() {
  const [view, setView] = useState(context.userId ? "home" : "login")
  const [feedback, setFeedback] = useState(null)

  const handleGoToRegister = () => setView("register")
  const handleGoToLogin = () => setView("login");
  const handleGoToHome = () => setView("home");
  const handleAcceptAlert = () => setFeedback(null)


  return <Context.Provider value={{ alert: setFeedback }}>
    {view === "login" && <Login onRegisterClick={handleGoToRegister} onUserLogedin={handleGoToHome} />}
    {view === "register" && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
    {view === "home" && <Home onLogOutClick={handleGoToLogin} />}
    {feedback && <Alert message={feedback} onAccept={handleAcceptAlert} />}
  </Context.Provider>
}