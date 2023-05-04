import Component from '../library/composito.js'
import authenticateUser from '../logic/authenticate-user.js'
import { context, resetPage } from '../ui.js'


export default class Login extends Component {
    constructor() {
        super(`<div class="login-page">
        <h1 class="all-titles">LOGIN</h1>
        <div class="red-text"></div>
        <form class="inputs">
                <input class="input-field" type="email" name="email" placeholder="Email">
                <input class="input-field" type="password" name="password" placeholder="Password">
                <div class="remember-me">
                    <input class="checkbox" type="checkbox" name="remember-me">
                    <div class="remember-me-text">Remember me</div>
                </div>
                <div class="forgot-password">Forgot your <a class="forgot-password-button">password</a>?</div>
                <div class="already-registered">Don't have an account? <a class="register-now-button">Register now</a></div>
                <button class="submit-buttons" type="submit">Login</button>
        </form>
        </div>`)

        this.container.querySelector('form').onsubmit = (event) => {
            event.preventDefault();
            const userEmail = document.querySelector('.input-field[name=email]').value.toLowerCase()
            const userPassword = document.querySelector('.input-field[name=password]').value
        
            try {
                
                context.userId = authenticateUser(userEmail, userPassword)
        
                this.resetPage()

                this.onAuthenticated()
                
            } catch(error){
                if(error.cause === 'ownError'){
                    document.querySelector('.red-text').textContent = error.message
                } else {
                    console.log(error)
                }
            }
        }

        this.container.querySelector('.register-now-button').onclick = (event) => {
            event.preventDefault()

            this.onRegisterClick()
        }
    }

    onRegisterClick() {
        throw new Error('Not overriden')
    }

    onAuthenticated() {
        throw new Error('Not overriden')
    }

    resetPage() {
        this.container.querySelector('.red-text').innerText = ''
        this.container.querySelector('form').reset()
    }
}