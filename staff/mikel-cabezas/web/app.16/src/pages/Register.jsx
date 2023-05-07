

export default function Register(props) {
    function handleLoginClick(event) {
      event.preventDefault()
      props.onLoginClick()
    }
  
    return <section className="section register" id="register">
    <div className="container">
        <h1>Register</h1>
        <form className="register-form">
            <div className="message"></div>
            <label>Name</label>
            <input type="text" name="name" id="register-name" placeholder="Your name" />
            <label>Email</label>
            <input type="email" name="email" id="register-email" placeholder="email" />
            <label>Password</label>
            <div className="password">
                <input type="password" name="password" id="register-password" placeholder="password" />
                <i className="uil uil-eye"></i>
            </div>
            <button className="submit" type="submit">Register</button>
            <div className="login-link">
                <p>Already registered? <a href="" onClick={handleLoginClick}>Login</a></p>
            </div>
        </form>
    </div>
  </section>
  }