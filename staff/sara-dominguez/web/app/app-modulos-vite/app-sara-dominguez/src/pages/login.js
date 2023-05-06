import Component from "../components/library/composito.js"
import { authenticateUser } from '../logic/authenticate-user.js'
import { context } from "../ui.js"



export default class Login extends Component {
    constructor() {
        super(`<div class="login container" >
        <h1>Login</h1>
        <form class="login-form">
            <input class="login-input" type='text' name='email' placeholder='email'>
            <input class="login-input" type='text' name='password' placeholder='password'>
            <button class="login-button" type="submit">Enter</button>
        </form>
        <p class="login-text-goToRegister"> <a href=""> Go to register</a></p>
        </div>`)

        //ponemos un arrow function en el submit para que el this de dentro apunte al contexto de fuera, igual que este contenedor
        this.container.querySelector('form').onsubmit = event => {
            event.preventDefault()
        
            const email = event.target.email.value
            const password = event.target.password.value
            
            try{
                context.userId = authenticateUser(email,password)
                
                this.onAuthenticated()
                
            } catch (error) {
                alert(error.message)
            }
        }

        this.container.querySelector('a').onclick = event => {
            event.preventDefault()
        
           this.onRegisterClick()
        }

    }

    onRegisterClick()  {
       throw new Error('not overridden')
    }
    onAuthenticated() {
        throw new Error('not overridden')
    }
}