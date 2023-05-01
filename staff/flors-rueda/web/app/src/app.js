import { Component } from './library/mew.js'
import Login from './pages/login.js'
import Register from './pages/register.js'

export default class App extends Component {
    constructor() {
        super('<div></div>')

        const login = new Login
        const register = new Register

        login.onRegisterClick = () => {
            this.remove(login);
            this.add(register);
        }

        register.onLoginClick = () => {
            this.remove(register);
            this.add(login);
        }

        login.onAuthenticated = () => {
            this.remove(login);
            console.log('haiii!');
        }

        this.add(login);
    }
}