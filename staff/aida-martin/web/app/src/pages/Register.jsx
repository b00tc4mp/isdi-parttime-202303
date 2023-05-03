export default function Register(props) {
    function handleLoginClick(event) {
        event.preventDefault();

        props.onLoginClick();
    }

    return <section className="register">
    <h1 className="title">CREATE ACCOUNT</h1>

    <form className="form">
      <input className="input" type="text" name="name" placeholder="Name" />

      <input className="input" type="text" name="email" placeholder="Email" />

      <input
        className="input"
        type="password"
        name="password"
        placeholder="Password"
      />

      <input
        className="input"
        type="password"
        name="repeatpassword"
        placeholder="Repeat password"
      />

      <p className="register-error error off"></p>

      <button className="button register-button">SIGN UP</button>
    </form>

    <p className="login-answer">
      Have already an account? <a href="#" onClick={handleLoginClick}className="login-link">Login here</a>
    </p>
  </section>
  
}