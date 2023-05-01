import { Component } from '../library/composito.js'
import { msAlert } from './alert-page.js'

import registerUser from '../logic/register-user.js'

export default class Register extends Component {
    constructor() {
        super(`<div class="register page container">
    <h1 class="title">Register</h1>

    <form class="form" action="">
        <label class="title" for="nameRegister">Name: </label>
        <input class="input" type="text" name="name" placeholder="name">
        <label class="title" for="emailRegister">E-mail: </label>
        <input class="input" type="email" name="email" placeholder="usuario@dominio.com">
        <label class="title" for="passwordRegister">Password: </label>
        <input class="input" type="password" name="password" placeholder="password"><br>
        <button class = "button" type="submit">Register</button>
    </form>

    <p>Go to <a href="">Login</a></p>
</div>`)  

        this.container.querySelector('form').onsubmit = event => {
            event.preventDefault()
        
            event.target.name.classList.remove("imput-highlight")
            event.target.email.classList.remove("imput-highlight")
            event.target.password.classList.remove("imput-highlight")
        
            const name = event.target.name.value
            const email = event.target.email.value
            const password = event.target.password.value
        
            try {
                registerUser(name, email, password)
        
                this.container.querySelector('form').reset()
                this.onRegisterSave()
            }
            catch (error) {
                msAlert(error.message)
        
                if (error.cause === "email") { 
                    event.target.email.focus()
                    event.target.email.classList.add("imput-highlight")
                }
        
                else if (error.cause === "name") {
                    event.target.name.focus()
                    event.target.name.classList.add("imput-highlight")
                }
                else if (error.cause === "password") { 
                    event.target.password.focus()
                    event.target.password.classList.add("imput-highlight")
                }
            }    
        }

        this.container.querySelector("a").onclick = event => {
            event.preventDefault()
        
            //this.container.querySelector('form').reset()
            this.onLoginClik()
        }
    }

    onRegisterSubmit() {
        throw new Error('not overridden')       
    }

    onLoginClik() {
        throw new Error('not overridden')       
    }
}

