import authenticateUser from '../logic/authenticate-user';
import { context } from '../ui';
import './LoginRegister.css';
import inLogger from '../inLogger';
import Context from '../Context';
import { useContext } from 'react';

const Login = ({ onRegisterClick, onUserLoggedIn }) => {
    const { alert } = useContext(Context);

    const handleRegisterClick = (event) => {
        event.preventDefault();
        onRegisterClick();
    }

    const handleLogin = event => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        try {
            authenticateUser(username, password).then(token => {
                context.token = token
                onUserLoggedIn()
            })
                .catch(error => {
                    alert(`login error: ${error.message}`, 'danger');
                    return;
                })
            if (error) {
                alert(`login error: ${error.message}`, 'danger');
                return;
            }
        } catch (error) {
            alert(`login error: ${error.message}`, 'danger');
        }
    }

    return <section className="login-page" onSubmit={handleLogin}>
        <section className="login-page__login">
            <h1 className="login-page__login__title">Login</h1>
            <form className="login-page__login__form" method="get">
                <input className="login-page__login-input" name="username" type="text" placeholder="yourusername"
                    maxLength="15" required />
                <input className="login-page__login-input" name="password" type="password" placeholder="your password"
                    required />
                <button className="login-page__login-submit" type="submit">sign in</button>
            </form>
        </section>
        <div className="login-page__change-view">
            <p>You're new here?</p>
            <p><a className="login-page__change-view--link" onClick={handleRegisterClick}>Sign up</a></p>
        </div>
    </section>

}

export default inLogger(Login);