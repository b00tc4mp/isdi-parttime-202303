import { context } from "../ui.js"
import { useAppContext } from "../hooks"
import authenticateUser from '../logic/authenticateUser'

import { Panel } from '../library'

import "./Login.css"

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    console.debug('// Login  -> Render \nEddie\npj@gmail.com\n123123123');

    const { alert, freeze, unfreeze } = useAppContext()

    // 2 //send the event to its parent 
    function handleGoToRegisterClick(event) {
        event.preventDefault()

        // 3 // ask the parent function for a function (sent through the CALLBACK component's props) when a click event occurs 
        onRegisterClick()
    }

    const handleLogin = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) {
                    alert(error.message, 'error')

                    return
                }

                context.token = token

                onUserLoggedIn()
            })

            // authenticateUser(email, password)
            //     .then(token => {
            //         context.token = token

            //         onUserLoggedIn()
            //     })
            //     .catch(error => alert(error.message, 'error'))

        } catch (error) {
            alert(error.message, 'warn')
        }
    }


    return <div className="login center-container">
        <Panel tag="section">
            <h2>Login</h2>
            <form className="border-top-gradient" onSubmit={handleLogin}>
                <label htmlFor="username">E-mail:</label>
                <input type="text" className="email" name="email" placeholder="Enter your e-mail" />
                <label htmlFor="lastname">Password:</label>
                <input type="password" className="password" name="password" autoComplete="current-password" placeholder="Enter your password" />
                <button className="button-submit button" type="submit">Login</button>
            </form>
            {/* // 1 // we created a property to grab the onclick event and call a function  */}
            <p className="goto-register border-top-gradient ">Not registered? <br />Do it <a href="#" onClick={handleGoToRegisterClick}>here</a>.</p>
        </ Panel >
    </div>
}