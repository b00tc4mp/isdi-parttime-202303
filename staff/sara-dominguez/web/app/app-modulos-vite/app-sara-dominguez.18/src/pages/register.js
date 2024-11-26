import Component from "../components/library/composito.js"
import { registerUser } from "../logic/register-user.js"

export default class Register extends Component {
    constructor() {
        super(`<div class="register container">
        <h1>Register</h1>
            <form class="register-form">
                <input class="register-input" type='text' name='name' placeholder='name'>
                <input class="register-input" type='text' name='email' placeholder='email'>
                <input class="register-input" type='text' name='password' placeholder='password'>
                <button class="register-button" type="submit">Register</button>
            </form>
            <p class="register-text-goToLogin"><a href=""> Go to login</a></p>
            </div>`)

        this.container.querySelector('form').onsubmit = function(event) {
            event.preventDefault()
        
            const name = event.target.name.value
            const email = event.target.email.value
            const password = event.target.password.value
        
            try{
                registerUser(name,email,password)
                this.onRegistered()
            } catch (error) {
                alert(error.message)
            }
        }

        this.container.querySelector('a').onclick = event =>{
            event.preventDefault()
        
            this.onLoginClick()
        }
    }

    onLoginClick() {
        console.log('go to login')
    }
    onRegistered(){
        console.log('registered')
    }
}