console.log('app.js')
import Component from "./library/component.js";
import LoginPage from './pages/login.js'
import RegisterPage from './pages/register.js'
import HomePage from './pages/home.js'

export default class App extends Component {
    constructor() {
        super('<div class="main-content"></div>')
 
        const login = new LoginPage
        const register = new RegisterPage
        const home = new HomePage
        this.add(login)

        login.onRegisterClick = () => {
            this.remove(login)
            this.add(register)
        }
        login.onAuthenticated = () => {
            this.remove(login)
            this.add(home)
        }
        register.onLoginClick = () => {
            this.remove(register)
            this.add(login)
        }

    }
}