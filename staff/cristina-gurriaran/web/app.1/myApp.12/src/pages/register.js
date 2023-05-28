import { registerUser } from "../logic/register-user.js";
import { Component } from "../library/composito.js";




export default class Register extends Component {

    constructor(){
        super(`
        <div class='register container'>
        <h1 class ='title'> Sign up </h1>

        <h2> Already have an account? <a href=""> Log in </a></h2>

        <form class='form'>
            <input class='input' type='name' name='name' placeholder='Name*'>
            <input class='input' type='email' name='email' placeholder='Email address*'>
            <input class='input' type='password' name='password' placeholder='Password (8+ characters)*'>
            <button class='button' type='submit'> Create an account </button>

        </form>

        </div>`)

        this.container.querySelector('form').onsubmit = (event) => {
            event.preventDefault()

            const name = event.target.name.value
            const email = event.target.email.value
            const password = event.target.password.value

            try {
                registerUser(name, email, password)
                this.onRegisteredClick()

            } catch (error) {
                alert(error.message)
            }
        }

        this.container.querySelector('a').onclick = (event) => {
            event.preventDefault()
            
            this.onLoginClick()
        }

    }

    onLoginClick(){ 
        throw new Error('not overriden')
    }   
    
    onRegisteredClick(){ 
        throw new Error('not overriden')
    }   

}



