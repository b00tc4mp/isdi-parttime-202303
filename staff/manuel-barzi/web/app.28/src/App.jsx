import { Component } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { context } from './ui'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: context.userId? 'home' : 'login' }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })

    handleGoToLogin = () => this.setState({ view: 'login' })

    handleGoToHome = () => this.setState({ view: 'home' })

    render() {
        console.log('App -> render')

        switch (this.state.view) {
            case 'login':
                return <Login onRegisterClick={this.handleGoToRegister} onUserLoggedIn={this.handleGoToHome} />
            case 'register':
                return <Register onLoginClick = {this.handleGoToLogin} />
            case 'home':
                return <Home />
        }
  }
}