import { registerUser } from '../../logic'
import { Button, Panel, TopLine } from '../library'
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

    return <div className="center-xy">
        < Panel id="register" tag='section' className="p-4" >
            <h2>Register</h2>
            <form method="get" className="register-form border-top-gradient" onSubmit={handleRegister}>
                <TopLine></TopLine>

                <label htmlFor="name">Name:</label>
                <input type="text" className="name" name="name" placeholder="Enter your name" autoComplete="enter name" />
                <TopLine></TopLine>

                <label htmlFor="email">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" autoComplete="enter email" />
                <TopLine></TopLine>

                <label htmlFor="password">Password:</label>
                <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="enter password" />
                <TopLine></TopLine>

                <label htmlFor="password">Repeat password:</label>
                <input type="password" className="password" name="repeatPassword" placeholder="Repeat your password" autoComplete="enter password" />
                <Button type="submit" value="register">Register</Button>
            </form>
            <TopLine></TopLine>

            <p className="goto-login border-top-gradient">
                Already registered? <br />
                Login <Link to="/login">here</Link>.
            </p>
        </ Panel >
    </div>
}

