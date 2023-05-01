import Component from './library/composito.js'
import Login from './pages/login.js'
import Register from './pages/register.js'
import Home from './pages/home.js'

export default class App extends Component {
    constructor() {
        super(`<div class="my-app"></div>`)

        const login = new Login
        const register = new Register
        
        login.onRegisterClick = () => {
            this.remove(login)
            this.add(register)
        }
        
        register.onLoginClick = () => {
            this.remove(register)
            this.add(login)
        }
        
        login.onAuthenticated = () => {
            const home = new Home
            this.remove(login)
            this.add(home)
        }

        this.add(login)
    }
}