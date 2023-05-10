import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { view: "login" }
  }

  handleGoToRegister = () => this.setState({ view: "register" })

  handleGoToLogin = () => this.setState({ view: "login" })

  handleGoToHome = () => this.setState({ view: "home" })


  render() {
    switch (this.state.view) {
      case "login":

      
        return <Login
          onRegisterClick={this.handleGoToRegister}
          onUserLogedin={this.handleGoToHome}
        />

      case "register":
        return <Register
          onLoginClick={this.handleGoToLogin}
          onUserRegistered={this.handleGoToLogin}
        />

      case "home":
        return <Home
          onLogOutClick={this.handleGoToLogin}
        />
    }
  }
}



