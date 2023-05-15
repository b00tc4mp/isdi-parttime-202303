import { Component } from 'react'
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Home from './pages/home.jsx';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = { view: 'login' }
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

    render() {
        switch(this.state.view){
            case 'login': return <Login onSignUpClick={this.handleGoToRegister} onLoginClick={this.handleGoToHome}/>
            case 'register': return <Register onLoginClick={this.handleGoToLogin}/>
            case 'home': return <Home/>
        }
    }
}