function HelloWorld() {
    return <h1>hello world</h1>
}

function Login(props) {
    function handleRegisterClick(event) {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <div className="login-page">
    <h1 className="all-titles">LOGIN</h1>
    <div className="red-text"></div>
    <form className="inputs">
            <input className="input-field" type="email" name="email" placeholder="Email"/>
            <input className="input-field" type="password" name="password" placeholder="Password"/>
            <div className="remember-me">
                <input className="checkbox" type="checkbox" name="remember-me"/>
                <div className="remember-me-text">Remember me</div>
            </div>
            <div className="forgot-password">Forgot your <a className="forgot-password-button">password</a>?</div>
            <div className="already-registered">Don't have an account? <a className="register-now-button" onClick={handleRegisterClick}>Register now</a></div>
            <button className="submit-buttons" type="submit">Login</button>
    </form>
    </div>
}

function Register(props) {
    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
    }

    return <div className="register-page">
    <h1 className="all-titles">REGISTER</h1>
    <div className="red-text"></div>
    <form className="inputs">
        <input className="input-field" type="text" name="name" placeholder="User name"/>
        <input className="input-field" type="email" name="email" placeholder="Email"/>
        <input className="input-field" type="password" name="password" placeholder="Password"/>
        <div className="secondary-text">Already registered? <a className="go-to-sign-in" onClick={handleLoginClick}>Sign in</a></div>
        <button className="submit-buttons" type="submit">Register</button>
    </form>
    </div>
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = { view: 'login' }
    }

    handleGoToRegister = () => {
        this.setState({ view: 'register'})
    }

    handleGoToLogin = () => {
        this.setState({ view: 'login'})
    }

    render() {
        return this.state.view === 'login' ?
        <Login
            onRegisterClick={this.handleGoToRegister}
            pepito='grillo'
        />
        :
        <Register onLoginClick={this.handleGoToLogin} />  
    }
}

ReactDOM.createRoot(document.querySelector('#root')).render([<App/>])