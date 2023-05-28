import { Component } from "../library/composito.js"
import authenticateUser from '../logic/authenticate-user.js'
import { context } from '../ui.js'

export default class Login extends Component {
    constructor(){
        super(
        `<div class='login container'>

        <h1 class='title'> Log in</h1>
        
         <h2> New to myApp?  <a href=""> Sign up </a></h2>

        <form class="form">
            <input class='input' type='email' name='email' placeholder='Email address*'>
            <input class='input' type='password' name='password' placeholder='Password (8+ characters)*'>
            <button class= 'button' type='submit'> Log in </button>
        </form>

        </div>`)

        this.container.querySelector('form').onsubmit =  (event) => {
            event.preventDefault()
        
            const email = event.target.email.value
            const password = event.target.password.value
            
            try{
                
                context.userId = authenticateUser(email, password)
                this.onAuthenticated()
        
            } catch (error) {
                alert(error.message)
            }
        
        }

        this.container.querySelector('a').onclick = (event) => {
            event.preventDefault()

            this.onRegisterClick()
        }

    }



    onAuthenticated(){
        throw new Error('not overriden')
    }

    onRegisterClick(){
        throw new Error('not overriden')
    }
}