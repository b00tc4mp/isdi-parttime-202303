import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'
import { useContext } from 'react'
import Context from '../Context'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    const { alert } = useContext(Context)

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    const handleLogin = event => {
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

    console.debug('Login -> render')

    return <div className="login page container">
        <h1 className="title">Login</h1>

        <form className="form" onSubmit={handleLogin}>
            <input className="input" type="email" name="email" placeholder="email" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button" type="submit">Login</button>
        </form>

        <p>Go to <a href="" onClick={handleRegisterClick}>Register</a></p>
    </div>
}