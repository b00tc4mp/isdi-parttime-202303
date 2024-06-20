import { authenticateUser } from '../logic/authenticate-user'
import { context } from '../ui.js'

export default function Login(props) {
    const handleRegisterClick = e => {
        e.preventDefault()

        props.onRegisterClick()
    }

    const handleLogin = e => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        try {
            const userId = authenticateUser(email, password)
            context.userId = userId
            props.onUserLoggedIn()
        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Login -> render')

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