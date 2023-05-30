import React from "react";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home";
import { context } from "./ui";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    if(context.userId)
      this.state = { view: "home" }
    else
      this.state = { view: "login" }
      
  }

  handleGoToRegister = () => {
    this.setState({ view: "register" })
  }
  
  handleGoToLogin = () => {
    this.setState({ view: "login" })
  }

  handleGoToHome = () => {
    this.setState({ view: "home" })
  }

  render() {
    switch(this.state.view) {
      case 'login': 
        return <Login
        onRegisterClick={this.handleGoToRegister}
        onLoggedInUser={this.handleGoToHome}
        />
      case 'register':
        return <Register
        onLoginClick={this.handleGoToLogin}
        onRegisterUser={this.handleGoToLogin}
        />
      case 'home':
        return <Home
        onLoggedOut={this.handleGoToLogin}
        />
      }
    }
}