import { Component } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


class App extends Component {
  constructor() {
    super();

    this.state = { view: 'login' };
  }

  handleGoToRegister = () => {
    this.setState({ view: 'register' });
  };

  handleGoToLogin = () => {
    this.setState({ view: 'login' });
  };

  handleGoToHome = () => {
    this.setState({ view: 'home' });
  }

  render() {
    switch (this.state.view) {
      case 'login':
        return <Login onRegisterClick={this.handleGoToRegister} onUserLoggedIn={this.handleGoToHome} />;
      case 'register':
        return <Register onLoginClick={this.handleGoToLogin} onUserRegistered={this.handleGoToHome}/>;
      case 'home':
        return <Home onLoggedOut={this.handleGoToLogin} onProfileClick={this.handleGoToProfile}/>

    }

  }
}

export default App