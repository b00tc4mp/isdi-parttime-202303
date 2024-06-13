import Component from "../library/composito"
import { authenticateUser } from "../logic/authenticate-user" 
import { context } from "../ui"

export default class Login extends Component {
    constructor() {
        super(`<div class="login">
            <header class="main-tittle">
                <img class="main-logo" src="./images/PunIntendedMain.png">
            </header>
            <div class="page">
                <h1 class="text">Login</h1>
                <form class="login__form">
                    <div class="inputs__box">
                        <input class="form__input" type="email" name="email" placeholder="email">
                        <div class="password-container">
                            <input class="form__input login__password" type="password" name="password" placeholder="password">
                            <i class="login-eye fa-solid fa-eye"></i>
                        </div>
                    </div>
                    <button class="form__button" type="submit">Login</button>
                </form>    
                <p class="text">Go to <a class="login__anchor--register" href="">Register</a></p>
            </div>
        </div>`)

        this.container.querySelector('form').onsubmit = event => {
            event.preventDefault()
            
            const email = event.target.email.value
            const password = event.target.password.value
        
            try {
                context.userID = authenticateUser(email, password)
        
                //hideAllPasswords(loginPage, '.login__password')
                //unslashAllEyes(loginPage, '.login-eye')
        
                document.querySelector('form').reset()
                this.onAuthenticated()
            } catch (error) {
                alert(error.message)
            }
        }
        
        this.container.querySelector('.login__anchor--register').onclick = event => {
            event.preventDefault()
        
            //hideAllPasswords(loginPage, '.login__password')
            //unslashAllEyes(loginPage, '.login-eye')
            document.querySelector('form').reset()
            this.onRegisterClick()
        }
    }

    onRegisterClick() {
        throw new Error('not overriden')
    }

    onAuthenticated() {
        throw new Error('not overriden')
    }
}