import Component from './library/composito.js'
import Login from './pages/login.js'
import Register from './pages/register.js'
import Home from './pages/home.js'

export default class App extends Component {
    constructor() {
        super(`<div></div>`)

        const login = new Login
        const register = new Register
        const home = new Home

        login.onRegisterClick = () => {
            this.remove(login)
            this.add(register)
        }

        register.onLoginClick = () => {
            this.remove(register)
            this.add(login)
        }

        login.onAuthenticated = () => {
            this.remove(login)
            this.add(home)
        }

        this.add(login)
    }
}