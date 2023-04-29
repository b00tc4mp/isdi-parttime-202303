import { Component } from './library/composito.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import Home from './pages/home.js';

export default class App extends Component {
    constructor() {
        super('<div></div>');

        const login = new Login 
        const register = new Register
        const home = new Home

        login.onRegisterClick = () => {
            this.remove(login);
            this.add(register);  
        };

        login.onAuthenticated = () => {
            this.remove(login);
            this.add(home)
        };

        register.onRegistered = () => {
            this.remove(register);
            this.add(login);
        };

        register.onLoginClick = () => {
            this.remove(register);
            this.add(login);
        };

        this.add(login)
    }
}