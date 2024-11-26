import { context } from "../ui.js"
import authenticateUser from '../logic/users/authenticateUsers.js'
// import { pushUserDataToHeader } from "../components/helpers/push-user-to-header.js"

export default function Login({onRegisterClick, onUserLoggedIn}) {
    console.log('Home -> login')

    function handleRegisterClick(event) {
      event.preventDefault()
      onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            const userId = authenticateUser(email, password)
            context.userId = userId
            // pushUserDataToHeader(userId)
            onUserLoggedIn()
            context.userId
        } catch (error) {
            console.log(error)
        }
    }
  
    return <section className="section login" id="login">
        <div className="container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="message"></div>
                <label>Email</label>
                <input type="email" name="email" placeholder="Your email" />
                <label>Password</label>
                <div className="password">
                    <input type="password" name="password" placeholder="Your password" />
                    <i className="uil uil-eye"></i>
                </div>
                <button className="submit" type="submit">Login</button>
                <div className="register-link">
                    <p>Not registered? <a href="" onClick={handleRegisterClick}>Create account</a></p>
                </div>
            </form>
        </div>
    </section>
  }