import { context } from '../ui.js'
import { authenticateUser } from '../logic/authenticateUser.js'
import { useContext } from 'react'
import Context from '../components/Context.js'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    console.debug('Login->render')

    const { alert } = useContext(Context)

    function handleRegisterClick(event) {
        event.preventDefault()

        onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    alert(error.message, 'error')

                    return
                }

                context.userId = userId

                onUserLoggedIn()
            })

        } catch (error) {
            alert(error.message, 'warn')
        }

    }

    return <div className="login container" >
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
            <input className="login-input" type='text' name='email' placeholder='email' />
            <input className="login-input" type='text' name='password' placeholder='password' />
            <button className="login-button" type="submit">Enter</  button>
        </form>
        <p className="login-text-goToRegister"> <a href="" onClick={handleRegisterClick}> Go to register</a></p>
    </div>
}
