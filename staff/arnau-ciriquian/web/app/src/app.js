import Component from "./library/composito.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Home from "./pages/home.js";
import { context } from "./ui.js";

export default class App extends Component {
    constructor() {
        super('<div class="main-div"><div>')

        const login = new Login
        const register = new Register
        let home = new Home

        login.onRegisterClick = () => {
            this.remove(login)
            this.add(register)
        }

        login.onAuthenticated = () => {
            this.remove(login)
            home = new Home
            this.add(home)

            home.onLoggedOut = () => {
                this.add(login)
                this.remove(home)
            }
        }
        
        home.onLoggedOut = () => {
            this.add(login)
            this.remove(home)
        }
        
        register.onLoginClick = () => {
            this.remove(register)
            this.add(login)
        }

        register.onRegistered = () => {
            this.remove(register)
            this.add(login)
        }

        context.userID ? this.add(home) : this.add(login)
    }
}