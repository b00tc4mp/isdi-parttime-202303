import { Component } from 'react';
import Profile from './components/Profile';
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

  handleGoToProfile = () => {
    this.setState({ view: 'profile' });
  }

  render() {
    switch (this.state.view) {
      case 'login':
        return <Login onRegisterClick={this.handleGoToRegister} onUserLoggedIn={this.handleGoToHome} />;
      case 'register':
        return <Register onLoginClick={this.handleGoToLogin} onUserRegistered={this.handleGoToHome}/>;
      case 'home':
        return <Home onLoggedOut={this.handleGoToLogin} onProfileClick={this.handleGoToProfile}/>
      case 'profile':
        return <Profile onHomeClick={this.handleGoToHome}/>
    }

  }
}

export default App