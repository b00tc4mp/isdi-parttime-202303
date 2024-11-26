import { Component } from 'react'
import { context } from './ui'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import AlertModal from './components/AlertModal'

export default class App extends Component {
  constructor() {
    super()

    this.state = { view: context.userId? 'home' : 'login', modal: null }
  }

  handleGotoRegister = () => {
    this.setState({ view: 'register'})
  }

  handleGotoLogin = () => {
    this.setState({ view: 'login' })
  }

  handleGoToHome = () => {
    this.setState({ view: 'home' })
  }

  handleOpenAlert = (message) => {
    this.message = message
    this.setState({ modal: 'alert'})
  }

  hanleCloseAlert = () => {
    this.setState({ modal: null})
  }

  render() {
      console.log('App -> render')

      return <>
          {this.state.view === 'login' && <Login 
            onRegisterClick={this.handleGotoRegister} 
            onUserLoggedIn={this.handleGoToHome} onMenssageAlert={this.handleOpenAlert}
            /> 
          }   
          {this.state.view === 'register' && <Register 
            onLoginClick={this.handleGotoLogin} 
            onRegistered={this.handleGotoLogin}
            onMenssageAlert={this.handleOpenAlert}
            />
          }
          {this.state.view ===  'home' && <Home 
            onLogout={this.handleGotoLogin}
            onMenssageAlert={this.handleOpenAlert}
            />
          }
          {this.state.modal === 'alert' && <AlertModal 
            onAccept={this.hanleCloseAlert}
            message={this.message}
          />
          }
        </>
      }
}