import authenticateUser from '../logic/authenticateUser'
import { context } from '../ui'
import { useAppContext } from '../hooks'
import Container from '../library/Container'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    const { alert, freeze, unfreeze } = useAppContext()

    function handleRegisterClick(event) {
        event.preventDefault()

        onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value,
            password = event.target.password.value

        try {
            freeze()

            authenticateUser(email, password)
                .then(token => {
                    unfreeze()

                    context.token = token

                    onUserLoggedIn()
                })
        } catch (error) {
            unfreeze()
            alert(error.message, 'warn')
        }
    }

    return <Container tag="div" className='bg-[var(--black-100)] text-[var(--white-000)]'>
        <h1 className="title">Login</h1>
        <form className="inputs" onSubmit={handleLogin}>
            <input className="input-field" type="email" name="email" placeholder="Email" />
            <input className="input-field" type="password" name="password" placeholder="Password" />
            <div className="flex items-center gap-0.5">
                <input className="h-4 w-4" type="checkbox" name="remember-me" />
                <div>Remember me</div>
            </div>
            <div>Forgot your <a className="link">password</a>?</div>
            <div>Dont have an account? <a className="link" onClick={handleRegisterClick}>Register now</a></div>
            <button className="submit-buttons" type="submit">Login</button>
        </form>
    </Container>
}