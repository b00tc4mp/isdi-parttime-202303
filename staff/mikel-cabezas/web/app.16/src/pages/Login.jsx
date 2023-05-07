export default function Login(props) {

    function handleRegisterClick(event) {
      event.preventDefault()
      props.onRegisterClick()
    }
  
    return <section className="section login" id="login">
        <div className="container">
            <h1>Login</h1>
            <form className="login-form">
                <div className="message"></div>
                <label>Email</label>
                <input type="email" name="email" placeholder="Your email" />
                <label>Password</label>
                <div className="password">
                    <input type="password" name="password" placeholder="Your password" />
                    <i className="uil uil-eye"></i>
                </div>
                <button className="submit" type="submit">Login</button>
                <div className="register-link">
                    <p>Not registered? <a href="" onClick={handleRegisterClick}>Create account</a></p>
                </div>
            </form>
        </div>
    </section>
  }