import { Component } from "../library/master-component.js"
import { registerUser } from "../logic/registerUser.js"
import { generateToast, errorToast } from "../ui.js"

export class Register extends Component{
    constructor(){
        super(`<div class="registration">
        <div class="centered-containers">
            <h1 class="title">Welcome stranger!</h1>
            
            <form class="centered-form">

                <label for="username" class="text-field-label">Username</label>
                <input type="text" name="username" class="text-field">

                <label for="email" class="text-field-label">Email</label>
                <input type="text" name="email" class="text-field">

                <label for="password" class="text-field-label">Password</label>
                <input type="password" name="password" class="text-field">

                <label for="rep-password" class="text-field-label">Repeat password</label>
                <input type="password" name="rep-password" class="text-field">
                
                <button class="button-S primary-button" type="submit">Sign up</button>
            </form>
            
            <div class="already-account-container">
                <p class="already-account">Already have an account? <a href="" class="link">Log in</a> </p>           
            </div>
        </div>
    </div>`)

        const registerForm = this.container.querySelector('form')

        registerForm.onsubmit = event => {
            event.preventDefault()
        
            const registrationName = registerForm.querySelector('input[name=username]').value
            const registrationEmail = registerForm.querySelector('input[name=email]').value
            const registrationPassword = registerForm.querySelector('input[name=password]').value
            const registrationRepPassword = registerForm.querySelector('input[name=rep-password]').value
            
            try {
                registerUser(registrationName, registrationEmail, registrationPassword,registrationRepPassword)

                this.onRegistered()
            } catch (error) {
                generateToast({
                    message: error.message,
                    type: errorToast, 
                    length: '3000ms'
                })
            } finally {
                registerForm.querySelector('input[name=password]').value = ''
                registerForm.querySelector('input[name=rep-password]').value = ''
            }
        }


        this.container.querySelector('a').onclick = event =>{
            event.preventDefault()

            this.goToLoginLink()
        }
    }

    goToLoginLink(){
        throw new Error('not overriden')
    }

    onRegistered() {
        throw new Error('not overriden')
    }
}