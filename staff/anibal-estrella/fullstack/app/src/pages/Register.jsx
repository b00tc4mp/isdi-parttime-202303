import { registerUser } from '../logic'
import { Panel } from '../library'
import { useAppContext } from '../hooks'
import { Link } from 'react-router-dom'

export default function Register() {
    console.debug('// Register  -> Render');

    const { alert, freeze, unfreeze, navigate } = useAppContext()

    function handleRegister(event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const repeatPassword = event.target.repeatPassword.value

        // handle synchronous errors with TRY/CATCH
        try {
            freeze()
            //handle asynchronous errors with a CALLBACK
            registerUser(name, email, password, repeatPassword)
                .then(() => navigate('/login'))
                .catch(error => alert(error.message))

            unfreeze()

        } catch (error) {
            alert(error.message)
            unfreeze()

        }
        unfreeze()
    }

    return <div className="register center-container">
        < Panel tag='section' >
            <h2>Register</h2>
            <form method="get" className="register-form border-top-gradient" onSubmit={handleRegister}>
                <label htmlFor="name">Name:</label>
                <input type="text" className="name" name="name" placeholder="Enter your name" autoComplete="enter name" />
                <label htmlFor="email">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" autoComplete="enter email" />
                <label htmlFor="password">Password:</label>
                <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="enter password" />
                <label htmlFor="password">Repeat password:</label>
                <input type="password" className="password" name="repeatPassword" placeholder="Repeat your password" autoComplete="enter password" />
                <button className="button button-submit" type="submit" value="register">Register</button>
            </form>
            <p className="goto-login border-top-gradient">
                Already registered? <br />
                Login <Link to="/login">here</Link>.
            </p>
        </ Panel >
    </div>
}

