export default function Register(props) {
    function handleLoginClick(event) {
        event.preventDefault();
        props.onLoginClick();
    }
  
    return <section class="login-page">
                <section class="login-page__register">
                <h1 class="login-page__register__title">Register</h1>
                <form class="login-page__register__form" method="get">
                    <input class="login-page__register-input" name="mail" type="email" placeholder="your email" required/>
                    <input class="login-page__register-input" name="username" type="text" placeholder="yourusername" maxlength="15" required/>
                    <input class="login-page__register-input" name="password" type="password" placeholder="your password"
                    required/>
                    <input class="login-page__register-input" name="repeatPassword" type="password" placeholder="confirm your password" required/>
                    <button class="login-page__register-submit" type="submit">create user</button>
                </form>
                </section>
                <div class="login-page__change-view">
                <p>Already have an account?</p>
                <p><a class="login-page__change-view--link" onClick={handleLoginClick}>Sign in</a></p>
                </div>
            </section>
}