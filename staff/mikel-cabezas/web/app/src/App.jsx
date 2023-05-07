import { Component } from "react"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from './pages/Home.jsx'
import Header from './components/header.jsx'
import { context } from "./ui.js"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {view: 'login'}
  }
  
  handleGoToRegister = () => this.setState({ view: 'register' })
  handleGoToLogin = () => this.setState({ view: 'login' })
  handleGoToHome = () => this.setState({ view: 'home' })
  handleLoginOnLogout = () => this.setState({ view: 'login' })

  render() {
    if(context.userId) {
      return [<Home onLogoutClick={this.handleLoginOnLogout} />]
    } else {
      switch (this.state.view) {
        case 'login':
          return [<Header  pushUserDataToHeader={this.renderUser} />, <Login onRegisterClick={this.handleGoToRegister} onUserLoggedIn={this.handleGoToHome} />]
        case 'register':
          return [<Header onLoggedOut={this.handleGoToLogin} />, <Register onLoginClick={this.handleGoToLogin} onUserRegistered={this.handleGoToLogin} />]
        case 'home':
          return [<Home onLogoutClick={() => this.handleGoToLogin} />]
      }
    }
  }
}