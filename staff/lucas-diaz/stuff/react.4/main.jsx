function HelloWorld() {
    return <h1>Hello World!</h1>
}

function Login() {
    return <section className="login">
        <h1 className="login-header">LOG IN</h1>
        <p className="login-success-warning green off">User created successfully</p>
        <p className="fail-warning red"></p>
        <form className="form">
            <div className="input-box">
                <label>your email</label>
                <input type="email" className="form-email" name="email" placeholder="Enter email" autoComplete="current-password"/>
            </div>
            <div className="input-box">
                <label>your password</label>
                <input type="password" className="form-password" name="password" placeholder="Enter password" autoComplete="current-password"/>
            </div>
            <div className="login-other-options">
                <div className="login-other-options-remember-me">
                    <input type="checkbox" name="remember" id="log-in-checkbox"/>
                    <label htmlFor="log-in-checkbox">Remember me</label>
                </div>
                <a className="forgot-password-anchor green" href="">Forgot password?</a>
            </div>
            <button type="submit" className="submit-button log-in">LOG IN</button>
            <p className="initialize-register">
                not a member? <a href="" className="login-register-anchor green">register here</a>
            </p>
        </form>
    </section>
}

function Register(){
    return <section className="register">
    <h1 className="register-header">REGISTER</h1>
    <p className="fail-warning red"></p>
    <form className="form">
        <div className="input-box">
            <label>your username</label>
            <input type="text" className="form-username" name="name" placeholder="Enter username"/>
        </div>
        <div className="input-box">
            <label>your email</label>
            <input type="email" className="form-email" name="email" placeholder="Enter email"
                autoComplete="current-password"/>
        </div>
        <div className="input-box">
            <label>your password</label>
            <input type="password" name="password" placeholder="Enter password" className="form-password"
                autoComplete="current-password"/>
        </div>
        <button type="submit" className="submit-button sign-up">SIGN UP</button>
    </form>
</section>
}


const container = document.querySelector("#root");
ReactDOM.createRoot(container).render([ <HelloWorld/>, <Login/>, <Register/>]);

