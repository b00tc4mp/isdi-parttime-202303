export default function Login(props) {
    function handleRegisterClick(event) {
        event.preventDefault();
        props.onRegisterClick();
    }
  
    return <section class="login-page">
                <section class="login-page__login">
                <h1 class="login-page__login__title">Login</h1>
                <form class="login-page__login__form" method="get">
                    <input class="login-page__login-input" name="username" type="text" placeholder="yourusername"
                    maxlength="15" required />
                    <input class="login-page__login-input" name="password" type="password" placeholder="your password"
                    required />
                    <button class="login-page__login-submit" type="submit">sign in</button>
                </form>
                </section>
                <div class="login-page__change-view">
                <p>You're new here?</p>
                <p><a class="login-page__change-view--link" onClick={handleRegisterClick}>Sign up</a></p>
                </div>
            </section>
}