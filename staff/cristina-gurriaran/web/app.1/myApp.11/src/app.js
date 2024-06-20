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

            home.onLogOut = () => {
                this.remove(home)
                this.add(login)
            }

        } else {
            const login = new Login

            login.onRegisterClick = () => {

                const register = new Register

                this.remove(login)
                this.add(register)

                register.onLoginClick = () => {
                    this.remove(register)
                    this.add(login)
                }

                register.onRegisteredClick = () => {
                    this.remove(register)
                    this.add(login)
                }

            }

            login.onAuthenticated = () => {
                const home = new Home

                this.remove(login)
                this.add(home)

                home.onLogOut = () => {
                    this.remove(home)
                    this.add(login)
                }
    
            }

            this.add(login)

        }
    }
}