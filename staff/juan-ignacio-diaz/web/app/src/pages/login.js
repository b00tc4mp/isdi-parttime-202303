import { Component } from '../library/composito.js'
import { msAlert } from './alert-page.js'

import authenticateUser from '../logic/authenticate-user.js'

export default class Login extends Component {
    constructor() {
        super(`<div class="login page container">
    <h1 class="title">Login</h1>
    <form class="form" action="">
        <input class="input" type="email" name="email" placeholder="usuario@dominio.com"><br>
        <input class="input" type="password" size="10" name="password" placeholder="password"><br>
        <button class = "button" type="submit">Login</button>
    </form>

    <p>Go to <a href="">Register</a></p>
</div>`)

        this.container.querySelector('form').onsubmit = event => {
            event.preventDefault()

            const email = event.target.email.value
            const password = event.target.password.value
        
            try {
                const userId = authenticateUser(email, password)
        
                this.container.querySelector('form').reset()
                this.onAuthenticated(userId) //openSession(userId)
            }
            catch(error) {
                msAlert(error.message)
            }
        } 

        this.container.querySelector("a").onclick = event => {
            event.preventDefault()
        
            //this.container.querySelector('form').reset()
            this.onRegisterClick()
        }
    }

    onRegisterClick() {
        throw new Error('not overridden')
    }

    onAuthenticated(userId) {
        throw new Error('not overridden')
    }
}


