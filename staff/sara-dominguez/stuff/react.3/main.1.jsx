function Login() {
    return <div className="login container" >
    <h1>Login</h1>
    <form className="login-form">
        <input className="login-input" type='text' name='email' placeholder='email' />
        <input className="login-input" type='text' name='password' placeholder='password' />
        <button className="login-button" type="submit">Enter</button>
    </form>
    <p className="login-text-goToRegister"> <a href=""> Go to register</a></p>
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
        <p className="register-text-goToLogin"><a href=""> Go to login</a></p>
        </div>

}

function App() {
    return <Login/>
}



const container = document.querySelector('#root')
ReactDOM.createRoot(container).render(<App/>)