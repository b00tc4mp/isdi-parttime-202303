import { Component } from "./library/master-component";
import { Login } from "./pages/login.js"
import { Register } from "./pages/register.js";
import { Home } from "./pages/home.js"

export class App extends Component {
    constructor(){
        super('<div class="body"></div>')

        const login = new Login
        const register = new Register
        const home = new Home
        this.add(login)

        register.onRegistered = () => {
            this.remove(register)
            this.add(login)
        }

        login.goToRegisterLink = () => {
            this.remove(login)
            this.add(register)
        }

        register.goToLoginLink = () => {
            this.remove(register)
            this.add(login)
        }

        login.onAuthenticated = () => {
            this.remove(login)
            this.add(home)
        }
    }
}