import authenticateUser from '../logic/authenticateUser'
import { context } from '../ui'
import PropTypes from 'prop-types'

export default function Login({onRegisterClick, onUserLoggedIn}) {
    Login.propTypes = {
        onRegisterClick: PropTypes.func,
        onUserLoggedIn: PropTypes.func
    }

    function handleRegisterClick(event) {
        event.preventDefault()
  
        onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value,
        password = event.target.password.value

        try{
            const userId = authenticateUser(email, password)

            context.userId = userId

            onUserLoggedIn()
        } catch(error){
            alert(error.message)
        }
    }
  
    return <div className="login-page">
    <h1 className="all-titles">LOGIN</h1>
    <div className="red-text"></div>
    <form className="inputs" onSubmit={handleLogin}>
            <input className="input-field" type="email" name="email" placeholder="Email"/>
            <input className="input-field" type="password" name="password" placeholder="Password"/>
            <div className="remember-me">
                <input className="checkbox" type="checkbox" name="remember-me"/>
                <div className="remember-me-text">Remember me</div>
            </div>
            <div className="forgot-password">Forgot your <a className="link">password</a>?</div>
            <div className="already-registered">Don't have an account? <a className="link" onClick={handleRegisterClick}>Register now</a></div>
            <button className="submit-buttons" type="submit">Login</button>
    </form>
    </div>
  }