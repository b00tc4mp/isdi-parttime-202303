import { Component } from 'react'
import { context } from './ui'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'

export default class App extends Component {
  constructor(props) {
    super(props)

    if (context.userId)
      this.state = { view: 'home' }
    else
      this.state = { view: 'login' }
  }

  handleGoToRegister = () => {
    this.setState({ view: 'register' })
  }

  handleGoToLogin = () => {
    this.setState({ view: 'login' })
  }

  handleGoToHome = () => {
    this.setState({ view: 'home' })
  }


  render() {
    switch (this.state.view) {
      case 'login':
        return <Login onRegisterClick={this.handleGoToRegister} onUserLoggedIn={this.handleGoToHome} />
      
      case 'register':
        return <Register onLoginClick={this.handleGoToLogin} onUserRegistered={this.handleGoToLogin}/>

      case 'home':
        return <Home />
    }
  }
}