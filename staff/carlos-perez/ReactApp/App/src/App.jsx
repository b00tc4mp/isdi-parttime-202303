import { Component } from 'react'
import  Login  from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { context } from '../src/main.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { view: context.userId ? 'home' : 'login' };
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

  handleRegisterClick = () => {
    this.setState({ view: 'home' })
  }

  componentWillMount() {
    console.log('App -> componentWillMount')
  }

  componentDidMount() {
    console.log('App -> componentDidMount')
  }

  componentWillUnmount() {
    console.log('App -> componentWillUnmount')
  }

  render() {

    switch (this.state.view) {
      case 'login': return <Login onRegisterClick={this.handleGoToRegister} onAuthClick={this.handleGoToHome} />;
      case 'register': return <Register onLoginClick={this.handleGoToLogin} onRegisterClick={this.handleRegisterClick} />;
      case 'home': return <Home onLoggedOut={this.handleGoToLogin} />
    }
  }
}