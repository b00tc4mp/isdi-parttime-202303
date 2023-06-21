import { context } from "../ui.js"
import { authenticateUser } from "../logic/authenticateUser.js"
import { useAppContext } from "../hooks/"

import { Panel } from '../library'


import "./Login.css"

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    const { alert, freeze, unfreeze } = useAppContext()


    // 2 // this function will send the event to its parent 
    function handleGoToRegisterClick(event) {
        event.preventDefault()

        // 3 // ask the parent function for a function (sent through the CALLBACK component's props) when a click event occurs 
        onRegisterClick()
    }

    function handleLogin(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {

            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    alert(error.message, 'error')

                    return
                }

                context.userId = userId

                onUserLoggedIn()
            })

        } catch (error) {
            alert(error.message, 'warn')
        }
    }

    console.debug('// Login -> RENDER \nEddie\npj@gmail.com\n123123123');

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