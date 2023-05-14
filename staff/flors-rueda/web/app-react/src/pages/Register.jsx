import { context }from "../context";
import { authenticateUser } from "../logic/authenticate-user";
import { registerUser } from "../logic/register-user";

export default function Register({ onLoginClick, onUserRegistered }) {
    const handleLoginClick = (event) => {
        event.preventDefault();
        onLoginClick();
    }

    const handleRegister = (event) => {
        event.preventDefault();

        const mail = event.target.mail.value;
        const username = event.target.username.value;
        const password = event.target.password.value;
        const repeatPassword = event.target.password.value;

        try {
            registerUser(mail, username, password, repeatPassword);
            onUserRegistered();
        } catch (error) {
            console.log(`register error: ${error.message}`);
        }
    }
  
    return <section className="login-page">
                <section className="login-page__register">
                <h1 className="login-page__register__title">Register</h1>
                <form className="login-page__register__form" method="get" onSubmit={handleRegister}>
                    <input className="login-page__register-input" name="mail" type="email" placeholder="your email" required/>
                    <input className="login-page__register-input" name="username" type="text" placeholder="yourusername" maxLength="15" required/>
                    <input className="login-page__register-input" name="password" type="password" placeholder="your password"
                    required/>
                    <input className="login-page__register-input" name="repeatPassword" type="password" placeholder="confirm your password" required/>
                    <button className="login-page__register-submit" type="submit">create user</button>
                </form>
                </section>
                <div className="login-page__change-view">
                <p>Already have an account?</p>
                <p><a className="login-page__change-view--link" onClick={handleLoginClick}>Sign in</a></p>
                </div>
            </section>
}