import { Component } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

export default class App extends Component {
  constructor(props) {
      super(props)

      this.state = { view: 'login' }
  }

  handleGoToRegister = () => {
      this.setState({ view: 'register' })
  }

  handleGoToLogin = () => {
      this.setState({ view: 'login' })
  }

  render() {
      if (this.state.view === 'login')
          return <Login onRegisterClick={this.handleGoToRegister} />
      else
          return <Register onLoginClick={this.handleGoToLogin} />
  }
}
