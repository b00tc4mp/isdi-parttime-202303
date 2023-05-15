import { Component } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'

export default class App extends Component {
  constructor(props) {
      super(props)

      this.state = { view: 'login', authenticatedUser: null }
  }

  handleGoToRegister = () => {
      this.setState({ view: 'register'})
  }

  handleGoToLogin = () => {
      this.setState({ view: 'login'})
  }

  handleGoToHome = (userId) => {
    this.setState({ view:'home', authenticatedUser: userId})
  }

  render() {
        if(this.state.view === 'login')
            return <Login onRegisterClick={this.handleGoToRegister} onLoginAttemptClick={this.handleGoToHome}/>
      
        if(this.state.view === 'register')
            return <Register onLoginClick={this.handleGoToLogin} />  

        if(this.state.view === 'home')
            return <Home />
  }
}
