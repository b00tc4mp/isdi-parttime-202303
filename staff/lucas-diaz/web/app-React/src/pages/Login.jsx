import { context } from "../ui.js";
import authenticateUser from "../logic/authenticateUser.js"
import { useState } from "react";


export default function Login(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleRegisterClick(event) {
        event.preventDefault();
        props.onRegisterClick();
    }

    function handleLogin(event) {
        event.preventDefault();

        const email = event.target.email.value 
        const password = event.target.password.value 

        try {
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    setErrorMessage(error.message)
                    return;
                } 
                
                context.userId = userId;
                props.onUserLogedin();
                
            })
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return <div className="container">
        <section className="login">
            <h1 className="login-header">LOG IN</h1>
            <p className="login-success-warning green off">User created successfully</p>
            {errorMessage && <p className="fail-warning red">{errorMessage}</p>}
            <form className="form" onSubmit={handleLogin}>
                <div className="input-box">
                    <label>your email</label>
                    <input type="email" className="form-email" name="email" placeholder="Enter email" autoComplete="current-password" />
                </div>
                <div className="input-box">
                    <label>your password</label>
                    <input type="password" className="form-password" name="password" placeholder="Enter password" autoComplete="current-password" />
                </div>
                <div className="login-other-options">
                    <div className="login-other-options-remember-me">
                        <input type="checkbox" name="remember" id="log-in-checkbox" />
                        <label htmlFor="log-in-checkbox">Remember me</label>
                    </div>
                    <a className="forgot-password-anchor green" href="">Forgot password?</a>
                </div>
                <button type="submit" className="submit-button log-in">LOG IN</button>
                <p className="initialize-register">
                    Not a member? <a href="" onClick={handleRegisterClick} className="login-register-anchor green">register here</a>
                </p>
            </form>
        </section>
    </div>
}