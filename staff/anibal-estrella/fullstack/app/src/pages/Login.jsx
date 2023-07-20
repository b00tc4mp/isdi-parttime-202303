import { useAppContext } from "../hooks"
import { loginUser } from '../logic'
import { Link } from 'react-router-dom'

import { Panel } from '../library'

import "./Login.css"

export default function Login() {
    console.debug('// Login  -> Render \nEddie\npj@gmail.com\n123123123');

    const { alert, freeze, unfreeze, navigate } = useAppContext()


    const handleLogin = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            freeze()
            loginUser(email, password)
                .then(() => navigate('/'))
                .catch(error => alert(error.message, 'error'))
        } catch (error) {
            unfreeze()
            alert(error.message, 'warn')
        }
        unfreeze()
    }


    return <div className="login center-container">
        <Panel tag="section" className="" >
            <h2>Login</h2>
            <form className="border-top-gradient" onSubmit={handleLogin}>
                <label htmlFor="username">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" autoComplete="your email" />
                <label htmlFor="lastname">Password:</label>
                <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="enter password" />
                <button className="button-submit button" type="submit">Login</button>
            </form>
            <p className="goto-register border-top-gradient ">Not registered? <br />Do it <Link to="/register" >here</Link>.</p>
        </ Panel >
    </div>
}