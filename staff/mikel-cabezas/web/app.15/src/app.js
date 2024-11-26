console.log('app.js')
import Component from "./library/component.js";
import LoginPage from './pages/login.js'
import RegisterPage from './pages/register.js'
import HomePage from './pages/home.js'
import { context } from "./ui.js";
import { pushUserDataToHeader } from "./components/helpers/push-user-to-header.js";

export default class App extends Component {
    constructor() {
        
        super('<div class="main-content"></div>')
 
        let home

        if(context.userId) {
            home = new HomePage
            pushUserDataToHeader(context.userId)
            this.add(home)

        } else {
            const login = new LoginPage
            let register
            
            login.onRegisterClick = () => {
                if(!register) {
                    register = new RegisterPage
                    register.onLoginClick = () => {
                        this.remove(register)
                        this.add(login)
                    }
                    register.onRegistered = () => {
                        this.remove(register)
                        this.add(login)
                    }
                }
                this.remove(login)
                this.add(register)
            }
            login.onAuthenticated = () => {
                const home = new HomePage
                this.remove(login)
                this.add(home)
                home.onLoggedOut = () => {
                    this.remove(home)
                    this.add(login)
                    delete sessionStorage.userId
                }
            }

            this.add(login)
        }


        

    }
}