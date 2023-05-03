export default function Login(props) {
    function handleRegisterClick(event) {
        event.preventDefault();

        props.onRegisterClick();
    }

    return <section className="login">
    <h1 className="title">WELCOME!</h1>

    <form className="form">
      <input className="input" type="email" name="email" placeholder="Email" />

      <input
        className="input"
        type="password"
        name="password"
        placeholder="Password"
      />

      <a href="#" className="forgot-password-link">Forgot password?</a>

      <p className="login-error error off"></p>

      <button className="button login-button">LOG IN</button>
    </form>

    <p className="register-answer">
      Not a member? <a href="#" onClick={handleRegisterClick}className="register-link">Sign up here</a>
    </p>
  </section>
}