import { Component } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

export default class App extends Component {
  constructor(props) {
      super(props)

      this.state = { view: 'login' }
  }

  handleGoToRegister = () => {
      this.setState({ view: 'register'})
  }

  handleGoToLogin = () => {
      this.setState({ view: 'login'})
  }

  render() {
      return this.state.view === 'login' ?
      <Login
          onRegisterClick={this.handleGoToRegister}
          pepito='grillo'
      />
      :
      <Register onLoginClick={this.handleGoToLogin} />  
  }
}
