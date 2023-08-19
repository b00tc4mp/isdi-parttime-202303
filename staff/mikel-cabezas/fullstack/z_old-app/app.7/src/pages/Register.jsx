import registerUser from '../logic/users/registerUser.js'
import { useContext } from "react"
import Context from '../AppContext.js'


export default function Register({ onLoginClick, onUserRegistered }) {
    console.log('Home -> register')

    const { freeze, unfreeze, alert } = useContext(Context)

    function handleLoginClick(event) {
        event.preventDefault()
        onLoginClick()
    }

    function handleRegister(event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        try {
            registerUser(name, email, password)
                .then(() => {
                    event.target.reset()
                    onUserRegistered()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return <section className="section register" id="register">
        <div className="container">
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleRegister}>
                <div className="message"></div>
                <label>Name</label>
                <input type="text" name="name" id="register-name" placeholder="Your name" />
                <label>Email</label>
                <input type="email" name="email" id="register-email" placeholder="email" />
                <label>Password</label>
                <div className="password">
                    <input type="password" name="password" id="register-password" placeholder="password" />
                    <i className="uil uil-eye"></i>
                </div>
                <button className="submit" type="submit">Register</button>
                <div className="login-link">
                    <p>Already registered? <a href="" onClick={handleLoginClick}>Login</a></p>
                </div>
            </form>
        </div>
    </section>
}