import { Component } from "../library/master-component.js"
import { context } from "../ui.js"
import { authenticateUser } from "../logic/authenticateUser.js"
import { generateToast, errorToast } from "../ui.js"

export class Login extends Component{
    constructor(){
        super(`<div class="login">
        <div class="centered-containers">

            <h1 class="title">Welcome back!</h1>
            
            <form class="centered-form">
                <label for="email" class="text-field-label">Email</label>
                <input type="text" name="email" class="text-field">

                <label for="password" class="text-field-label">Password</label>
                <input type="password" name="password" class="text-field">

                <button class="button-S primary-button" type="submit">Log in</button>

                <div class="create-account">
                    <p class="body-text">New to <strong>Helio</strong>?</p><a href="" class="link sign-in">Sign in</a>
                </div>
            </form>
        </div>
    </div>`)

        const loginForm = this.container.querySelector('form')
        loginForm.onsubmit = event => {
            event.preventDefault()
        
            const inputEmail = event.target.email.value
            const inputPassword = event.target.password.value
    
            try{
                context.userId = authenticateUser(inputEmail, inputPassword)
        
                // renderUser()
                this.onAuthenticated()
                
            } catch (error) {
                generateToast({
                    message: error.message,
                    type: errorToast, 
                    length: '3000ms'
                })
            } finally {
                this.container.querySelector('input[name=password]').value= ''
            }
        }

        this.container.querySelector('.create-account').querySelector('.link').onclick = event => {
            event.preventDefault()
        
            this.goToRegisterLink()
        }
    }

    goToRegisterLink(){
        console.log('override me')
    }

    onAuthenticated(){
        console.log('override me')
    }
}