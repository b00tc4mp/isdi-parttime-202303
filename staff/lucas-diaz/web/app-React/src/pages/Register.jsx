
export default function Register(props) {

    function handleLoginClick(event) {
        event.preventDefault();
        props.onLoginClick();

    }

    return <div className="container">
        <section className="register">
            <h1 className="register-header">REGISTER</h1>
            <p className="fail-warning red"></p>
            <form className="form">
                <div className="input-box">
                    <label>your username</label>
                    <input type="text" className="form-username" name="name" placeholder="Enter username" />
                </div>
                <div className="input-box">
                    <label>your email</label>
                    <input type="email" className="form-email" name="email" placeholder="Enter email"
                        autoComplete="current-password" />
                </div>
                <div className="input-box">
                    <label>your password</label>
                    <input type="password" name="password" placeholder="Enter password" className="form-password"
                        autoComplete="current-password" />
                </div>
                <button type="submit" className="submit-button sign-up">SIGN UP</button>
            </form>
            <p className="initialize-login">
                Alreaddy logged?<a href="" onClick={handleLoginClick} className="register-login-anchor green"> Go to login!</a>
            </p>
        </section>
    </div>
}