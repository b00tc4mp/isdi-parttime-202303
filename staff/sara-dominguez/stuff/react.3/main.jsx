function Login(props) {
    function handleGoToRegister(event) {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <div className="login container" >
    <h1>Login</h1>
    <form className="login-form">
        <input className="login-input" type='text' name='email' placeholder='email' />
        <input className="login-input" type='text' name='password' placeholder='password' />
        <button className="login-button" type="submit">Enter</button>
    </form>
    <p className="login-text-goToRegister"> <a href="" onClick = {handleGoToRegister}> Go to Register</a></p>
    </div>

}

function Register() {
    return <div className="register container">
    <h1>Register</h1>
        <form className="register-form">
            <input className="register-input" type='text' name='name' placeholder='name' />
            <input className="register-input" type='text' name='email' placeholder='email' />
            <input className="register-input" type='text' name='password' placeholder='password' />
            <button className="register-button" type="submit">Register</button>
        </form>
        <p className="register-text-goToLogin"><a href=""> Go to Login</a></p>
        </div>

}
//como le digo a APP que encender y que apagar. Version vieja escuela

class App extends React.Component {
    constructor(props){ 
        super(props)

        this.state = {view: 'login'}
    }

    handleGoToRegister() {
        this.setState({view: 'register'})
    }
    
    render() {
        return this.state.view === 'login' ? 
        <Login onRegisterClick={this.handleGoToRegister.bind(this)}/> : <Register/>
    }
}






const container = document.querySelector('#root')
ReactDOM.createRoot(container).render(<App/>)