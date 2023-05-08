import { authenticateUser } from '../logic/authenticate-user.js';
import { context } from '../ui/general-tools.js';

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    function handleRegisterClick(event) {
        event.preventDefault();
        onRegisterClick();
    }

    function handleLogin(event) {
        event.preventDefault();
      
        const username = event.target.username.value;
        const password = event.target.password.value;
        //let alert = { color: 'danger', title: 'oh, no!' };
      
        try {
          const userAuth = authenticateUser(username, password);
          context.userAuth = userAuth;
          onUserLoggedIn();
        } catch (error) {
          alert(`${error.cuase}: ${error.message}`)
        }
      }

    return <section className="login-page" onSubmit={handleLogin}>
        {/*alert should go in here*/}
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