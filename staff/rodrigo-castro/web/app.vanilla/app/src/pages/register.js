import { registerUserFull } from '../logic/register-user.js'
import Component from '../library/composito.js'

export default class Register extends Component {
    constructor() {
        super(`<div class="register-page">
        <h1 class="all-titles">REGISTER</h1>
        <div class="red-text"></div>
        <form class="inputs">
            <input class="input-field" type="text" name="name" placeholder="User name">
            <input class="input-field" type="email" name="email" placeholder="Email">
            <input class="input-field" type="password" name="password" placeholder="Password">
            <div class="secondary-text">Already registered? <a class="go-to-sign-in">Sign in</a></div>
            <button class="submit-buttons" type="submit">Register</button>
        </form>
        </div>`)

        this.container.querySelector('form').onsubmit = (event) => {
            event.preventDefault()
        
            const userName = document.querySelector('.input-field[name=name]').value
            const userEmail = document.querySelector('.input-field[name=email]').value
            const userPassword = document.querySelector('.input-field[name=password]').value
        
            try {
                registerUserFull(userEmail, userName, userPassword)

                this.resetPage()

                this.onRegistered()
            } catch(error){
                if(error.cause === 'ownError'){
                    document.querySelector('.red-text').textContent = error.message
                } else {
                    console.log(error)
                }
            }
        
        }

        this.container.querySelector('.go-to-sign-in').onclick = (event) => {
            event.preventDefault()

            this.onLoginClick()
        }
    }

    onLoginClick() {
        throw new Error('Not overriden')
    }

    onRegistered() {
        throw new Error('Not overriden')
    }

    resetPage() {
        this.container.querySelector('.red-text').innerText = ''
        this.container.querySelector('form').reset()
    }
}