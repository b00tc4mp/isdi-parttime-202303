import { Component } from './library/composito.js'
import Login from './pages/login.js'
import Register from './pages/register.js'
import Home from './pages/home.js'
import { context } from './ui.js'

export default class App extends Component {
    constructor() {
        super('<div></div>')

        if (context.userId) {
            const home = new Home

            this.add(home)
        } else {
            const login = new Login
            
            login.onRegisterClick = () => {
                const register = new Register
                // opcion 1
                // register.onLoginClick = () => {
                //     this.remove(register)
                //     this.add(login)
                // }
                // register.onLoginClick = () => {
                //     this.remove(register)
                //     this.add(login)
                // }

                // opción 2
                // register.onLoginClick = register.onRegistered = () => {
                //     this.remove(register)
                //     this.add(login)
                // }

                //opcion 3
                const goToLogin = () => {
                    this.remove(register)
                    this.add(login)
                };

                register.onLoginClick = goToLogin
                register.onRegistered = goToLogin
                
                this.remove(login)
                this.add(register)
            }

            login.onAuthenticated = () => {
                const home = new Home

                this.remove(login)
                this.add(home)
            }

            this.add(login)
        }
    }
}