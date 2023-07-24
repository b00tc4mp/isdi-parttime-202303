import { useAppContext } from "../hooks"
import { loginUser } from '../../logic'
import { Link } from 'react-router-dom'

import { Button, Panel, TopLine } from '../library'

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


    return <div className="center-xy">
        <Panel id="login" tag="section" className="p-4" >
            <h2>Login</h2>
            <form className="" onSubmit={handleLogin}>
                <TopLine></TopLine>
                <label htmlFor="username">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" autoComplete="your email" />
                <TopLine></TopLine>
                <label htmlFor="lastname">Password:</label>
                <input type="password" className="password" name="password" placeholder="Enter your password" autoComplete="enter password" />
                <Button type="submit">Login</Button>

            </form>
            <TopLine ></TopLine>
            <p className="  ">Not registered? <br />Do it <Link to="/register" >here</Link>.</p>
        </ Panel >
    </div>
}