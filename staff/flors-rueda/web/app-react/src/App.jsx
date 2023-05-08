import { Component } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { context } from './ui/general-tools.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { view: context.userAuth ? 'home' : 'login' };
  }

  handleGoToRegister = () => this.setState({ view: 'register' });
  handleGoToLogin = () => this.setState({ view: 'login' });
  handleGoToHome = () => this.setState({ view: 'home' });
  handleLogout = () => {
    delete context.userAuth;
    this.setState({ view: 'login'});
}

  render() {
    switch (this.state.view) {
        case 'login':
            return <Login onRegisterClick={this.handleGoToRegister} onUserLoggedIn={this.handleGoToHome} />
        case 'register':
            return <Register onLoginClick = {this.handleGoToLogin} />
        case 'home':
            return <Home onLogout={this.handleLogout}/>
        }
    }
}