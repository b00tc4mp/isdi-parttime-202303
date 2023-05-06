import { context } from '../ui.js'
import { authenticateUser } from '../logic/authenticateUser.js'

export default function Login({onRegisterClick, onUserLoggedIn}) {
    console.log('Login->render')

    function handleRegisterClick (event) {
        event.preventDefault()

        onRegisterClick()
    }

    function handleLogin (event){
        event.preventDefault()

        const email = event.target.email.value 
        const password = event.target.password.value

        try {
            const userId = authenticateUser(email, password)

            context.userId = userId

            onUserLoggedIn()
        } catch(error) {
            throw new Error(error.message)
        }
    
    }

    return <div className="login container" >
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
            <input className="login-input" type='text' name='email'     placeholder='email' />
            <input className="login-input" type='text'  name='password' placeholder='password' />
            <button className="login-button" type="submit">Enter</  button>
        </form>
        <p className="login-text-goToRegister"> <a href="" onClick= {handleRegisterClick}> Go to register</a></p>
    </div>
}
