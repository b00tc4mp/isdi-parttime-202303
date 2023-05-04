function HelloWorld() {
    return <h1>hello world</h1>
}

function Login() {
    return <div className="login page container">
        <h1 className="title">Login</h1>

        <form className="form">
            <input className="input" type="email" name="email" placeholder="email" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button" type="submit">Login</button>
        </form>

        <p>Go to <a href="">Register</a></p>
    </div>
}

function Register() {
    return <div className="register page container">
        <h1 className="title">Register</h1>

        <form className="form">
            <input className="input" type="text" name="name" placeholder="name" />
            <input className="input" type="email" name="email" placeholder="email" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button" type="submit">Register</button>
        </form>

        <p>Go to <a href="">Login</a></p>
    </div>
}

// link react with dom

const container = document.querySelector('#root')

// ReactDOM.render(title, container)

// const root = ReactDOM.createRoot(container)
// root.render(title)
ReactDOM.createRoot(container).render([<HelloWorld />, <Login />, <Register />])