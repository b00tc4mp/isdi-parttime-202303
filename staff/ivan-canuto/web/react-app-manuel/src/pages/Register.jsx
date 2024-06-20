import registerUser from '../logic/registerUser'

export default function Register({ onLoginClick, onUserRegistered }) {
    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    const handleRegister = function (event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            registerUser(name, email, password, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onUserRegistered()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Register -> render')

    return <div className="register page container">
        <h1 className="title">Register</h1>

        <form className="form" onSubmit={handleRegister}>
            <input className="input" type="text" name="name" placeholder="name" />
            <input className="input" type="email" name="email" placeholder="email" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button" type="submit">Register</button>
        </form>

        <p>Go to <a href="" onClick={handleLoginClick}>Login</a></p>
    </div>
}