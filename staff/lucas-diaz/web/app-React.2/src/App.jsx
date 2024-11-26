import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { context } from "./ui";

export default function App() {
  const [view, setView] = useState(context.userId ? "home" : "login")

  const handleGoToRegister = () => setView("register")
  const handleGoToLogin = () => setView("login");
  const handleGoToHome = () => setView("home");

  switch (view) {
    case "login":
      return <Login
        onRegisterClick={handleGoToRegister}
        onUserLogedin={handleGoToHome}
      />

    case "register":
      return <Register
        onLoginClick={handleGoToLogin}
        onUserRegistered={handleGoToLogin}
      />

    case "home":
      return <Home
        onLogOutClick={handleGoToLogin}
      />
  }
}



