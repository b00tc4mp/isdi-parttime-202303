import { context } from "../ui.js"
import authenticateUser from '../logic/users/authenticateUsers.js'
import Container from '../library/Container.jsx'
import { useAppContext } from "../hooks"
// import { pushUserDataToHeader } from "../components/helpers/push-user-to-header.js"

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    console.log('Home -> login')
    const { alert, freeze, unfreeze } = useAppContext()

    function handleRegisterClick(event) {
        event.preventDefault()
        onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            debugger
            authenticateUser(email, password, (error, token) => {
                freeze()
                if (error) {
                    alert(error.message)

                    return
                }

                context.token = token

                onUserLoggedIn()
                unfreeze()
            })
        } catch (error) {
            console.log(error)
        }
    }

    return <Container tag="main" className={'w-full md:pl-72 flex justify-center h-screen items-center'}>
        <section className="section login p-7 max-w-xs rounded-3xl flex flex-col text-center bg-container-bg dark:bg-dark h-min" id="login">
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
                    <p className="text-light">Not registered? <a href="" onClick={handleRegisterClick}>Create account</a></p>
                </div>
            </form>
        </section>
    </Container>
}
