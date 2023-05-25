import registerUser from '../logic/registerUser'
import Container from '../library/Container'

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

    console.debug('Register -> render')

    return <Container tag="main">
        <h1 className="title">Register</h1>

        <form className="form" onSubmit={handleRegister}>
            <input className="input" type="text" name="name" placeholder="name" />
            <input className="input" type="email" name="email" placeholder="email" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button" type="submit">Register</button>
        </form>

        <p>Go to <a href="" onClick={handleLoginClick}>Login</a></p>
    </Container>
}