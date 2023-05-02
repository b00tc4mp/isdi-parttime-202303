import { Component } from 'react'
import Login from './pages/Login.jsx'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = { view: 'login'}
  }

  handleGoToRegister = () => {
    this.setState({ view: 'register'})
  }



  render() {
    if (this.state.view === 'login')
      return <Login onRegisterClick={this.handleGoToRegister} />
  }

}