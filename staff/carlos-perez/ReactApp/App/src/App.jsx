import { Component } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'

export default class App extends Component {
  constructor(props) {
      super(props);

      this.state = { view: 'login' };
  }

  handleGoToRegister = () => {
      this.setState({ view: 'register' })
  }

  handleGoToLogin = () => {
      this.setState({ view: 'login' })
  }

  handleGoToHome = () =>{
    this.setState({ view: 'home' })
  }

  /*handlePostClick = () =>{
    this.setState({ view: 'home'})
  }*/

  render() {

    switch(this.state.view){
        case 'login': return <Login onRegisterClick={this.handleGoToRegister} onAuthClick={this.handleGoToHome}/>;
        case 'register': return <Register onLoginClick={this.handleGoToLogin}  />;
        case 'home': return <Home />
        default: return <Login onRegisterClick={this.handleGoToRegister} />;
    }
  }
}