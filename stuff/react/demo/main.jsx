function Login(props) {
    function handleRegisterClick(event) {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <div className="login page container">
        <h1 className="title">Login</h1>

        <form className="form">
            <input className="input" type="email" name="email" placeholder="email" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button" type="submit">Login</button>
        </form>

        <p>Go to <a href="" onClick={handleRegisterClick}>Register</a></p>
    </div>
}

function Register(props) {
    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
    }

    return <div className="register page container">
        <h1 className="title">Register</h1>

        <form className="form">
            <input className="input" type="text" name="name" placeholder="name" />
            <input className="input" type="email" name="email" placeholder="email" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button" type="submit">Register</button>
        </form>

        <p>Go to <a href="" onClick={handleLoginClick}>Login</a></p>
    </div>
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = { view: 'login' }
    }

    handleGoToRegister = () => {
        this.setState({ view: 'register' })
    }

    handleGoToLogin = () => {
        this.setState({ view: 'login' })
    }

    render() {
        if (this.state.view === 'login')
            return <Login onRegisterClick={this.handleGoToRegister} />
        else
            return <Register onLoginClick={this.handleGoToLogin} />
    }
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />)